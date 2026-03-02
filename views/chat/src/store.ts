import { reactive, readonly } from "vue"
import type { Conversation, Message, Model, Prefs, RoleData, PromptEntry } from "./types"
import { getBridge, getIdb, getRoleId, getSaveBridge } from "./bridge"
import { renderContent } from "./render"
import { packEnvelope, envelopeToBlob, downloadBlob } from "../../../ocs/shared/png-encode"
import { createIdbOps } from "../../../ocs/shared/idb-ops"
import { sendVia, handleResult, collapseNewlines, isConvGone } from "./chat-engine"
import { setLocale as i18nSetLocale } from "./i18n"
import type { Locale } from "./i18n"

const DB_NAME = "ocs_view"
const CONV_KEY = "convs"
const ACTIVE_KEY = "active"
const PREFS_KEY = "prefs"
const SAVE_PREFS_KEY = "save_prefs"
const THEME_KEY = "theme"
const LOCALE_KEY = "locale"
const WELCOMED_KEY = "welcomed"
const STATUS_PREFIX = "status_"

export type ThemeColor = "green" | "red" | "orange" | "blue" | "purple" | "pink"
export const THEME_COLORS: ThemeColor[] = ["red", "orange", "green", "blue", "purple", "pink"]

interface State {
  convs: Conversation[]
  activeConv: string | number | null
  msgs: Message[]
  streaming: boolean
  models: Model[]
  activeModel: Model | null
  useStream: boolean
  maxToken: number
  connected: boolean
  role: RoleData | null
  hiddenPrompts: PromptEntry[]
  processedBeginning: string
  draftConvId: string | null
  scrollToMsgId: string | number | null
  autoSaveEnabled: boolean
  autoSaveInterval: number
  theme: ThemeColor
  locale: Locale
  lastChoices: string[]
  lastStatus: Record<string, unknown> | null
  kagMergedIds: Set<string>
}

const state = reactive<State>({
  convs: [],
  activeConv: null,
  msgs: [],
  streaming: false,
  models: [],
  activeModel: null,
  useStream: true,
  maxToken: 0,
  connected: false,
  role: null,
  hiddenPrompts: [],
  processedBeginning: "",
  draftConvId: null,
  scrollToMsgId: null,
  autoSaveEnabled: true,
  autoSaveInterval: 60,
  theme: "red",
  locale: "zh-CN",
  lastChoices: [],
  lastStatus: null,
  kagMergedIds: new Set<string>()
})

export const store = readonly(state)

const _idb = createIdbOps(getIdb, DB_NAME)
const idbGet = _idb.get
const idbPut = _idb.put
const idbRemove = _idb.remove

function saveConvs() { return idbPut(CONV_KEY, state.convs) }
function saveActive() { return state.activeConv ? idbPut(ACTIVE_KEY, state.activeConv) : idbRemove(ACTIVE_KEY) }

function asList<T>(r: unknown): T[] {
  return Array.isArray(r) ? r : []
}

export function convDisplayName(c: Conversation): string {
  return c.name || c.title || ("Conv " + c.id)
}

function processBeginning() {
  if (!state.role?.beginning) {
    state.processedBeginning = ""
    return
  }
  state.processedBeginning = renderContent(state.role.beginning)
}

export function fetchRole(): Promise<void> {
  const B = getBridge()
  if (!B?.role) return Promise.resolve()

  return B.role.query().then((r) => {
    if (r) state.role = r
    processBeginning()
  }).catch(() => {})
}

function findConv(id: string | number): Conversation | null {
  for (const c of state.convs) {
    if (c.id === id) return c
  }
  return null
}

const _localConvTs = new Map<string | number, number>()

function _findMsgIdx(m: Message): number {
  return state.msgs.findIndex(msg => msg === m || (m.id && msg.id === m.id))
}

export function removeConvLocal(id: string | number) {
  _localConvTs.delete(id)
  state.convs = state.convs.filter(c => c.id !== id)
  saveConvs()

  if (state.activeConv === id) {
    state.activeConv = null
    state.msgs = []
    saveActive()
    if (state.convs.length > 0) switchConv(state.convs[0])
    else startDraftConv()
  }
}

export function syncConvList(): Promise<void> {
  const B = getBridge()
  if (!B) return Promise.resolve()
  return B.conversation.list().then((r) => {
    const serverConvs = asList<Conversation>(r)
    const serverIds = new Set(serverConvs.map(c => c.id))
    const now = Date.now()
    const localOnly = state.convs.filter(c => {
      if (serverIds.has(c.id)) { _localConvTs.delete(c.id); return false }
      const ts = _localConvTs.get(c.id)
      if (!ts) { _localConvTs.set(c.id, now); return true }
      if (now - ts > 30000) { _localConvTs.delete(c.id); return false }
      return true
    })
    state.convs = [...localOnly, ...serverConvs]
    saveConvs()

    if (state.activeConv && !findConv(state.activeConv)) {
      state.activeConv = null
      state.msgs = []
      saveActive()
    }
  })
}

function _fetchMsgs(convId: string | number) {
  const B = getBridge()
  if (!B) return

  B.message.history(1).then((r) => {
    if (state.activeConv !== convId) return
    state.msgs = asList<Message>(r)
  }).catch((e) => {
    if (isConvGone(e)) removeConvLocal(convId)
  })
}

export function switchConv(c: Conversation, targetMsgId?: string | number | null) {
  if (state.streaming) return
  if (!findConv(c.id)) return
  state.activeConv = c.id
  state.scrollToMsgId = targetMsgId || null
  state.msgs = []
  state.lastStatus = null
  state.lastChoices = []
  state.kagMergedIds = new Set()
  saveActive()
  _loadCachedStatus(c.id)

  const B = getBridge()
  if (!B) return

  B.conversation.open(c.id).then((r) => {
    if (state.activeConv !== c.id) return
    state.msgs = asList<Message>(r.messages)
    _syncExtra()
    _syncKagMergedIds()
  }).catch((e) => {
    if (isConvGone(e)) removeConvLocal(c.id)
  })
}

export function createConvAndSend(text: string, displayText?: string): Promise<void> {
  const B = getBridge()
  if (!B) return Promise.resolve()
  state.streaming = true

  const display = displayText || text
  const userMsg: Message = { role: "user", content: display, id: null, extra: { origin: display } }
  const asstMsg: Message = { role: "assistant", content: "", id: null }
  state.msgs = [userMsg, asstMsg]

  const reactiveAsst = state.msgs[1]

  return B.conversation.open().then(r => {
    const newId = r.convId
    if (!newId) throw new Error("create failed")

    const conv: Conversation = { id: newId, name: "\u65B0\u5BF9\u8BDD" }
    state.convs = [conv, ...state.convs]
    state.activeConv = newId
    saveConvs()
    saveActive()

    doSend(text, reactiveAsst, newId)
  }).catch(e => {
    reactiveAsst.error = (e && e.message) || String(e)
    state.streaming = false
    if (!state.activeConv) {
      state.draftConvId = "__draft_" + Date.now()
    }
  })
}

function injectHiddenToSdk(): boolean {
  const B = getBridge()
  if (!B?.prompt?.next) return false
  const hidden = state.hiddenPrompts.map(p => p.text).filter(Boolean)
  const hadOneshot = state.hiddenPrompts.some(p => p.oneshot)
  if (!hidden.length) return false
  for (let i = 0; i < hidden.length; i++) B.prompt.next.add("hidden_" + i, hidden[i])
  if (hadOneshot) clearOneshotPrompts()
  return true
}

function clearOneshotPrompts() {
  state.hiddenPrompts = state.hiddenPrompts.filter(p => !p.oneshot)
}

function _syncExtra() {
  const msgs = state.msgs
  let foundChoices = false
  let foundStatus = false

  for (let i = msgs.length - 1; i >= 0; i--) {
    const m = msgs[i]
    if (m.role !== "assistant" || !m.extra) continue

    if (!foundChoices) {
      const ch = m.extra.choices
      if (Array.isArray(ch) && ch.length) {
        state.lastChoices = ch.filter((c): c is string => typeof c === "string")
        foundChoices = true
      }
    }

    if (!foundStatus) {
      const st = m.extra.status
      if (st && typeof st === "object" && Object.keys(st as object).length) {
        state.lastStatus = st as Record<string, unknown>
        foundStatus = true
      }
    }

    if (foundChoices && foundStatus) break
  }

  if (!foundChoices) state.lastChoices = []
  if (!foundStatus) state.lastStatus = null
  if (state.activeConv) idbPut(STATUS_PREFIX + state.activeConv, state.lastStatus)
}

function _syncKagMergedIds() {
  const B = getBridge()
  if (!B?.kag) return
  B.kag.getMergedIds().then((ids) => {
    state.kagMergedIds = new Set(ids.map(String))
  }).catch(() => {})
}

export function addToKag(m: Message): Promise<boolean> {
  const B = getBridge()
  if (!B?.kag || !m.id) return Promise.resolve(false)
  const raw = (m.extra?.raw as string) || ""
  if (!raw) return Promise.resolve(false)
  return B.kag.backfillMsg(m.id, raw).then((r) => {
    if (r.merged) state.kagMergedIds = new Set([...state.kagMergedIds, String(m.id)])
    return r.merged
  }).catch(() => false)
}

function _engineCallbacks(onDoneExtra?: () => void) {
  return {
    onStreaming: () => {},
    onDone: () => {
      if (onDoneExtra) onDoneExtra()
      state.streaming = false
      _syncExtra()
      _syncKagMergedIds()
    },
    onError: (err: string, convGone: boolean) => {
      state.streaming = false
      if (convGone && state.activeConv) removeConvLocal(state.activeConv)
    }
  }
}

function doSend(text: string, asstMsg: Message, explicitConvId?: string | number) {
  const B = getBridge()
  if (!B) { state.streaming = false; return }

  const convId = explicitConvId || state.activeConv
  if (!convId) { state.streaming = false; return }
  const useStream = state.useStream && state.activeModel?.enableStream === 1

  sendVia(B, text, {
    id: state.activeModel?.id,
    token: state.maxToken,
    stream: useStream
  }, convId, useStream, asstMsg, _engineCallbacks())
}

export function sendMessage(text: string) {
  const B = getBridge()
  if (!B || state.streaming) return
  if (!text.trim()) return

  const clean = collapseNewlines(text.trim())
  injectHiddenToSdk()

  if (state.draftConvId || !state.activeConv || !findConv(state.activeConv)) {
    state.draftConvId = null
    createConvAndSend(clean, text.trim())
    return
  }

  state.streaming = true

  const display = text.trim()
  const userMsg: Message = { role: "user", content: display, id: null, extra: { origin: display } }
  const asstMsg: Message = { role: "assistant", content: "", id: null }
  state.msgs = [...state.msgs, userMsg, asstMsg]

  const reactiveAsst = state.msgs[state.msgs.length - 1]
  doSend(clean, reactiveAsst)
}

export function regenMsg(m: Message) {
  if (state.streaming) return
  const B = getBridge()
  if (!B) return

  const idx = _findMsgIdx(m)
  if (idx < 0) return

  if (!m.id) {
    let userText = ""
    for (let i = idx - 1; i >= 0; i--) {
      if (state.msgs[i].role === "user") { userText = state.msgs[i].content || ""; break }
    }
    if (!userText) return

    state.streaming = true
    state.msgs[idx] = { ...state.msgs[idx], content: "", error: undefined }
    const target = state.msgs[idx]

    injectHiddenToSdk()
    doSend(collapseNewlines(userText.trim()), target)
    return
  }

  state.streaming = true
  state.msgs[idx] = { ...state.msgs[idx], content: "", error: undefined }
  const target = state.msgs[idx]

  const useStream = state.useStream && state.activeModel?.enableStream === 1

  let result: unknown
  try { result = B.message.regenerate(m.id!, useStream) }
  catch (e) { target.error = (e && (e as Error).message) || String(e); state.streaming = false; return }

  handleResult(result, target, useStream, _engineCallbacks())
}

export function updateMsgContent(m: Message, newText: string) {
  const idx = _findMsgIdx(m)
  if (idx >= 0) {
    const updated = { ...state.msgs[idx], content: newText }
    if (updated.role === "user") {
      updated.extra = { ...updated.extra, origin: newText }
    }
    state.msgs[idx] = updated
  }
}

export function editMsg(m: Message, newText: string): Promise<boolean> {
  const B = getBridge()
  if (!B || !m.id || state.streaming) return Promise.resolve(false)
  const isUser = m.role === "user"
  const oldText = m.content || ""
  updateMsgContent(m, newText)
  const convId = state.activeConv
  if (!convId) return Promise.resolve(false)

  if (isUser) {
    const idx = state.msgs.findIndex(msg => m.id && msg.id === m.id)
    const next = idx >= 0 && idx + 1 < state.msgs.length ? state.msgs[idx + 1] : null
    if (next?.role === "assistant" && next.id) {
      state.streaming = true
      const nIdx = idx + 1
      state.msgs[nIdx] = { ...state.msgs[nIdx], content: "" }
      const target = state.msgs[nIdx]
      const useStream = state.useStream && state.activeModel?.enableStream === 1

      const result = B.message.edit(next.id!, newText, true)
      handleResult(result, target, useStream, _engineCallbacks())
      return Promise.resolve(true)
    }
  }

  return B.message.edit(m.id!, newText).then(() => true).catch(() => {
    updateMsgContent(m, oldText)
    return false
  })
}

export function deleteMsg(m: Message): Promise<boolean> {
  const B = getBridge()
  if (!B || !m.id) return Promise.resolve(false)
  return B.message.delete(m.id!).then(() => {
    state.msgs = state.msgs.filter(msg => msg.id !== m.id)
    return true
  }).catch(() => false)
}

export function renameConv(c: Conversation, newName: string): Promise<boolean> {
  const B = getBridge()
  if (!B) return Promise.resolve(false)
  return B.conversation.rename(c.id, newName).then(() => {
    state.convs = state.convs.map(v => v.id === c.id ? { ...v, name: newName } : v)
    saveConvs()
    return true
  }).catch(() => false)
}

export function deleteConv(c: Conversation): Promise<boolean> {
  const B = getBridge()
  if (!B) return Promise.resolve(false)
  return B.conversation.delete(c.id).then(() => {
    _localConvTs.delete(c.id)
    state.convs = state.convs.filter(v => v.id !== c.id)
    saveConvs()

    if (c.id === state.activeConv) {
      state.activeConv = null
      state.msgs = []
      saveActive()
      if (state.convs.length > 0) switchConv(state.convs[0])
      else startDraftConv()
    }
    return true
  }).catch(() => false)
}

export function createConv(): Promise<void> {
  const B = getBridge()
  if (!B) return Promise.resolve()
  return B.conversation.open().then((r) => {
    const newId = r.convId
    if (!newId) return
    const conv: Conversation = { id: newId, name: "\u65B0\u5BF9\u8BDD" }
    state.convs = [conv, ...state.convs]
    saveConvs()
    switchConv(conv)
  }).catch(() => {})
}

export function startDraftConv() {
  if (state.draftConvId || state.streaming) return
  state.draftConvId = "__draft_" + Date.now()
  state.activeConv = null
  state.msgs = []
}

export function removeDraftConv() {
  state.draftConvId = null
}

export function selectModel(m: Model) {
  state.activeModel = m
  if (m.enableStream !== 1) state.useStream = false
  const mtl = m.maxTokenList
  state.maxToken = (mtl && mtl.length) ? mtl[0].maxToken : (m.maxToken || 0)

  const B = getBridge()
  if (B?.model) B.model.select(m.id, state.maxToken, m.enableStream === 1)
  savePrefs()
}

export function setUseStream(v: boolean) {
  state.useStream = v
  savePrefs()
}

export function setMaxToken(v: number) {
  state.maxToken = v
  const B = getBridge()
  if (B?.model && state.activeModel) B.model.select(state.activeModel.id, v, state.activeModel.enableStream === 1)
  savePrefs()
}

function savePrefs() {
  const p: Prefs = {}
  if (state.activeModel) p.modelId = state.activeModel.id
  p.stream = state.useStream
  p.maxToken = state.maxToken
  idbPut(PREFS_KEY, p)
}

function loadPrefs(): Promise<Prefs> {
  return idbGet(PREFS_KEY).then((p) => (p as Prefs) || {})
}

export function fetchModels(): Promise<void> {
  const B = getBridge()
  if (!B?.model) return Promise.resolve()
  return B.model.list().then((r) => {
    state.models = asList<Model>(r)
    if (!state.models.length) return

    return loadPrefs().then((prefs) => {
      let target: Model | null = null
      if (prefs.modelId) {
        target = state.models.find(m => m.id === prefs.modelId) || null
      }
      if (!target) target = state.models[0]
      if (prefs.stream !== undefined) state.useStream = !!prefs.stream
      selectModel(target)

      if (prefs.maxToken && target.maxTokenList && target.maxTokenList.length > 1) {
        const found = target.maxTokenList.some(opt => opt.maxToken === prefs.maxToken)
        if (found) {
          state.maxToken = prefs.maxToken!
          const B2 = getBridge()
          if (B2?.model) B2.model.select(target.id, state.maxToken, target.enableStream === 1)
          savePrefs()
        }
      }
    })
  }).catch(() => { state.models = [] })
}

function applyTheme(t: ThemeColor) {
  if (t === "red") document.documentElement.removeAttribute("data-theme")
  else document.documentElement.setAttribute("data-theme", t)
}

function _loadThemeLocale(): Promise<void> {
  return Promise.all([
    idbGet(THEME_KEY),
    idbGet(LOCALE_KEY)
  ]).then(([t, l]) => {
    if (t && THEME_COLORS.includes(t as ThemeColor)) {
      state.theme = t as ThemeColor
      applyTheme(state.theme)
    }
    if (l && typeof l === "string") {
      state.locale = l as Locale
      i18nSetLocale(state.locale)
    }
  }).catch(() => {})
}

function _loadCachedStatus(convId: string | number): Promise<void> {
  return idbGet(STATUS_PREFIX + convId).then((v) => {
    if (v && typeof v === "object") state.lastStatus = v as Record<string, unknown>
    else state.lastStatus = null
  }).catch(() => {})
}

export function setTheme(t: ThemeColor) {
  state.theme = t
  applyTheme(t)
  idbPut(THEME_KEY, t)
}

export function setAppLocale(l: Locale) {
  state.locale = l
  i18nSetLocale(l)
  idbPut(LOCALE_KEY, l)
}

const SYSTEM_PROMPT = [
  '请给我返回如下格式的json字符串',
  '"choices": ["choice1", "choice2", ...], //至少提供7条选择 永远是奇数',
  '"status": {',
  '"世界": {',
  '"事件": "...", //当前世界时间',
  '"天气": "...", //当前世界天气',
  '"地点": "...", //当前场景地点',
  '"人物": ["人物1", "人物2",...] //在场的角色',
  '}',
  '}'
].join('\n')

export function initStore() {
  const B = getBridge()
  state.connected = !!B
  if (!B) return

  fetchModels()
  fetchRole()
  initSaveSystem()
  _loadThemeLocale()
  if (B.session?.init) B.session.init(SYSTEM_PROMPT).catch(() => {})

  Promise.all([
    idbGet(CONV_KEY),
    idbGet(ACTIVE_KEY)
  ]).then(([cachedConvs, cachedActive]) => {
    if (Array.isArray(cachedConvs) && cachedConvs.length) {
      state.convs = cachedConvs as Conversation[]
    }

    return syncConvList().then(() => {
      if (!state.convs.length) return

      let target: Conversation | null = null
      const earlyId = cachedActive as string | number | null
      if (earlyId) target = findConv(earlyId)
      if (!target) target = state.convs[0]
      switchConv(target)
    })
  }).catch(() => {})
}

export function clearScrollTarget() {
  state.scrollToMsgId = null
}

export function setLastChoices(choices: string[]) {
  state.lastChoices = choices
}

export function clearLastChoices() {
  state.lastChoices = []
}

export function submitChoices(selected: string[]) {
  if (state.streaming || !selected.length) return
  const text = selected.join(" / ")
  const B = getBridge()
  if (B?.prompt?.next) B.prompt.next.add("choice", text)
  sendMessage(text)
}

export function isStreamActive(): boolean {
  return state.useStream && state.activeModel?.enableStream === 1
}

const MIN_SAVE_INTERVAL = 10
const MAX_SAVE_BYTES = 2 * 1024 * 1024

let _autoSaveTimer = 0
let _saveSystemInited = false

function _saveSavePrefs() {
  idbPut(SAVE_PREFS_KEY, { enabled: state.autoSaveEnabled, interval: state.autoSaveInterval })
}

function _loadSavePrefs(): Promise<void> {
  return idbGet(SAVE_PREFS_KEY).then((p) => {
    if (p && typeof p === "object") {
      const sp = p as { enabled?: boolean; interval?: number }
      if (sp.enabled !== undefined) state.autoSaveEnabled = !!sp.enabled
      if (sp.interval && sp.interval >= MIN_SAVE_INTERVAL) state.autoSaveInterval = sp.interval
    }
    if (state.autoSaveEnabled) _startAutoSaveTimer()
  })
}

function _startAutoSaveTimer() {
  _stopAutoSaveTimer()
  if (!state.autoSaveEnabled || state.autoSaveInterval < MIN_SAVE_INTERVAL) return
  _autoSaveTimer = window.setInterval(() => {
    if (document.visibilityState === "hidden") return
    doCloudSave().catch(() => {})
  }, state.autoSaveInterval * 1000)
}

function _stopAutoSaveTimer() {
  if (_autoSaveTimer) {
    clearInterval(_autoSaveTimer)
    _autoSaveTimer = 0
  }
}

export function setAutoSaveEnabled(v: boolean) {
  state.autoSaveEnabled = v
  _saveSavePrefs()
  if (v) _startAutoSaveTimer()
  else _stopAutoSaveTimer()
}

const MAX_SAVE_INTERVAL = 3600

export function setAutoSaveInterval(v: number) {
  if (v < MIN_SAVE_INTERVAL) v = MIN_SAVE_INTERVAL
  if (v > MAX_SAVE_INTERVAL) v = MAX_SAVE_INTERVAL
  state.autoSaveInterval = v
  _saveSavePrefs()
  if (state.autoSaveEnabled) _startAutoSaveTimer()
}

function _buildSavePayload(): Uint8Array | null {
  if (!state.activeConv || state.streaming) return null
  const payload = JSON.stringify({
    convId: state.activeConv,
    msgs: state.msgs,
    model: state.activeModel?.id,
    ts: Date.now()
  })
  const data = new TextEncoder().encode(payload)
  if (data.byteLength > MAX_SAVE_BYTES) return null
  return data
}

function _toSavePng(data: Uint8Array): Promise<Blob> {
  const meta = { kind: "chat-save", version: "1.0.0" }
  return envelopeToBlob(packEnvelope(meta, data))
}

export function doCloudSave(): Promise<boolean> {
  const save = getSaveBridge()
  if (!save) return Promise.resolve(false)
  const data = _buildSavePayload()
  if (!data) return Promise.resolve(false)

  const roleId = getRoleId()
  const convId = state.activeConv!

  return _toSavePng(data).then((blob) => {
    return blob.arrayBuffer()
  }).then((buf) => {
    return save.upload(new Uint8Array(buf), roleId, convId)
  }).then(() => true).catch(() => false)
}

export function doDownloadSave(): Promise<boolean> {
  const data = _buildSavePayload()
  if (!data) return Promise.resolve(false)

  const convId = state.activeConv!
  const roleId = getRoleId()
  const name = "chat-" + roleId + "-" + convId + "-" + Date.now() + ".png"

  return _toSavePng(data).then((blob) => {
    downloadBlob(blob, name)
    return true
  }).catch(() => false)
}

export function initSaveSystem() {
  if (_saveSystemInited) return
  _saveSystemInited = true
  _loadSavePrefs().catch(() => {})
}

export function destroySaveSystem() {
  _saveSystemInited = false
  _stopAutoSaveTimer()
}

export function checkWelcomed(): Promise<boolean> {
  const B = getBridge()
  if (B?.storage?.localStorage) {
    return B.storage.localStorage.getItem(WELCOMED_KEY, "global").then(v => !!v).catch(() => false)
  }
  try { return Promise.resolve(!!localStorage.getItem(WELCOMED_KEY)) }
  catch { return Promise.resolve(false) }
}

export function markWelcomed(): Promise<void> {
  const B = getBridge()
  if (B?.storage?.localStorage) {
    return B.storage.localStorage.setItem(WELCOMED_KEY, "1", "global").catch(() => {})
  }
  try { localStorage.setItem(WELCOMED_KEY, "1") }
  catch {}
  return Promise.resolve()
}
