<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import Sidebar from "@/components/Sidebar.vue"
import ChatHeader from "@/components/ChatHeader.vue"
import MessageList from "@/components/MessageList.vue"
import InputBar from "@/components/InputBar.vue"
import ModalPrompt from "@/components/ModalPrompt.vue"
import ModalConfirm from "@/components/ModalConfirm.vue"
import ModelModal from "@/components/ModelModal.vue"
import SettingsModal from "@/components/SettingsModal.vue"
import WelcomeModal from "@/components/WelcomeModal.vue"
import RoleDetailModal from "@/components/RoleDetailModal.vue"
import StatusPanel from "@/components/StatusPanel.vue"
import { destroySaveSystem, checkWelcomed, markWelcomed } from "@/store"

const showModelModal = ref(false)
const showSettingsModal = ref(false)
const showRoleDetail = ref(false)
const showWelcome = ref(false)
const sidebarCollapsed = ref(false)
const showStatusDrawer = ref(false)

const promptModal = ref<{ title: string; defaultValue: string; callback: (val: string | null) => void } | null>(null)
const confirmModal = ref<{ title: string; callback: (ok: boolean) => void } | null>(null)

function openPrompt(title: string, defaultVal: string, cb: (val: string | null) => void) {
  promptModal.value = { title, defaultValue: defaultVal, callback: cb }
}

function onPromptConfirm(val: string) {
  promptModal.value?.callback(val)
  promptModal.value = null
}

function onPromptCancel() {
  promptModal.value?.callback(null)
  promptModal.value = null
}

function openConfirm(title: string, cb: (ok: boolean) => void) {
  confirmModal.value = { title, callback: cb }
}

function onConfirmOk() {
  confirmModal.value?.callback(true)
  confirmModal.value = null
}

function onConfirmCancel() {
  confirmModal.value?.callback(false)
  confirmModal.value = null
}

function _onCtxMenu(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (target.closest(".msg")) return
  e.preventDefault()
}

onMounted(() => {
  document.addEventListener("contextmenu", _onCtxMenu)
  checkWelcomed().then((done) => { if (!done) showWelcome.value = true })
})

onUnmounted(() => {
  document.removeEventListener("contextmenu", _onCtxMenu)
  destroySaveSystem()
})
</script>

<template>
  <Sidebar
    :class="{ collapsed: sidebarCollapsed }"
    @prompt="openPrompt"
    @confirm="openConfirm"
    @dismiss="sidebarCollapsed = true"
  />

  <div id="main">
    <ChatHeader
      :sidebar-collapsed="sidebarCollapsed"
      @open-settings="showSettingsModal = true"
      @toggle-sidebar="sidebarCollapsed = !sidebarCollapsed"
      @open-role-detail="showRoleDetail = true"
    />
    <MessageList @confirm="openConfirm" />
    <InputBar @open-model-modal="showModelModal = true" />
  </div>

  <button class="status-edge-btn" @click="showStatusDrawer = !showStatusDrawer">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/>
    </svg>
  </button>

  <StatusPanel v-if="showStatusDrawer" @close="showStatusDrawer = false" />

  <Teleport to="body">

    <ModalPrompt
      v-if="promptModal"
      :title="promptModal.title"
      :default-value="promptModal.defaultValue"
      @confirm="onPromptConfirm"
      @cancel="onPromptCancel"
    />

    <ModalConfirm
      v-if="confirmModal"
      :title="confirmModal.title"
      @confirm="onConfirmOk"
      @cancel="onConfirmCancel"
    />

    <ModelModal
      v-if="showModelModal"
      @close="showModelModal = false"
    />

    <SettingsModal
      v-if="showSettingsModal"
      @close="showSettingsModal = false"
    />

    <WelcomeModal
      v-if="showWelcome"
      @close="showWelcome = false; markWelcomed()"
    />

    <RoleDetailModal
      v-if="showRoleDetail"
      @close="showRoleDetail = false"
    />
  </Teleport>
</template>
