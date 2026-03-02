<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue"
import { store, sendMessage, isStreamActive, submitChoices } from "@/store"
import { ICON_SEND, ICON_BOLT } from "@/icons"
import { t } from "@/i18n"
import { formatModelLabel } from "@/format"
import { isMobile } from "@/device"
import ChoicePanel from "./ChoicePanel.vue"

const emit = defineEmits<{
  openModelModal: []
}>()

const inputEl = ref<HTMLTextAreaElement | null>(null)
const wrapEl = ref<HTMLElement | null>(null)
const text = ref("")
const moreOpen = ref(false)

const modelLabel = computed(() => {
  if (!store.activeModel) return t("chat.no_model")
  return formatModelLabel(store.activeModel.name || String(store.activeModel.id))
})

const streaming = computed(() => isStreamActive())

const tokenLabel = computed(() => {
  if (!store.maxToken) return ""
  return store.maxToken + "t"
})

const currentDeductNum = computed(() => {
  const m = store.activeModel
  if (!m) return 0
  if (m.maxTokenList && m.maxTokenList.length > 0) {
    const opt = m.maxTokenList.find(o => o.maxToken === store.maxToken)
    if (opt?.deductNum) return opt.deductNum
  }
  return m.deductNum || 0
})

function autoResize() {
  const el = inputEl.value
  if (!el) return
  el.style.height = "auto"
  el.style.height = Math.min(el.scrollHeight, 200) + "px"
}

function onSend() {
  const val = text.value.trim()
  if (!val) return
  sendMessage(val)
  text.value = ""
  if (inputEl.value) {
    inputEl.value.style.height = "auto"
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault()
    onSend()
  }
}

function toggleMore() {
  moreOpen.value = !moreOpen.value
}

function onMoreModel() {
  moreOpen.value = false
  emit("openModelModal")
}

function onDocClick(e: MouseEvent) {
  if (!moreOpen.value) return
  if (wrapEl.value && wrapEl.value.contains(e.target as Node)) return
  moreOpen.value = false
}

const choicePanelOpen = ref(false)

const hasLastChoices = computed(() => store.lastChoices.length > 0)

watch(hasLastChoices, (v) => { if (v) choicePanelOpen.value = true })

function onChoiceCapsuleClick() {
  choicePanelOpen.value = !choicePanelOpen.value
}

function onChoiceSubmit(selected: string[]) {
  choicePanelOpen.value = false
  if (!selected.length) return
  submitChoices(selected)
}

onMounted(() => document.addEventListener("pointerdown", onDocClick, true))
onUnmounted(() => document.removeEventListener("pointerdown", onDocClick, true))
</script>

<template>
  <div id="input-bar">
    <div class="input-capsules">
      <span
        class="input-capsule"
        :class="streaming ? 'stream' : 'normal'"
        @click="$emit('openModelModal')"
      >
        <span v-if="currentDeductNum" class="ic-cost"><span v-html="ICON_BOLT"></span>{{ currentDeductNum }}</span>
        <span class="ic-label">{{ modelLabel }}</span>
        <span v-if="tokenLabel" class="ic-token">{{ tokenLabel }}</span>
      </span>

      <span
        v-if="hasLastChoices"
        class="input-capsule choice-capsule"
        @click="onChoiceCapsuleClick"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <polyline points="9 11 12 14 22 4"/>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
        {{ t("chat.choices") }}
      </span>
    </div>

    <ChoicePanel
      v-if="choicePanelOpen && hasLastChoices"
      :choices="store.lastChoices"
      @submit="onChoiceSubmit"
    />

    <div class="input-row">
      <div v-if="isMobile" ref="wrapEl" class="more-menu-wrap">
        <Transition name="more-slide">
          <div v-if="moreOpen" class="more-popup">
            <button class="more-popup-item" :title="t('chat.select_model_short')" @click="onMoreModel">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </button>
          </div>
        </Transition>
        <button class="more-btn" :class="{ open: moreOpen }" @click="toggleMore">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </div>

      <textarea
        id="msg-input"
        ref="inputEl"
        v-model="text"
        rows="1"
        :placeholder="t('chat.placeholder')"
        spellcheck="false"
        @input="autoResize"
        @keydown="onKeydown"
        @focus="moreOpen = false"
      ></textarea>

      <button
        class="send-btn"
        :class="{ stream: streaming }"
        :disabled="store.streaming || !text.trim()"
        :title="t('chat.send')"
        @click="onSend"
        v-html="ICON_SEND"
      ></button>
    </div>
  </div>
</template>
