import { createApp } from "vue"
import App from "./App.vue"
import { initStore } from "./store"
import "./style.css"

if (!document.querySelector('meta[name="viewport"]')) {
  const meta = document.createElement("meta")
  meta.name = "viewport"
  meta.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
  document.head.appendChild(meta)
}

initStore()
createApp(App).mount(document.body)
