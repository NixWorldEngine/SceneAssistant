import type { Conversation, Message, Model, StreamCallback, RoleData } from "./types"

export interface ModelParam {
  id?: number
  token?: number
  stream?: boolean
}

export interface SessionInfo {
  roleId: number
  convId: string | number
  modelId: number
  device: {
    width: number
    height: number
    dpr: number
    type: "mobile" | "pc"
    browser: string
    darkMode: boolean
  }
}

export interface OCSBridge {
  conversation: {
    list(): Promise<Conversation[]>
    open(id?: string | number): Promise<{ convId: string | number; messages: Message[]; last: string | number | null }>
    rename(id: string | number, name: string): Promise<void>
    delete(id: string | number): Promise<void>
    fork(messageId: string | number): Promise<{ id: string | number }>
  }
  message: {
    send(text: string, model?: ModelParam, convId?: string | number): Promise<StreamCallback | Message> | StreamCallback
    edit(id: string | number, text: string, regenerate?: boolean): Promise<StreamCallback | Message | void>
    delete(id: string | number): Promise<void>
    regenerate(id: string | number, stream?: boolean): Promise<StreamCallback | Message> | StreamCallback
    history(page?: number): Promise<Message[]>
  }
  role: {
    query(): Promise<RoleData>
  }
  model: {
    list(): Promise<Model[]>
    select(id: number, token: number, stream: boolean): void
  }
  session: {
    init(prompt?: string | null): Promise<{ models: Model[]; role: RoleData; context: { roleId: number; convId: string | number; modelId: number } }>
    get(): SessionInfo
  }
  prompt: {
    next: {
      add(key: string, value: string): void
      get(): Record<string, string>
      remove(key: string): void
    }
  }
  storage: {
    idb: {
      get(db: string, key: string): Promise<unknown>
      put(db: string, key: string, value: unknown): Promise<void>
      remove(db: string, key: string): Promise<void>
      getAll(db: string, store?: string, count?: number, scope?: string): Promise<unknown[]>
      count(db: string, store?: string, scope?: string): Promise<number>
      keys(db: string, store?: string, scope?: string): Promise<string[]>
      deleteDb(db: string): Promise<void>
    }
    localStorage: {
      setItem(key: string, value: string, scope?: string): Promise<void>
      getItem(key: string, scope?: string): Promise<string | null>
      removeItem(key: string, scope?: string): Promise<void>
      length(): Promise<number>
      clear(): Promise<void>
    }
    sessionStorage: {
      setItem(key: string, value: string): Promise<void>
      getItem(key: string): Promise<string | null>
      removeItem(key: string): Promise<void>
    }
    opfs: {
      write(path: string, data: string, encoding: string): Promise<void>
      read(path: string, encoding: string): Promise<string>
      stat(path: string): Promise<unknown>
      delete(path: string, recursive?: boolean): Promise<void>
      mkdir(path: string): Promise<void>
      list(path?: string): Promise<unknown[]>
    }
  }
  save: {
    upload(data: unknown, roleId: number, convId: string | number, folderId?: number): Promise<unknown>
    download(roleId: number, convId: string | number, folderId?: number): Promise<unknown>
    list(folderId?: number): Promise<unknown>
  }
  cache: {
    clear(scopes: string[], refresh?: boolean): Promise<boolean>
  }
  kag: {
    getMergedIds(): Promise<string[]>
    backfillMsg(msgId: string | number, raw: string): Promise<{ merged: boolean }>
  }
  clipboard: {
    write(text: string): Promise<boolean>
  }
  setting: {
    open(): void
  }
  worker: {
    create(code: string): Promise<{ onmessage: ((d: unknown) => void) | null; postMessage(d: unknown): void; terminate(): Promise<void> }>
  }
  flush(all?: boolean): Promise<boolean>
  close(): Promise<void>
  _meta?: { version?: string; cdnPrefix?: string; hash?: string; time?: string }
}

declare global {
  interface Window {
    OCS?: OCSBridge
    AC_Bridge?: OCSBridge
    AC?: { VERSION?: string; BUILD_HASH?: string; BUILD_TIME?: string }
  }
}

export function getBridge(): OCSBridge | null {
  return window.OCS || window.AC_Bridge || null
}

export function getIdb() {
  const b = getBridge()
  return b?.storage?.idb || null
}

export function getViewVersion(): string {
  if (window.AC?.VERSION) return "v" + window.AC.VERSION
  const b = getBridge()
  if (b?._meta?.version) return "v" + b._meta.version
  return ""
}

export function getOcsVersion(): string {
  const b = getBridge()
  if (b?._meta?.version) return "v" + b._meta.version
  return ""
}

export function getBuildHash(): string {
  if (window.AC?.BUILD_HASH) return window.AC.BUILD_HASH
  const b = getBridge()
  return b?._meta?.hash || ""
}

export function getBuildTime(): string {
  if (window.AC?.BUILD_TIME) return window.AC.BUILD_TIME
  const b = getBridge()
  return b?._meta?.time || ""
}

export function getRoleId(): number {
  const b = getBridge()
  if (!b?.session) return 0
  const info = b.session.get()
  return info.roleId || 0
}

export function getSaveBridge() {
  const b = getBridge()
  return b?.save || null
}

export function getCacheBridge() {
  const b = getBridge()
  return b?.cache || null
}

const DEFAULT_CDN = "https://r2.sexyai.top"

export function getCdnPrefix(): string {
  const b = getBridge()
  return b?._meta?.cdnPrefix || DEFAULT_CDN
}
