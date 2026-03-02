<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from "vue"
import type { Message } from "@/types"
import { store, editMsg, deleteMsg, regenMsg, submitChoices, addToKag } from "@/store"
import { renderContent, wrapCjkQuotes } from "@/render"
import { getBridge } from "@/bridge"
import { isMobile } from "@/device"
import { t } from "@/i18n"
import { formatModelLabel } from "@/format"
import ChoicePanel from "./ChoicePanel.vue"

const props = defineProps<{ message: Message }>()
const emit = defineEmits<{
  confirm: [title: string, callback: (ok: boolean) => void]
}>()

const editModal = ref(false)
const editClosing = ref(false)
const editText = ref("")
const editError = ref("")

const copied = ref(false)
let copyTimer = 0
let editCloseTimer = 0
let actionCloseTimer = 0
let mouseUpTimer = 0
const ctxMenu = ref<{ x: number; y: number } | null>(null)
const actionSheet = ref(false)
const actionSheetClosing = ref(false)
const selPopup = ref<{ x: number; y: number } | null>(null)
const msgEl = ref<HTMLElement | null>(null)

const role = computed(() => props.message.role || "user")

const roleLabel = computed(() => {
  if (role.value === "user") return t("chat.you_formal")
  if (!store.activeModel) return store.role?.name || t("chat.assistant")
  const name = formatModelLabel(store.activeModel.name || String(store.activeModel.id))
  const tk = store.maxToken
  if (tk >= 1000) return name + " " + Math.round(tk / 1000) + "kt"
  if (tk > 0) return name + " " + tk + "t"
  return name
})

const content = computed(() => {
  if (role.value === "user") {
    const origin = props.message.extra?.origin as string
    if (origin) return origin
  }
  return props.message.content || ""
})

const isStreaming = computed(() => {
  if (!store.streaming || role.value !== "assistant") return false
  const msgs = store.msgs
  const last = msgs[msgs.length - 1]
  return last === props.message || (last?.id != null && last.id === props.message.id)
})

const isThinking = computed(() => isStreaming.value && !content.value)

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

const hasError = computed(() => !!props.message.error)

const errorHint = computed(() => {
  const e = props.message.error || ""
  if (e.indexOf("server_error") >= 0 || e.indexOf("511") >= 0) return t("chat.error_server")
  if (e.indexOf("timeout") >= 0) return t("chat.error_timeout")
  return t("chat.error_generic")
})

const showErrorDetail = ref(false)

const renderedContent = computed(() => {
  if (isStreaming.value) {
    let html = escapeHtml(content.value).replace(/\n/g, "<br>")
    return wrapCjkQuotes(html)
  }
  return renderContent(content.value)
})

const timeStr = computed(() => {
  const ts = props.message.createdTime || props.message.created_at
  if (!ts) return ""
  return new Date(ts).toLocaleTimeString()
})

const choices = computed(() => {
  const ex = props.message.extra
  if (!ex || !Array.isArray(ex.choices)) return [] as string[]
  return (ex.choices as unknown[]).filter((c): c is string => typeof c === "string")
})

const isLastAsst = computed(() => {
  const msgs = store.msgs
  for (let i = msgs.length - 1; i >= 0; i--) {
    if (msgs[i].role === "assistant") return msgs[i] === props.message || (msgs[i].id != null && msgs[i].id === props.message.id)
  }
  return false
})

const showChoicePanel = ref(true)

const kagState = computed<"none" | "in" | "available" | "missing">(() => {
  if (isStreaming.value || role.value !== "assistant" || store.streaming) return "none"
  const mid = props.message.id
  if (mid && store.kagMergedIds.has(String(mid))) return "in"
  const ex = props.message.extra
  if (ex && ex.kagDone) return "in"
  if (mid && ex?.raw) return "available"
  return "missing"
})

const kagAdding = ref(false)

function onAddKag() {
  if (kagAdding.value || kagState.value !== "available") return
  kagAdding.value = true
  const m = props.message
  console.log("[KAG:UI] onAddKag id:", m.id, "hasRaw:", !!(m.extra?.raw), "rawLen:", (m.extra?.raw as string)?.length || 0)
  addToKag(m).then((ok) => {
    console.log("[KAG:UI] addToKag result:", ok)
  }).finally(() => { kagAdding.value = false })
}

const copiedAll = ref(false)
let copyAllTimer = 0

function onCopyAll() {
  const ex = props.message.extra
  const raw = ex?.raw as string || ""
  copyText(raw || content.value)
  clearTimeout(copyAllTimer)
  copiedAll.value = true
  copyAllTimer = window.setTimeout(() => { copiedAll.value = false }, 3000)
}

function onChoiceSubmit(selected: string[]) {
  if (!selected.length) return
  showChoicePanel.value = false
  submitChoices(selected)
}

function startEdit() {
  editText.value = content.value
  editError.value = ""
  editClosing.value = false
  editModal.value = true
  ctxMenu.value = null
  closeActionSheet()
}

function closeEditModal() {
  editClosing.value = true
  clearTimeout(editCloseTimer)
  editCloseTimer = window.setTimeout(() => { editModal.value = false; editClosing.value = false }, 250)
}

function saveEdit() {
  const text = editText.value.trim()
  if (!text || text === content.value) { closeEditModal(); return }
  editMsg(props.message, text).then((ok) => {
    if (ok) closeEditModal()
    else editError.value = t("chat.edit_failed")
  })
}

function onDelete() {
  ctxMenu.value = null
  closeActionSheet()
  emit("confirm", t("chat.delete_msg"), (ok) => {
    if (ok) deleteMsg(props.message)
  })
}

function onRegen() {
  ctxMenu.value = null
  closeActionSheet()
  regenMsg(props.message)
}

function copyText(text: string) {
  const B = getBridge()
  if (B?.clipboard) B.clipboard.write(text).catch(() => {})
}

function onCopy() {
  ctxMenu.value = null
  closeActionSheet()
  copyText(content.value)
  clearTimeout(copyTimer)
  copied.value = true
  copyTimer = window.setTimeout(() => { copied.value = false }, 3000)
}

function openActionSheet() {
  actionSheetClosing.value = false
  actionSheet.value = true
}

function closeActionSheet() {
  if (!actionSheet.value) return
  actionSheetClosing.value = true
  clearTimeout(actionCloseTimer)
  actionCloseTimer = window.setTimeout(() => { actionSheet.value = false; actionSheetClosing.value = false }, 250)
}

const CTX_MENU_W = 140

function onContextMenu(e: MouseEvent | TouchEvent) {
  e.preventDefault()
  selPopup.value = null

  if (isMobile.value) {
    openActionSheet()
  } else {
    let cx = 0, cy = 0
    if ("clientX" in e) { cx = e.clientX; cy = e.clientY }
    else if (e.touches && e.touches.length) { cx = e.touches[0].clientX; cy = e.touches[0].clientY }
    const vw = document.documentElement.clientWidth
    const vh = document.documentElement.clientHeight
    const menuH = role.value === "assistant" ? 152 : 120
    const x = Math.min(cx, vw - CTX_MENU_W - EDGE_PAD)
    const y = Math.min(cy, vh - menuH - EDGE_PAD)
    ctxMenu.value = { x, y }
  }
}

function closeMenus() {
  ctxMenu.value = null
  selPopup.value = null
}

function onSelectionCopy() {
  const sel = window.getSelection()
  if (sel && sel.toString()) copyText(sel.toString())
  selPopup.value = null
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function buildFlexPattern(text: string): RegExp {
  const parts = text.split(/\s+/).filter(Boolean).map(escapeRegex)
  if (!parts.length) return new RegExp(escapeRegex(text))
  return new RegExp(parts.join("\\s+"))
}

function onSelectionDelete() {
  const sel = window.getSelection()
  if (!sel || !sel.toString() || !props.message.id) {
    selPopup.value = null
    return
  }
  const selectedText = sel.toString()
  sel.removeAllRanges()

  const pos = content.value.indexOf(selectedText)
  let newContent = pos >= 0
    ? content.value.slice(0, pos) + content.value.slice(pos + selectedText.length)
    : content.value
  if (newContent === content.value) {
    newContent = content.value.replace(buildFlexPattern(selectedText), "")
  }
  if (newContent === content.value) {
    selPopup.value = null
    return
  }

  newContent = newContent.replace(/\n{3,}/g, "\n\n").trim()
  editMsg(props.message, newContent).catch(() => {})
  selPopup.value = null
}

const POPUP_W = 140
const POPUP_H = 32
const EDGE_PAD = 8

function clampPopup(x: number, y: number): { x: number; y: number } {
  const vw = document.documentElement.clientWidth
  const vh = document.documentElement.clientHeight
  const half = POPUP_W / 2
  const cx = Math.max(EDGE_PAD + half, Math.min(x, vw - EDGE_PAD - half))
  const cy = Math.max(EDGE_PAD + POPUP_H, Math.min(y, vh - EDGE_PAD))
  return { x: cx, y: cy }
}

function onMouseUp() {
  if (role.value === "user" || isMobile.value) return

  clearTimeout(mouseUpTimer)
  mouseUpTimer = window.setTimeout(() => {
    const sel = window.getSelection()
    if (!sel || sel.isCollapsed || !sel.toString().trim()) {
      selPopup.value = null
      return
    }

    if (!msgEl.value) return
    const contentEl = msgEl.value.querySelector(".msg-content")
    if (!contentEl) return
    const hasAnchor = sel.anchorNode && contentEl.contains(sel.anchorNode)
    const hasFocus = sel.focusNode && contentEl.contains(sel.focusNode)
    if (!hasAnchor && !hasFocus) return

    const range = sel.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    selPopup.value = clampPopup(rect.left + rect.width / 2, rect.top - 8)
  }, 10)
}

function onDocClick(e: MouseEvent) {
  if (ctxMenu.value) {
    ctxMenu.value = null
  }
}

watch(ctxMenu, (menu) => {
  if (menu) {
    document.addEventListener("click", onDocClick)
  } else {
    document.removeEventListener("click", onDocClick)
  }
})

onUnmounted(() => {
  document.removeEventListener("click", onDocClick)
  clearTimeout(copyTimer)
  clearTimeout(copyAllTimer)
  clearTimeout(editCloseTimer)
  clearTimeout(actionCloseTimer)
  clearTimeout(mouseUpTimer)
})
</script>

<template>
  <div
    ref="msgEl"
    class="msg"
    :class="[role, { streaming: isStreaming }]"
    :data-id="message.id || ''"
    @contextmenu="onContextMenu"
    @mouseup="onMouseUp"
  >
    <div class="msg-role-label">{{ roleLabel }}</div>

    <div v-if="isThinking" class="msg-thinking">
      <svg class="msg-thinking-svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="4" cy="12" r="2" fill="currentColor"><animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" begin="0s"/></circle>
        <circle cx="12" cy="12" r="2" fill="currentColor"><animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" begin="0.2s"/></circle>
        <circle cx="20" cy="12" r="2" fill="currentColor"><animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" begin="0.4s"/></circle>
      </svg>
      <span class="msg-thinking-text">{{ t("chat.thinking") }}</span>
    </div>

    <div v-if="(content || isStreaming) && !isThinking" class="msg-content md-body" v-html="renderedContent"></div>

    <div v-if="role === 'assistant' && !isStreaming && !store.streaming && content" class="msg-capsule-bar">
      <ChoicePanel
        v-if="isLastAsst && choices.length && showChoicePanel"
        :choices="choices"
        @submit="onChoiceSubmit"
      />
      <button class="msg-capsule" @click="onCopyAll">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        {{ copiedAll ? "✓" : t("chat.copy_all") }}
      </button>
      <button v-if="kagState === 'in'" class="msg-capsule kag-ok" disabled>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
        {{ t("chat.kag_in") }}
      </button>
      <button v-else-if="kagState === 'available'" class="msg-capsule kag-add" :disabled="kagAdding" @click="onAddKag">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        {{ kagAdding ? t("chat.kag_adding") : t("chat.kag_add") }}
      </button>
      <button v-else-if="kagState === 'missing'" class="msg-capsule kag-err">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        {{ t("chat.kag_missing") }}
      </button>
    </div>

    <div v-if="hasError && role === 'assistant'" class="msg-error-bar">
      <button class="msg-error-capsule" @click="showErrorDetail = !showErrorDetail">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        {{ t("chat.error_generic").split(" ")[0] }}
      </button>
      <button class="msg-retry-btn" @click="onRegen">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
        {{ t("chat.regenerate") }}
      </button>
    </div>
    <div v-if="hasError && showErrorDetail" class="msg-error-detail">{{ errorHint }}</div>

    <div v-if="message.id && !editModal" class="msg-acts">
      <button v-if="role === 'assistant'" :title="t('chat.copy')" @click="onCopy">
        <svg v-if="copied" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
      </button>
    </div>

    <div class="msg-time">{{ timeStr }}</div>
  </div>

  <Teleport to="body">
    <div
      v-if="ctxMenu"
      class="ctx-menu"
      :style="{ left: ctxMenu.x + 'px', top: ctxMenu.y + 'px' }"
      @click.stop
    >
      <button @click="startEdit">{{ t("chat.edit") }}</button>
      <button @click="onCopy">{{ t("chat.copy") }}</button>
      <button v-if="role === 'assistant'" @click="onRegen">{{ t("chat.regenerate") }}</button>
      <button class="danger" @click="onDelete">{{ t("chat.delete") }}</button>
    </div>

    <div v-if="actionSheet" class="action-sheet-mask" :class="{ 'fade-out': actionSheetClosing }" @click.self="closeActionSheet">
      <div class="action-sheet">
        <button class="action-sheet-item" @click="startEdit">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          {{ t("chat.edit") }}
        </button>
        <button class="action-sheet-item" @click="onCopy">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          {{ t("chat.copy") }}
        </button>
        <button v-if="role === 'assistant'" class="action-sheet-item" @click="onRegen">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
          {{ t("chat.regenerate") }}
        </button>

        <button class="action-sheet-item danger" @click="onDelete">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          {{ t("chat.delete") }}
        </button>
      </div>
    </div>

    <div
      v-if="selPopup"
      class="sel-popup"
      :style="{ left: selPopup.x + 'px', top: selPopup.y + 'px', transform: 'translate(-50%, -100%)' }"
      @click.stop
    >
      <button class="sel-capsule" @mousedown.prevent @click="onSelectionCopy">{{ t("chat.copy") }}</button>
      <button class="sel-capsule danger" @mousedown.prevent @click="onSelectionDelete">{{ t("chat.delete") }}</button>
    </div>

    <div v-if="editModal" class="edit-fullscreen" :class="{ 'edit-closing': editClosing }">
      <div class="edit-fullscreen-header">
        <button class="edit-fullscreen-btn" @click="closeEditModal">{{ t("chat.cancel") }}</button>
        <span class="edit-fullscreen-title">{{ t("chat.edit") }}</span>
        <button class="edit-fullscreen-btn primary" @click="saveEdit">{{ t("chat.save") }}</button>
      </div>
      <textarea class="edit-fullscreen-textarea" v-model="editText" @keydown.escape="closeEditModal"></textarea>
      <div v-if="editError" class="msg-error" style="padding: 0 16px 8px">{{ editError }}</div>
    </div>
  </Teleport>
</template>
