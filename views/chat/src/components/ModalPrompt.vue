<script setup lang="ts">
import { ref, onMounted } from "vue"
import { t } from "@/i18n"

const props = defineProps<{
  title: string
  defaultValue?: string
}>()

const emit = defineEmits<{
  confirm: [value: string]
  cancel: []
}>()

const value = ref(props.defaultValue || "")
const inputEl = ref<HTMLInputElement | null>(null)
const closing = ref(false)

onMounted(() => { inputEl.value?.focus() })

function doClose(cb: () => void) {
  closing.value = true
  setTimeout(cb, 250)
}

function onOk() { doClose(() => emit("confirm", value.value)) }

function onCancel() { doClose(() => emit("cancel")) }

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Enter") onOk()
  if (e.key === "Escape") onCancel()
}
</script>

<template>
  <div class="modal-mask" :class="{ 'fade-out': closing }" @click.self="onCancel">
    <div class="modal-box">
      <div class="modal-title">{{ title }}</div>
      <input class="modal-input" ref="inputEl" v-model="value" type="text" @keydown="onKeydown" />
      <div class="modal-btns">
        <button @click="onCancel">{{ t("chat.cancel") }}</button>
        <button class="primary" @click="onOk">{{ t("chat.ok") }}</button>
      </div>
    </div>
  </div>
</template>
