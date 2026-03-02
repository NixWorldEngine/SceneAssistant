<script setup lang="ts">
import { ref } from "vue"
import { t } from "@/i18n"

defineProps<{ title: string }>()
const emit = defineEmits<{ confirm: []; cancel: [] }>()

const closing = ref(false)

function doClose(cb: () => void) {
  closing.value = true
  setTimeout(cb, 250)
}

function onConfirm() { doClose(() => emit("confirm")) }

function onCancel() { doClose(() => emit("cancel")) }
</script>

<template>
  <div class="modal-mask" :class="{ 'fade-out': closing }" @click.self="onCancel">
    <div class="modal-box">
      <div class="modal-title">{{ title }}</div>
      <div class="modal-btns">
        <button @click="onCancel">{{ t("chat.cancel") }}</button>
        <button class="danger" @click="onConfirm">{{ t("chat.confirm") }}</button>
      </div>
    </div>
  </div>
</template>
