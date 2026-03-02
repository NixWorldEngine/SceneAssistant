<script setup lang="ts">
import { ref } from "vue"
import { t } from "@/i18n"

const emit = defineEmits<{ close: [] }>()
const closing = ref(false)
const animDone = ref(false)

function onClose() {
  closing.value = true
  setTimeout(() => emit("close"), 400)
}

function onAnimEnd() {
  animDone.value = true
}
</script>

<template>
  <div class="welcome-mask" :class="{ 'fade-out': closing }" @click.self="onClose">
    <div class="welcome-box">
      <svg
        class="welcome-logo"
        width="120"
        height="120"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle
          class="logo-ring"
          cx="100" cy="100" r="92"
          stroke="currentColor"
          stroke-width="6"
          fill="none"
        />

        <line
          class="logo-trunk"
          x1="100" y1="165" x2="100" y2="72"
          stroke="currentColor"
          stroke-width="10"
          stroke-linecap="round"
        />

        <line
          class="logo-branch-l"
          x1="100" y1="140" x2="56" y2="96"
          stroke="currentColor"
          stroke-width="10"
          stroke-linecap="round"
        />

        <line
          class="logo-branch-r"
          x1="100" y1="140" x2="144" y2="96"
          stroke="currentColor"
          stroke-width="10"
          stroke-linecap="round"
        />

        <circle class="logo-fruit-c" cx="100" cy="55" r="31" fill="currentColor"/>
        <circle class="logo-fruit-l" cx="48" cy="85" r="27" fill="currentColor"/>
        <circle
          class="logo-fruit-r"
          cx="152" cy="85" r="27"
          fill="currentColor"
          @animationend="onAnimEnd"
        />
      </svg>

      <div class="welcome-title" :class="{ show: animDone }">
        {{ t("chat.welcome_title") }}
      </div>

      <div class="welcome-desc" :class="{ show: animDone }">
        {{ t("chat.welcome_desc") }}
      </div>

      <button class="welcome-btn" :class="{ show: animDone }" @click="onClose">
        {{ t("chat.welcome_start") }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.welcome-mask {
  position: fixed;
  inset: 0;
  z-index: 30000;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: welcomeFadeIn 0.3s ease-out;
  transition: opacity 0.35s ease;
}

.welcome-mask.fade-out {
  opacity: 0;
}

.welcome-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 40px 36px;
  border-radius: 20px;
  background: rgba(20, 20, 20, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px) saturate(1.2);
  max-width: 380px;
  width: 88%;
  transition: opacity 0.3s, transform 0.3s;
}

.welcome-mask.fade-out .welcome-box {
  opacity: 0;
  transform: translateY(12px) scale(0.97);
}

.welcome-logo {
  color: var(--accent);
  margin-bottom: 28px;
  filter: drop-shadow(0 0 20px var(--accent-03));
}

.logo-ring {
  stroke-dasharray: 580;
  stroke-dashoffset: 580;
  animation: drawRing 0.8s ease-out 0.2s forwards;
}

.logo-trunk {
  stroke-dasharray: 93;
  stroke-dashoffset: 93;
  animation: drawLine 0.4s ease-out 0.6s forwards;
}

.logo-branch-l {
  stroke-dasharray: 63;
  stroke-dashoffset: 63;
  animation: drawLine 0.3s ease-out 0.9s forwards;
}

.logo-branch-r {
  stroke-dasharray: 63;
  stroke-dashoffset: 63;
  animation: drawLine 0.3s ease-out 0.95s forwards;
}

.logo-fruit-c {
  transform: scale(0);
  transform-origin: 100px 55px;
  animation: popFruit 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) 1.1s forwards;
}

.logo-fruit-l {
  transform: scale(0);
  transform-origin: 48px 85px;
  animation: popFruit 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) 1.25s forwards;
}

.logo-fruit-r {
  transform: scale(0);
  transform-origin: 152px 85px;
  animation: popFruit 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) 1.4s forwards;
}

.welcome-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--bright);
  letter-spacing: 1px;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  margin-bottom: 14px;
  text-align: center;
}

.welcome-desc {
  font-size: 13px;
  color: var(--dim);
  line-height: 1.8;
  text-align: center;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s;
  margin-bottom: 28px;
  max-width: 300px;
}

.welcome-btn {
  padding: 10px 32px;
  border-radius: 10px;
  border: 1px solid var(--accent-04);
  background: var(--accent-012);
  color: var(--accent-text);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s, background 0.15s, color 0.15s;
  min-height: 44px;
  touch-action: manipulation;
}

.welcome-btn:hover {
  background: var(--accent-025);
  color: var(--accent-text-hover);
}

.welcome-title.show,
.welcome-desc.show,
.welcome-btn.show {
  opacity: 1;
  transform: translateY(0);
}

@keyframes welcomeFadeIn {
  from { opacity: 0 }
  to { opacity: 1 }
}

@keyframes drawRing {
  to { stroke-dashoffset: 0 }
}

@keyframes drawLine {
  to { stroke-dashoffset: 0 }
}

@keyframes popFruit {
  0% { transform: scale(0) }
  100% { transform: scale(1) }
}
</style>
