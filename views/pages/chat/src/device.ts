import { ref } from "vue"

const _mq = window.matchMedia("(max-width: 768px)")
export const isMobile = ref(_mq.matches)
_mq.addEventListener("change", (e) => { isMobile.value = e.matches })
