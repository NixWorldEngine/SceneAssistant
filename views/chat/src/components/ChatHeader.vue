<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from "vue"
import { store, convDisplayName, renameConv } from "@/store"
import { getBridge } from "@/bridge"
import { ICON_SETTINGS, ICON_CLOSE } from "@/icons"
import { t } from "@/i18n"

defineProps<{ sidebarCollapsed: boolean }>()

const emit = defineEmits<{
  openSettings: []
  toggleSidebar: []
  openRoleDetail: []
}>()

const roleName = computed(() => store.role?.name || "")

const activeConvObj = computed(() => {
  if (!store.activeConv) return null
  return store.convs.find(v => v.id === store.activeConv) || null
})

const title = computed(() => {
  if (!activeConvObj.value) {
    if (store.draftConvId) return t("chat.new_conv")
    return t("chat.no_conv")
  }
  return convDisplayName(activeConvObj.value)
})

const renaming = ref(false)
const renameText = ref("")
const renameInput = ref<HTMLInputElement | null>(null)

function onDblClick() {
  if (!activeConvObj.value) return
  renameText.value = title.value
  renaming.value = true
  nextTick(() => renameInput.value?.select())
}

function commitRename() {
  const val = renameText.value.trim()
  renaming.value = false
  if (!val || !activeConvObj.value || val === convDisplayName(activeConvObj.value)) return
  renameConv(activeConvObj.value, val)
}

function cancelRename() {
  renameText.value = ""
  renaming.value = false
}

function openPanel() {
  const B = getBridge()
  if (B?.setting?.open) B.setting.open()
}

let _closeThrottle = 0

function onClose() {
  const now = Date.now()
  if (now - _closeThrottle < 600) return
  _closeThrottle = now
  getBridge()?.close()
}

const KAG_LABELS: Record<string, string> = {
  merged: "chat.kag_merged",
  recalled: "chat.kag_recalled",
  initialized: "chat.kag_initialized"
}

const kagToast = ref("")
let kagTimer = 0

function onKagStatus(e: MessageEvent) {
  if (!e.data || e.data.type !== "kag-st") return
  const key = KAG_LABELS[e.data.status]
  if (!key) return
  clearTimeout(kagTimer)
  kagToast.value = t(key)
  kagTimer = window.setTimeout(() => { kagToast.value = "" }, 3000)
}

onMounted(() => {
  window.addEventListener("message", onKagStatus)
})

onUnmounted(() => {
  window.removeEventListener("message", onKagStatus)
  clearTimeout(kagTimer)
})
</script>

<template>
  <div id="chat-hd">
    <button class="icon-btn sidebar-toggle" @click="emit('toggleSidebar')">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <line x1="9" y1="3" x2="9" y2="21"/>
      </svg>
    </button>
    <div class="hd-titles">
      <div v-if="roleName" class="hd-role-name">{{ roleName }}</div>
      <input
        v-if="renaming"
        ref="renameInput"
        v-model="renameText"
        class="conv-title-input"
        @keydown.enter="commitRename"
        @keydown.escape="cancelRename"
        @blur="commitRename"
      />
      <div v-else class="conv-title" @dblclick="onDblClick">{{ title }}</div>
    </div>
    <button class="icon-btn panel-btn" :title="t('chat.open_panel')" @click="openPanel">
      <svg width="16" height="16" viewBox="0 0 200 200" fill="none"><circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" stroke-width="6"/><g fill="currentColor" stroke="currentColor" stroke-linecap="round"><line x1="100" y1="165" x2="100" y2="72" stroke-width="10"/><line x1="100" y1="140" x2="56" y2="96" stroke-width="10"/><line x1="100" y1="140" x2="144" y2="96" stroke-width="10"/><circle cx="100" cy="55" r="31" stroke="none"/><circle cx="48" cy="85" r="27" stroke="none"/><circle cx="152" cy="85" r="27" stroke="none"/></g></svg>
    </button>
    <button v-if="store.role" class="icon-btn" :title="t('chat.role_detail')" @click="emit('openRoleDetail')">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    </button>
    <button class="icon-btn" :title="t('chat.settings')" @click="emit('openSettings')" v-html="ICON_SETTINGS"></button>
    <button class="icon-btn close-btn" :title="t('chat.close')" @click="onClose" v-html="ICON_CLOSE"></button>
    <Transition name="kag-toast">
      <div v-if="kagToast" class="kag-toast">{{ kagToast }}</div>
    </Transition>
  </div>
</template>
