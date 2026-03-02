<script setup lang="ts">
import { ref, computed } from "vue"
import { store, selectModel, setUseStream, setMaxToken, fetchModels } from "@/store"
import { ICON_BOLT } from "@/icons"
import type { Model, ModelType } from "@/types"
import { t } from "@/i18n"

const emit = defineEmits<{ close: [] }>()

const closing = ref(false)

function onClose() {
  closing.value = true
  setTimeout(() => emit("close"), 250)
}

const loaded = ref(store.models.length > 0)

if (!loaded.value) {
  fetchModels().then(() => { loaded.value = true })
}

const PROVIDERS: { key: ModelType; label: string }[] = [
  { key: "Grok", label: "Grok" },
  { key: "Gemini", label: "Gemini" },
  { key: "Claude", label: "Claude" },
  { key: "DeepSeek", label: "DeepSeek" },
  { key: "ChatGPT", label: "ChatGPT" },
]

const activeProvider = ref("all")

const groupedModels = computed(() => {
  const groups: Record<string, Model[]> = {}
  for (const p of PROVIDERS) groups[p.key] = []
  groups.Other = []

  for (const m of store.models) {
    const key = m.type || "Other"
    if (groups[key]) groups[key].push(m)
    else groups.Other.push(m)
  }
  return groups
})

const providerTabs = computed(() => {
  const tabs: { key: string; label: string; count: number }[] = []
  for (const p of PROVIDERS) {
    const count = groupedModels.value[p.key]?.length || 0
    if (count > 0) tabs.push({ key: p.key, label: p.label, count })
  }
  const otherCount = groupedModels.value.Other?.length || 0
  if (otherCount > 0) tabs.push({ key: "Other", label: t("chat.provider_other"), count: otherCount })
  return tabs
})

type SortMode = "default" | "cost_asc" | "cost_desc"

const SORT_OPTIONS: { key: SortMode; label: string }[] = [
  { key: "default", label: "chat.sort_default" },
  { key: "cost_asc", label: "chat.sort_cost_asc" },
  { key: "cost_desc", label: "chat.sort_cost_desc" },
]

const sortMode = ref<SortMode>("default")
const streamOnly = ref(false)
const minToken = ref(0)

const tokenOptions = computed(() => {
  const set = new Set<number>()
  for (const m of store.models) {
    if (m.maxToken && m.maxToken > 0) set.add(m.maxToken)
    if (m.maxTokenList) {
      for (const o of m.maxTokenList) set.add(o.maxToken)
    }
  }
  return Array.from(set).sort((a, b) => a - b)
})

function sortModels(list: Model[]): Model[] {
  if (sortMode.value === "default") return list
  const sorted = [...list]
  const dir = sortMode.value === "cost_asc" ? 1 : -1
  sorted.sort((a, b) => ((a.deductNum || 0) - (b.deductNum || 0)) * dir)
  return sorted
}

const filteredModels = computed(() => {
  let base = activeProvider.value === "all"
    ? [...store.models]
    : [...(groupedModels.value[activeProvider.value] || [])]

  if (streamOnly.value) {
    base = base.filter(m => m.enableStream === 1)
  }

  if (minToken.value > 0) {
    base = base.filter(m => {
      if (m.maxToken && m.maxToken >= minToken.value) return true
      if (m.maxTokenList) {
        return m.maxTokenList.some(o => o.maxToken >= minToken.value)
      }
      return false
    })
  }

  return sortModels(base)
})

const activeId = computed(() => store.activeModel?.id)

function onSelect(m: Model) {
  selectModel(m)
  onClose()
}

function onStreamToggle(m: Model) {
  if (m.id !== activeId.value) selectModel(m)
  setUseStream(!store.useStream)
}

function onTokenSelect(m: Model, v: number) {
  if (m.id !== activeId.value) selectModel(m)
  setMaxToken(v)
}
</script>

<template>
  <div class="modal-mask mm-fullscreen" :class="{ 'fade-out': closing }" @click.self="onClose">
    <div class="mm-container mm-split">
      <div class="mm-header">
        <div class="mm-header-title">{{ t("chat.select_model") }}</div>
        <button class="icon-btn close-btn" @click="onClose">
          <svg width="12" height="12" viewBox="0 0 10 10" stroke="currentColor" stroke-width="1.5" fill="none">
            <line x1="2" y1="2" x2="8" y2="8"/><line x1="8" y1="2" x2="2" y2="8"/>
          </svg>
        </button>
      </div>

      <div class="mm-body">
        <div class="mm-filter-panel">
          <div class="mm-fp-section">
            <div class="mm-fp-label">{{ t("chat.filter_sort") }}</div>
            <div class="mm-fp-opts">
              <button
                v-for="opt in SORT_OPTIONS"
                :key="opt.key"
                class="filter-chip"
                :class="{ active: sortMode === opt.key }"
                @click="sortMode = opt.key"
              >{{ t(opt.label) }}</button>
            </div>
          </div>

          <div class="mm-fp-section">
            <div class="mm-fp-row">
              <span class="mm-fp-label">{{ t("chat.filter_stream_only") }}</span>
              <span
                class="mm-switch"
                :class="{ on: streamOnly }"
                @click="streamOnly = !streamOnly"
              ></span>
            </div>
          </div>

          <div class="mm-fp-section">
            <div class="mm-fp-label">{{ t("chat.filter_min_token") }}</div>
            <div class="mm-fp-opts">
              <button
                class="filter-chip"
                :class="{ active: minToken === 0 }"
                @click="minToken = 0"
              >{{ t("chat.filter_no_limit") }}</button>
              <button
                v-for="tk in tokenOptions"
                :key="tk"
                class="filter-chip"
                :class="{ active: minToken === tk }"
                @click="minToken = tk"
              >{{ tk }}</button>
            </div>
          </div>

          <div class="mm-fp-section">
            <div class="mm-fp-label">{{ t("chat.provider_filter") }}</div>
            <div class="mm-fp-opts">
              <button
                class="filter-chip"
                :class="{ active: activeProvider === 'all' }"
                @click="activeProvider = 'all'"
              >{{ t("common.all") || "All" }} ({{ store.models.length }})</button>
              <button
                v-for="tab in providerTabs"
                :key="tab.key"
                class="filter-chip"
                :class="{ active: activeProvider === tab.key }"
                @click="activeProvider = tab.key"
              >{{ tab.label }} ({{ tab.count }})</button>
            </div>
          </div>
        </div>

        <div class="mm-model-panel">
          <div class="mm-cards">
            <div
              v-for="m in filteredModels"
              :key="m.id"
              class="mm-card"
              :class="{ active: m.id === activeId }"
              @click="onSelect(m)"
            >
              <div class="mm-card-head">
                <span
                  v-if="m.deductNum"
                  class="mm-capsule purple"
                >{{ m.deductNum }} <span v-html="ICON_BOLT"></span></span>
                <div class="mm-card-name">{{ m.name }}</div>
                <span v-if="m.tag" class="mm-capsule red">{{ m.tag }}</span>
              </div>

              <div v-if="m.description" class="mm-card-desc">{{ m.description }}</div>

              <div class="mm-card-footer" @click.stop>
                <div v-if="m.enableStream === 1" class="mm-stream">
                  <span
                    class="mm-switch"
                    :class="{ on: m.id === activeId ? store.useStream : true }"
                    @click="onStreamToggle(m)"
                  ></span>
                  <span class="mm-stream-label">{{ t("chat.stream") }}</span>
                </div>

                <div v-if="m.maxTokenList && m.maxTokenList.length > 0" class="mm-tokens">
                  <button
                    v-for="opt in m.maxTokenList"
                    :key="opt.maxToken"
                    class="token-capsule"
                    :class="{ active: m.id === activeId && opt.maxToken === store.maxToken }"
                    @click="onTokenSelect(m, opt.maxToken)"
                  >
                    <span v-if="opt.deductNum">{{ opt.maxToken }}t ({{ opt.deductNum }}<span v-html="ICON_BOLT"></span>)</span>
                    <span v-else>{{ opt.maxToken }}t</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
