import { createViteConfig } from "../../shared/vite-base"

export default createViteConfig({
  root: __dirname,
  name: "OCSChat",
  fileName: "chat.js",
  assetPrefix: "chat"
})
