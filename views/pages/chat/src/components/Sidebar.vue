<script setup lang="ts">
import { computed } from "vue"
import { store, switchConv, renameConv, deleteConv, convDisplayName, startDraftConv, removeDraftConv } from "@/store"
import { ICON_EDIT, ICON_DEL } from "@/icons"
import { t } from "@/i18n"

const emit = defineEmits<{
  prompt: [title: string, defaultVal: string, callback: (val: string | null) => void]
  confirm: [title: string, callback: (ok: boolean) => void]
  dismiss: []
}>()

const msgCount = computed(() => store.msgs.length)

function onClickConv(c: typeof store.convs[0]) {
  if (store.draftConvId) removeDraftConv()
  switchConv(c)
}

function onRename(c: typeof store.convs[0], e: Event) {
  e.stopPropagation()
  const name = convDisplayName(c)
  emit("prompt", t("chat.rename_conv"), name, (val) => {
    if (val && val !== name) renameConv(c, val)
  })
}

function onDelete(c: typeof store.convs[0], e: Event) {
  e.stopPropagation()
  emit("confirm", t("chat.delete_conv"), (ok) => {
    if (ok) deleteConv(c)
  })
}

function onNewChat() {
  startDraftConv()
}
</script>

<template>
  <div id="sidebar">
    <div class="sidebar-backdrop" @click="emit('dismiss')"></div>
    <div class="sidebar-inner">
      <div id="side-hd">
        <div class="dot" :class="store.connected ? 'ok' : 'err'"></div>
        <div class="title">OpenChat</div>
        <button class="icon-btn" :title="t('chat.new_chat')" @click="onNewChat">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </div>

      <div id="conv-list">
        <div
          v-if="store.draftConvId"
          class="conv-item draft active"
        >
          <div class="conv-name">{{ t("chat.new_conv") }}</div>
        </div>

        <div
          v-for="c in store.convs"
          :key="c.id"
          class="conv-item"
          :class="{ active: c.id === store.activeConv && !store.draftConvId }"
          @click="onClickConv(c)"
        >
          <span
            v-if="c.id === store.activeConv && msgCount > 0"
            class="conv-count"
          >{{ msgCount }}</span>
          <div class="conv-name">{{ convDisplayName(c) }}</div>
          <div class="conv-acts">
            <button :title="t('chat.rename')" @click="onRename(c, $event)" v-html="ICON_EDIT"></button>
            <button class="del" :title="t('chat.delete')" @click="onDelete(c, $event)" v-html="ICON_DEL"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
