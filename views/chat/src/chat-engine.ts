import type { Message, StreamCallback } from "./types"
import type { OCSBridge, ModelParam } from "./bridge"

let _sendGen = 0

export function wireStream(
  cb: StreamCallback,
  msg: Message,
  onStreaming: () => void,
  onDone: () => void,
  onError: (err: string) => void
) {
  const gen = ++_sendGen
  cb.onmsg = (c: string) => {
    if (_sendGen !== gen) return
    msg.content += c
    onStreaming()
  }
  cb.ondone = (content: string, msgId?: string | number, extra?: Record<string, unknown>) => {
    if (_sendGen !== gen) return
    if (content) msg.content = content
    msg.id = msgId || null
    if (extra && Object.keys(extra).length) msg.extra = extra
    onDone()
  }
  cb.onerr = (err: string) => {
    if (_sendGen !== gen) return
    msg.error = err
    onError(err)
  }
}

export function handleResult(
  result: unknown,
  msg: Message,
  useStream: boolean,
  callbacks: {
    onStreaming: () => void
    onDone: () => void
    onError: (err: string, convGone: boolean) => void
  }
) {
  if (useStream) {
    if (result && typeof (result as Promise<unknown>).then === "function") {
      (result as Promise<StreamCallback>).then((cb) => {
        wireStream(cb, msg, callbacks.onStreaming, callbacks.onDone, (err) => callbacks.onError(err, false))
      }).catch((e) => {
        msg.error = (e && e.message) || String(e)
        callbacks.onError(msg.error!, isConvGone(e))
      })
    } else if (result && typeof result === "object" && ("onmsg" in result || "ondone" in result)) {
      wireStream(result as StreamCallback, msg, callbacks.onStreaming, callbacks.onDone, (err) => callbacks.onError(err, false))
    } else {
      msg.error = "unexpected_response"
      callbacks.onError(msg.error, false)
    }
  } else {
    Promise.resolve(result as Message).then((r) => {
      const obj = r as Record<string, unknown>
      msg.content = (obj?.content as string) || JSON.stringify(r)
      if (obj?.id) msg.id = obj.id as string | number
      const extra = obj?.extra as Record<string, unknown> | undefined
      if (extra && Object.keys(extra).length) msg.extra = extra
      callbacks.onDone()
    }).catch((e) => {
      msg.error = (e && e.message) || String(e)
      callbacks.onError(msg.error!, isConvGone(e))
    })
  }
}

export function sendVia(
  bridge: OCSBridge,
  text: string,
  modelParam: ModelParam,
  convId: string | number,
  useStream: boolean,
  msg: Message,
  callbacks: {
    onStreaming: () => void
    onDone: () => void
    onError: (err: string, convGone: boolean) => void
  }
) {
  let result: unknown
  try {
    result = bridge.message.send(text, modelParam, convId || undefined)
  } catch (e) {
    msg.error = (e && (e as Error).message) || String(e)
    callbacks.onError(msg.error!, false)
    return
  }
  handleResult(result, msg, useStream, callbacks)
}

export function isConvGone(err: unknown): boolean {
  if (!err || typeof err !== "object") return false
  return (err as { code?: string }).code === "CONV_NOT_FOUND"
}

export function collapseNewlines(s: string): string {
  return s.replace(/\n{2,}/g, "\n")
}

export function cancelStream() {
  _sendGen++
}
