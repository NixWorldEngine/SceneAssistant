<script setup lang="ts">
import { computed } from "vue"
import { store } from "@/store"
import { t } from "@/i18n"

const emit = defineEmits<{ close: [] }>()

interface StatusEntry {
  title: string
  content: string
}

function flattenStatus(obj: Record<string, unknown>, prefix?: string): StatusEntry[] {
  const entries: StatusEntry[] = []
  for (const key of Object.keys(obj)) {
    const label = prefix ? prefix + " / " + key : key
    const val = obj[key]
    if (val && typeof val === "object" && !Array.isArray(val)) {
      entries.push(...flattenStatus(val as Record<string, unknown>, label))
    } else {
      entries.push({ title: label, content: Array.isArray(val) ? val.join(" / ") : String(val ?? "") })
    }
  }
  return entries
}

const statusEntries = computed(() => {
  if (!store.lastStatus) return []
  return flattenStatus(store.lastStatus)
})
</script>

<template>
  <aside class="status-drawer">
    <div class="status-drawer-hd">
      <span class="status-drawer-title">{{ t("chat.status") }}</span>
      <button class="status-drawer-close" @click="emit('close')">
        <svg width="10" height="10" viewBox="0 0 10 10" stroke="currentColor" stroke-width="1.5" fill="none">
          <line x1="2" y1="2" x2="8" y2="8"/><line x1="8" y1="2" x2="2" y2="8"/>
        </svg>
      </button>
    </div>

    <div class="status-drawer-body">
      <template v-if="statusEntries.length">
        <div v-for="(entry, i) in statusEntries" :key="i" class="status-item">
          <div class="status-key">{{ entry.title }}</div>
          <div class="status-val">{{ entry.content }}</div>
        </div>
      </template>
      <div v-else class="status-item">
        <div class="status-val" style="color: var(--dim)">---</div>
      </div>
    </div>
  </aside>
</template>
