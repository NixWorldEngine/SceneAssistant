<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue"
import { store, clearScrollTarget } from "@/store"
import { t } from "@/i18n"
import { getCdnPrefix } from "@/bridge"
import MessageBubble from "./MessageBubble.vue"

const VIRTUAL_THRESHOLD = 50
const BUFFER_PX = 600
const DEFAULT_HEIGHT = 80

const emit = defineEmits<{
  confirm: [title: string, callback: (ok: boolean) => void]
}>()

const listEl = ref<HTMLElement | null>(null)
let rafId = 0

const heightCache = new Map<string | number, number>()
const vStart = ref(0)
const vEnd = ref(0)

const useVirtual = computed(() => store.msgs.length > VIRTUAL_THRESHOLD)

function msgKey(m: { id: string | number | null }, i: number): string | number {
  return m.id ?? i
}

function cachedHeight(key: string | number): number {
  return heightCache.get(key) ?? DEFAULT_HEIGHT
}

function totalHeight(): number {
  let h = 0
  for (let i = 0; i < store.msgs.length; i++) {
    h += cachedHeight(msgKey(store.msgs[i], i)) + 12
  }
  return h
}

function computeRange() {
  const el = listEl.value
  if (!el || !useVirtual.value) {
    vStart.value = 0
    vEnd.value = store.msgs.length
    return
  }

  const scrollTop = el.scrollTop
  const viewH = el.clientHeight
  const top = Math.max(0, scrollTop - BUFFER_PX)
  const bottom = scrollTop + viewH + BUFFER_PX

  let accum = 0
  let start = 0
  let end = store.msgs.length

  for (let i = 0; i < store.msgs.length; i++) {
    const h = cachedHeight(msgKey(store.msgs[i], i)) + 12
    if (accum + h >= top && start === 0 && i > 0) start = i
    accum += h
    if (accum > bottom) { end = i + 1; break }
  }

  if (store.streaming && end < store.msgs.length) {
    end = store.msgs.length
  }

  vStart.value = start
  vEnd.value = end
}

const spacerTop = computed(() => {
  if (!useVirtual.value) return 0
  let h = 0
  for (let i = 0; i < vStart.value; i++) {
    h += cachedHeight(msgKey(store.msgs[i], i)) + 12
  }
  return h
})

const spacerBottom = computed(() => {
  if (!useVirtual.value) return 0
  let h = 0
  for (let i = vEnd.value; i < store.msgs.length; i++) {
    h += cachedHeight(msgKey(store.msgs[i], i)) + 12
  }
  return h
})

const visibleMsgs = computed(() => {
  if (!useVirtual.value) return store.msgs.map((m, i) => ({ m, i }))
  return store.msgs.slice(vStart.value, vEnd.value).map((m, j) => ({ m, i: vStart.value + j }))
})

let resizeObserver: ResizeObserver | null = null

function measureHeights() {
  const el = listEl.value
  if (!el) return

  const bubbles = el.querySelectorAll<HTMLElement>(".msg[data-id]")
  bubbles.forEach((node) => {
    const id = node.getAttribute("data-id")
    if (id != null) heightCache.set(id, node.offsetHeight)
  })

  const unkeyed = el.querySelectorAll<HTMLElement>(".msg:not([data-id])")
  unkeyed.forEach((node) => {
    const idx = node.getAttribute("data-idx")
    if (idx != null) heightCache.set(Number(idx), node.offsetHeight)
  })
}

function setupResizeObserver() {
  if (resizeObserver) return
  resizeObserver = new ResizeObserver(() => {
    measureHeights()
    if (useVirtual.value) computeRange()
  })
  const el = listEl.value
  if (el) resizeObserver.observe(el)
}

function scrollToBottom() {
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    if (listEl.value) listEl.value.scrollTop = listEl.value.scrollHeight
  })
}

function applyScrollTarget() {
  const id = store.scrollToMsgId
  if (!id) return

  if (useVirtual.value) {
    const idx = store.msgs.findIndex(m => String(m.id) === String(id))
    if (idx >= 0 && (idx < vStart.value || idx >= vEnd.value)) {
      vStart.value = Math.max(0, idx - 5)
      vEnd.value = Math.min(store.msgs.length, idx + 20)
    }
  }

  nextTick(() => {
    const el = listEl.value
    if (!el) return
    const target = el.querySelector(`[data-id="${id}"]`) as HTMLElement | null
    if (!target) return
    const containerH = el.clientHeight
    const targetBottom = target.offsetTop + target.offsetHeight
    el.scrollTop = Math.max(0, targetBottom - containerH)
    clearScrollTarget()
  })
}

const showScrollBtn = ref(false)

function _checkScrollBtn() {
  const el = listEl.value
  if (!el) { showScrollBtn.value = false; return }
  const gap = el.scrollHeight - el.scrollTop - el.clientHeight
  showScrollBtn.value = gap > 200
}

function onScroll() {
  if (useVirtual.value) computeRange()
  _checkScrollBtn()
}

watch(() => store.msgs.length, () => {
  nextTick(() => {
    measureHeights()
    if (useVirtual.value) computeRange()
    if (store.scrollToMsgId) applyScrollTarget()
    else scrollToBottom()
  })
})

watch(() => store.msgs[store.msgs.length - 1]?.content, () => {
  if (!store.scrollToMsgId && store.streaming) scrollToBottom()
})

onMounted(() => {
  listEl.value?.addEventListener("scroll", onScroll, { passive: true })
  setupResizeObserver()
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  listEl.value?.removeEventListener("scroll", onScroll)
  if (resizeObserver) { resizeObserver.disconnect(); resizeObserver = null }
})

const bgStyle = computed(() => {
  const url = store.role?.imageUrl
  if (!url) return {}
  const full = url.startsWith("http") ? url : getCdnPrefix() + url
  return {
    backgroundImage: `linear-gradient(rgba(5,5,5,0.75),rgba(5,5,5,0.75)),url(${full})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  }
})

const showBeginning = computed(() => {
  return store.msgs.length === 0 && !store.streaming && !!store.processedBeginning
})

const showEmptyHint = computed(() => {
  return store.msgs.length === 0 && !store.streaming && !store.processedBeginning
})

defineExpose({ scrollToBottom })
</script>

<template>
  <div id="messages" ref="listEl" :style="bgStyle" :class="{ 'messages-beginning': showBeginning || showEmptyHint }">
    <div
      v-if="showBeginning"
      class="beginning-content md-body"
      v-html="store.processedBeginning"
    ></div>

    <div v-if="showEmptyHint" class="empty-hint">
      <svg class="empty-hint-icon" width="40" height="40" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="92" stroke="currentColor" stroke-width="4" opacity="0.3"/>
        <line x1="100" y1="165" x2="100" y2="72" stroke="currentColor" stroke-width="8" stroke-linecap="round" opacity="0.4"/>
        <line x1="100" y1="140" x2="56" y2="96" stroke="currentColor" stroke-width="8" stroke-linecap="round" opacity="0.4"/>
        <line x1="100" y1="140" x2="144" y2="96" stroke="currentColor" stroke-width="8" stroke-linecap="round" opacity="0.4"/>
        <circle cx="100" cy="55" r="24" fill="currentColor" opacity="0.25"/>
        <circle cx="52" cy="85" r="20" fill="currentColor" opacity="0.25"/>
        <circle cx="148" cy="85" r="20" fill="currentColor" opacity="0.25"/>
      </svg>
      <div class="empty-hint-text">{{ t("chat.start_hint") }}</div>
    </div>

    <div v-if="useVirtual" :style="{ height: spacerTop + 'px' }" />

    <MessageBubble
      v-for="{ m, i } in visibleMsgs"
      :key="m.id || i"
      :message="m"
      :data-idx="m.id ? undefined : i"
      @confirm="(title, cb) => emit('confirm', title, cb)"
    />

    <div v-if="useVirtual" :style="{ height: spacerBottom + 'px' }" />
  </div>

  <Transition name="scroll-btn">
    <button
      v-if="showScrollBtn && !store.streaming"
      class="scroll-bottom-btn"
      @click="scrollToBottom"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </button>
  </Transition>
</template>
