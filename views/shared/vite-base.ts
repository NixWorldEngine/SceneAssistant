import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"
import { ChildProcess, fork } from "child_process"

interface ViteLibOpts {
  root: string
  name: string
  fileName: string
  assetPrefix: string
}

let mockProc: ChildProcess | null = null

function mockServerPlugin(pagesRoot: string) {
  const mockDir = resolve(pagesRoot, "../../mock")
  const mockScript = resolve(mockDir, "mock-server.js")

  return {
    name: "ocs-mock-server",
    configureServer() {
      try {
        mockProc = fork(mockScript, [], { cwd: mockDir, stdio: "pipe" })
        mockProc.stdout?.on("data", (d: Buffer) => process.stdout.write("[mock] " + d))
        mockProc.stderr?.on("data", (d: Buffer) => process.stderr.write("[mock] " + d))
        mockProc.on("exit", () => { mockProc = null })
      } catch {}
    },
    buildEnd() {
      if (mockProc) { mockProc.kill(); mockProc = null }
    }
  }
}

export function createViteConfig(opts: ViteLibOpts) {
  const isDev = process.env.NODE_ENV !== "production" && !process.argv.includes("build")

  return defineConfig({
    plugins: [
      vue(),
      ...(isDev ? [mockServerPlugin(opts.root)] : [])
    ],
    resolve: {
      alias: { "@": resolve(opts.root, "src") }
    },
    define: {
      "process.env.NODE_ENV": isDev ? '"development"' : '"production"'
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3939",
          changeOrigin: true
        }
      }
    },
    build: {
      lib: {
        entry: resolve(opts.root, "src/main.ts"),
        name: opts.name,
        formats: ["iife"],
        fileName: () => opts.fileName
      },
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          assetFileNames: opts.assetPrefix + "[extname]",
          inlineDynamicImports: true
        }
      },
      outDir: "dist",
      emptyOutDir: true,
      minify: "esbuild"
    },
    esbuild: {
      drop: isDev ? [] : ["console"]
    }
  })
}
