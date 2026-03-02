<script setup lang="ts">
import { ref } from "vue"
import { getOcsVersion, getBuildHash, getBuildTime, getCacheBridge } from "@/bridge"
import { store, setAutoSaveEnabled, setAutoSaveInterval, doCloudSave, doDownloadSave, setTheme, setAppLocale, THEME_COLORS } from "@/store"
import type { ThemeColor } from "@/store"
import type { Locale } from "@/i18n"
import { t } from "@/i18n"

const emit = defineEmits<{ close: [] }>()
const ocsVer = getOcsVersion()
const buildHash = getBuildHash()
const buildTime = getBuildTime()
const closing = ref(false)
const activeTab = ref("about")
const saving = ref(false)
const saveResult = ref("")
const saveOk = ref(false)
const downloading = ref(false)
const downloadResult = ref("")
const downloadOk = ref(false)
const refreshing = ref(false)

async function doForceRefresh() {
  const cache = getCacheBridge()
  if (!cache || refreshing.value) return
  refreshing.value = true
  try {
    await cache.clear(["force_refresh"], true)
  } catch (_) {
    refreshing.value = false
  }
}

function onClose() {
  closing.value = true
  setTimeout(() => emit("close"), 250)
}

async function doManualSave() {
  saving.value = true
  saveResult.value = ""
  try {
    const ok = await doCloudSave()
    saveOk.value = ok
    saveResult.value = ok ? t("chat.save_success") : t("chat.save_failed")
  } catch (_) {
    saveOk.value = false
    saveResult.value = t("chat.save_failed")
  } finally {
    saving.value = false
    setTimeout(() => { saveResult.value = "" }, 3000)
  }
}

async function doManualDownload() {
  downloading.value = true
  downloadResult.value = ""
  try {
    const ok = await doDownloadSave()
    downloadOk.value = ok
    downloadResult.value = ok ? t("chat.download_success") : t("chat.download_failed")
  } catch (_) {
    downloadOk.value = false
    downloadResult.value = t("chat.download_failed")
  } finally {
    downloading.value = false
    setTimeout(() => { downloadResult.value = "" }, 3000)
  }
}

function onIntervalChange(e: Event) {
  const v = parseInt((e.target as HTMLInputElement).value, 10)
  if (!isNaN(v)) setAutoSaveInterval(v)
}

const THEME_CSS: Record<ThemeColor, string> = {
  red: "#dc2626",
  orange: "#d97706",
  green: "#166d3b",
  blue: "#3b82f6",
  purple: "#9333ea",
  pink: "#db2777"
}

const LOCALES: { id: Locale; labelKey: string }[] = [
  { id: "en", labelKey: "chat.lang_en" },
  { id: "zh-CN", labelKey: "chat.lang_zh_CN" },
  { id: "zh-TW", labelKey: "chat.lang_zh_TW" },
  { id: "de", labelKey: "chat.lang_de" }
]
</script>

<template>
  <div class="modal-mask" :class="{ 'fade-out': closing }" @click.self="onClose">
    <div class="stg-container">
      <div class="stg-header">
        <div class="stg-title">{{ t("chat.settings") }}</div>
        <button class="icon-btn close-btn" @click="onClose">
          <svg width="12" height="12" viewBox="0 0 10 10" stroke="currentColor" stroke-width="1.5" fill="none">
            <line x1="2" y1="2" x2="8" y2="8"/><line x1="8" y1="2" x2="2" y2="8"/>
          </svg>
        </button>
      </div>

      <div class="stg-body">
        <div class="stg-panel">
          <div class="stg-tab" :class="{ active: activeTab === 'about' }" @click="activeTab = 'about'">{{ t("chat.settings_about") }}</div>
          <div class="stg-tab" :class="{ active: activeTab === 'appearance' }" @click="activeTab = 'appearance'">{{ t("chat.appearance") }}</div>
          <div class="stg-tab" :class="{ active: activeTab === 'system' }" @click="activeTab = 'system'">{{ t("chat.system") }}</div>
          <div class="stg-tab" :class="{ active: activeTab === 'cache' }" @click="activeTab = 'cache'">{{ t("chat.cache") }}</div>
        </div>

        <div class="stg-content">
          <template v-if="activeTab === 'about'">
            <div class="stg-about">
              <svg class="about-logo" width="96" height="96" viewBox="0 0 200 200" fill="none">
                <circle class="logo-ring" cx="100" cy="100" r="92" fill="none" stroke="currentColor" stroke-width="6"/>
                <line class="logo-trunk" x1="100" y1="165" x2="100" y2="72" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
                <line class="logo-branch-l" x1="100" y1="140" x2="56" y2="96" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
                <line class="logo-branch-r" x1="100" y1="140" x2="144" y2="96" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
                <circle class="logo-fruit-c" cx="100" cy="55" r="31" fill="currentColor"/>
                <circle class="logo-fruit-l" cx="48" cy="85" r="27" fill="currentColor"/>
                <circle class="logo-fruit-r" cx="152" cy="85" r="27" fill="currentColor"/>
              </svg>
              <div class="about-name">OpenChatSDK</div>
              <div class="about-meta" v-if="ocsVer">Chat {{ ocsVer }}</div>
              <div class="about-meta" v-if="buildHash">Code {{ buildHash.slice(0, 12) }}</div>
              <div class="about-meta" v-if="buildTime">{{ buildTime }}</div>
            </div>
          </template>

          <template v-if="activeTab === 'appearance'">
            <div class="stg-system">
              <div class="sys-section">
                <div class="sys-label">{{ t("chat.theme") }}</div>
                <div class="sys-desc">{{ t("chat.theme_desc") }}</div>
                <div class="theme-grid">
                  <button
                    v-for="c in THEME_COLORS"
                    :key="c"
                    class="theme-dot"
                    :class="{ active: store.theme === c }"
                    :style="{ '--dot-color': THEME_CSS[c] }"
                    @click="setTheme(c)"
                  >
                    <span class="theme-dot-inner"></span>
                    <span class="theme-dot-label">{{ t('chat.theme_' + c) }}</span>
                  </button>
                </div>
              </div>

              <div class="sys-section">
                <div class="sys-label">{{ t("chat.language") }}</div>
                <div class="sys-desc">{{ t("chat.language_desc") }}</div>
                <div class="lang-list">
                  <button
                    v-for="l in LOCALES"
                    :key="l.id"
                    class="lang-chip"
                    :class="{ active: store.locale === l.id }"
                    @click="setAppLocale(l.id)"
                  >{{ t(l.labelKey) }}</button>
                </div>
              </div>
            </div>
          </template>

          <template v-if="activeTab === 'system'">
            <div class="stg-system">
              <div class="sys-section">
                <div class="sys-label">{{ t("chat.auto_save") }}</div>
                <div class="sys-desc">{{ t("chat.auto_save_desc") }}</div>

                <div class="sys-row">
                  <span class="sys-field">{{ t("chat.auto_save") }}</span>
                  <button
                    class="sys-toggle"
                    :class="{ on: store.autoSaveEnabled }"
                    @click="setAutoSaveEnabled(!store.autoSaveEnabled)"
                  >
                    <span class="sys-toggle-dot"></span>
                  </button>
                </div>

                <div class="sys-row" v-if="store.autoSaveEnabled">
                  <span class="sys-field">{{ t("chat.save_interval") }}</span>
                  <input
                    class="sys-input"
                    type="number"
                    min="10"
                    max="3600"
                    :value="store.autoSaveInterval"
                    @change="onIntervalChange"
                  />
                </div>

                <div class="sys-row">
                  <button class="sys-btn" :disabled="saving" @click="doManualSave">
                    {{ saving ? "..." : t("chat.manual_save") }}
                  </button>
                  <span v-if="saveResult" class="sys-result" :class="{ error: !saveOk }">{{ saveResult }}</span>
                </div>

                <div class="sys-row">
                  <button class="sys-btn" :disabled="downloading" @click="doManualDownload">
                    {{ downloading ? "..." : t("chat.download_save") }}
                  </button>
                  <span v-if="downloadResult" class="sys-result" :class="{ error: !downloadOk }">{{ downloadResult }}</span>
                </div>
              </div>
            </div>
          </template>

          <template v-if="activeTab === 'cache'">
            <div class="stg-system">
              <div class="sys-section">
                <div class="sys-label">{{ t("chat.cache") }}</div>
                <div class="sys-desc">{{ t("chat.force_refresh_desc") }}</div>
                <button class="sys-btn danger-btn" :disabled="refreshing" @click="doForceRefresh">
                  {{ refreshing ? "..." : t("chat.force_refresh") }}
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stg-system {
  padding: 16px;
}

.sys-section {
  margin-bottom: 16px;
}

.sys-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary, #e0e0e0);
  margin-bottom: 4px;
}

.sys-desc {
  font-size: 12px;
  color: var(--text-secondary, #888);
  margin-bottom: 12px;
}

.sys-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.sys-field {
  font-size: 13px;
  color: var(--text-secondary, #aaa);
  min-width: 80px;
}

.sys-toggle {
  position: relative;
  width: 36px;
  height: 20px;
  border-radius: 10px;
  border: none;
  background: rgba(255,255,255,0.1);
  cursor: pointer;
  transition: background 0.2s;
  padding: 0;
}

.sys-toggle.on {
  background: var(--toggle-on);
}

.sys-toggle-dot {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.2s;
}

.sys-toggle.on .sys-toggle-dot {
  transform: translateX(16px);
}

.sys-input {
  width: 80px;
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.05);
  color: var(--text-primary, #e0e0e0);
  font-size: 13px;
  font-family: inherit;
}

.sys-btn {
  padding: 6px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.06);
  color: var(--text-primary, #e0e0e0);
  font-size: 13px;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;
}

.sys-btn:hover {
  background: rgba(255,255,255,0.1);
}

.sys-btn:disabled {
  opacity: 0.5;
  cursor: default;
}

.sys-result {
  font-size: 12px;
  color: var(--success);
}

.sys-result.error {
  color: rgba(220,38,38,0.8);
}

.danger-btn {
  background: rgba(220,38,38,0.1);
  border-color: rgba(220,38,38,0.2);
  color: rgba(220,38,38,0.9);
}

.danger-btn:hover {
  background: rgba(220,38,38,0.2);
}

.theme-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.theme-dot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  transition: background 0.15s;
}

.theme-dot:hover {
  background: rgba(255,255,255,0.05);
}

.theme-dot-inner {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--dot-color);
  border: 2px solid transparent;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.theme-dot.active .theme-dot-inner {
  border-color: var(--bright, #e0e0e0);
  box-shadow: 0 0 8px var(--dot-color);
}

.theme-dot-label {
  font-size: 10px;
  color: var(--dim, #666);
}

.theme-dot.active .theme-dot-label {
  color: var(--bright, #e0e0e0);
}

.lang-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.lang-chip {
  padding: 5px 14px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04);
  color: var(--dim, #666);
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;
}

.lang-chip:hover {
  background: rgba(255,255,255,0.08);
  color: var(--text, #b7b7b7);
}

.lang-chip.active {
  border-color: var(--accent-04, rgba(22,109,59,0.4));
  background: var(--accent-02, rgba(22,109,59,0.2));
  color: var(--bright, #e0e0e0);
}

.about-logo {
  color: var(--accent);
  filter: drop-shadow(0 0 20px var(--accent-03));
}

.about-logo .logo-ring {
  stroke-dasharray: 580;
  stroke-dashoffset: 580;
  animation: aboutDrawRing 0.8s ease-out 0.2s forwards;
}

.about-logo .logo-trunk {
  stroke-dasharray: 93;
  stroke-dashoffset: 93;
  animation: aboutDrawLine 0.4s ease-out 0.6s forwards;
}

.about-logo .logo-branch-l {
  stroke-dasharray: 63;
  stroke-dashoffset: 63;
  animation: aboutDrawLine 0.3s ease-out 0.9s forwards;
}

.about-logo .logo-branch-r {
  stroke-dasharray: 63;
  stroke-dashoffset: 63;
  animation: aboutDrawLine 0.3s ease-out 0.95s forwards;
}

.about-logo .logo-fruit-c {
  transform: scale(0);
  transform-origin: 100px 55px;
  animation: aboutPopFruit 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) 1.1s forwards;
}

.about-logo .logo-fruit-l {
  transform: scale(0);
  transform-origin: 48px 85px;
  animation: aboutPopFruit 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) 1.25s forwards;
}

.about-logo .logo-fruit-r {
  transform: scale(0);
  transform-origin: 152px 85px;
  animation: aboutPopFruit 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) 1.4s forwards;
}

@keyframes aboutDrawRing {
  to { stroke-dashoffset: 0 }
}

@keyframes aboutDrawLine {
  to { stroke-dashoffset: 0 }
}

@keyframes aboutPopFruit {
  0% { transform: scale(0) }
  100% { transform: scale(1) }
}
</style>
