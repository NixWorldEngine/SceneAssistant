import type { Message } from "./types"
import { getIdb } from "./bridge"
import { createMsgCache } from "../../../ocs/shared/msg-cache"

const _cache = createMsgCache(getIdb)

export function cacheRead(convId: string | number): Promise<Message[] | null> {
  return _cache.read(convId) as Promise<Message[] | null>
}

export function cacheWrite(convId: string | number, msgs: Message[]): Promise<void> {
  return _cache.write(convId, msgs)
}

export function cacheRemove(convId: string | number): Promise<void> {
  return _cache.remove(convId)
}

export function cacheClear(): Promise<void> {
  return _cache.clear()
}
