import { createViteConfig } from "../../../shared/vite-base"

export default createViteConfig({
  root: __dirname,
  name: "OCSView",
  fileName: "view.js",
  assetPrefix: "view"
})
