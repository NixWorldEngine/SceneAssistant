<script setup lang="ts">
import { ref, computed } from "vue"
import { store } from "@/store"
import { getCdnPrefix } from "@/bridge"
import { t } from "@/i18n"

const emit = defineEmits<{ close: [] }>()
const closing = ref(false)
const imgFailed = ref(false)

const role = computed(() => store.role)

const posterUrl = computed(() => {
  if (!role.value?.imageUrl) return ""
  const raw = role.value.imageUrl
  if (raw.startsWith("http")) return raw
  return getCdnPrefix() + raw
})

const showPoster = computed(() => posterUrl.value && !imgFailed.value)

function fmtK(n: number | undefined): string {
  if (!n) return "0"
  return Math.floor(n / 1000) + "K"
}

function fmtUsage(n: number | undefined): string {
  if (!n) return "0"
  return Math.floor(n / 10) + "K"
}

const stats = computed(() => [
  { label: t("chat.detail_usage"), value: fmtUsage(role.value?.usageNum) },
  { label: t("chat.detail_points"), value: fmtK(role.value?.pointsConsumed) },
  { label: t("chat.detail_players"), value: String(role.value?.playerNum || 0) },
  { label: t("chat.detail_scores"), value: String(role.value?.scoreNum || 0) },
  { label: t("chat.detail_words"), value: fmtK(role.value?.personalityWordCount) }
])

function onImgError() {
  imgFailed.value = true
}

function onClose() {
  closing.value = true
  setTimeout(() => emit("close"), 250)
}
</script>

<template>
  <div class="modal-mask rd-mask" :class="{ 'fade-out': closing }" @click.self="onClose">
    <div class="rd-container">
      <div v-if="showPoster" class="rd-poster">
        <img :src="posterUrl" alt="" @error="onImgError" />
      </div>

      <div class="rd-body">
        <button class="rd-close" @click="onClose">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div class="rd-title">{{ role?.name || "" }}</div>

        <div class="rd-stats">
          <div v-for="s in stats" :key="s.label" class="rd-stat">
            <div class="rd-stat-val">{{ s.value }}</div>
            <div class="rd-stat-lbl">{{ s.label }}</div>
          </div>
        </div>

        <div class="rd-desc-wrap">
          <div class="rd-desc">{{ role?.roleDesc || "" }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
