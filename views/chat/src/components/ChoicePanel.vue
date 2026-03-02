<script setup lang="ts">
import { ref, computed } from "vue"
import { t } from "@/i18n"

const props = defineProps<{
  choices: readonly string[]
}>()

const emit = defineEmits<{
  submit: [selected: string[]]
}>()

const selected = ref<Set<string>>(new Set())
const customText = ref("")

const hasSelection = computed(() => selected.value.size > 0 || customText.value.trim().length > 0)

function toggle(c: string) {
  const next = new Set(selected.value)
  if (next.has(c)) next.delete(c)
  else next.add(c)
  selected.value = next
}

function onSubmit() {
  const result: string[] = [...selected.value]
  const custom = customText.value.trim()
  if (custom) result.push(custom)
  if (!result.length) return
  emit("submit", result)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault()
    onSubmit()
  }
}
</script>

<template>
  <div class="choice-panel">
    <div class="choice-grid">
      <button
        v-for="(c, i) in choices"
        :key="i"
        class="choice-chip"
        :class="{ active: selected.has(c) }"
        @click="toggle(c)"
      >{{ c }}</button>
    </div>

    <div class="choice-custom-row">
      <input
        class="choice-custom-input"
        v-model="customText"
        :placeholder="t('chat.choice_custom')"
        @keydown="onKeydown"
      />
      <button
        class="choice-submit-btn"
        :disabled="!hasSelection"
        @click="onSubmit"
      >{{ t("chat.ok") }}</button>
    </div>
  </div>
</template>
