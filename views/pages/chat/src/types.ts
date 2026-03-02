export interface Conversation {
  id: string | number
  name?: string
  title?: string
}

export interface Message {
  id: string | number | null
  role: string
  content: string
  type?: number
  direction?: number
  createdTime?: string
  created_at?: string
  error?: string
  extra?: Record<string, unknown>
}

export type ModelType = "ChatGPT" | "DeepSeek" | "Claude" | "Gemini" | "Grok" | "Other"

export interface Model {
  id: string | number
  name?: string
  type?: ModelType
  tag?: string
  description?: string
  enableStream?: number
  maxToken?: number
  maxTokenList?: TokenOption[]
  deductNum?: number
}

export interface TokenOption {
  maxToken: number
  deductNum?: number
}

export interface Prefs {
  modelId?: string | number
  stream?: boolean
  maxToken?: number
}

export interface StreamCallback {
  onmsg: ((chunk: string) => void) | null
  ondone: ((content: string, msgId?: string | number, extra?: Record<string, unknown>) => void) | null
  onerr: ((err: string) => void) | null
}

export interface RoleData {
  id: number
  name: string
  avatar?: string
  imageUrl?: string
  beginning?: string
  roleDesc?: string
  usageNum?: number
  pointsConsumed?: number
  playerNum?: number
  scoreNum?: number
  personalityWordCount?: number
  prologue?: PrologueItem[]
  [key: string]: unknown
}

export interface PrologueItem {
  title: string
  content: string
}

export interface PromptEntry {
  source: "prologue" | "injected"
  text: string
  oneshot: boolean
}

export interface ConvCacheMeta {
  convId: string | number
  lastMsgId: string | number | null
  msgCount: number
  updatedAt: number
}
