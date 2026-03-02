var fs = require("fs")
var path = require("path")
var execSync = require("child_process").execSync
var yamlParser = require("./yaml-parser.js")
var pngEncode = require("./png-encode.js")

var ROOT = path.resolve(__dirname, "../..")
var VIEWS_DIR = path.join(ROOT, "views", "pages")
var DIST_DIR = path.join(ROOT, "views", "dist")
var SKIP_DIRS = ["template"]

function loadConfig() {
  var cfgPath = path.join(__dirname, "config.yaml")
  if (!fs.existsSync(cfgPath)) cfgPath = path.join(__dirname, "config.example.yaml")
  if (!fs.existsSync(cfgPath)) throw new Error("no config.yaml or config.example.yaml found")
  return yamlParser.parse(fs.readFileSync(cfgPath, "utf8"))
}

function parseArgs() {
  var args = process.argv.slice(2)
  var view = null
  for (var i = 0; i < args.length; i++) {
    if (args[i] === "--view" && i + 1 < args.length) {
      view = args[i + 1]
      i++
    }
  }
  return { view: view }
}

function discoverViews(target) {
  if (target) {
    if (SKIP_DIRS.indexOf(target) >= 0) throw new Error("view is excluded: " + target)
    var vp = path.join(VIEWS_DIR, target)
    if (!fs.existsSync(vp) || !fs.statSync(vp).isDirectory()) throw new Error("view not found: " + target)
    if (!fs.existsSync(path.join(vp, "package.json"))) throw new Error("no package.json in view: " + target)
    return [target]
  }

  var entries = fs.readdirSync(VIEWS_DIR).filter(function(d) {
    if (SKIP_DIRS.indexOf(d) >= 0) return false
    var dp = path.join(VIEWS_DIR, d)
    return fs.statSync(dp).isDirectory() && fs.existsSync(path.join(dp, "package.json"))
  })

  return entries
}

function buildView(name, version) {
  var viewDir = path.join(VIEWS_DIR, name)

  console.log("\n--- Build: " + name + " ---")

  if (!fs.existsSync(path.join(viewDir, "node_modules"))) {
    console.log("  npm install ...")
    execSync("npm install", { cwd: viewDir, stdio: "inherit" })
  }

  console.log("  vite build ...")
  execSync("npx vite build", { cwd: viewDir, stdio: "inherit" })

  var distDir = path.join(viewDir, "dist")
  var jsFile = null
  var cssFile = null

  var files = fs.readdirSync(distDir)
  for (var i = 0; i < files.length; i++) {
    if (/\.js$/.test(files[i]) && !jsFile) jsFile = files[i]
    if (/\.css$/.test(files[i]) && !cssFile) cssFile = files[i]
  }

  var jsContent = jsFile ? fs.readFileSync(path.join(distDir, jsFile), "utf8") : ""
  var cssContent = cssFile ? fs.readFileSync(path.join(distDir, cssFile), "utf8") : ""

  console.log("  " + (jsFile || "(no js)") + " = " + (jsContent.length / 1024).toFixed(1) + " KB")
  console.log("  " + (cssFile || "(no css)") + " = " + (cssContent.length / 1024).toFixed(1) + " KB")

  var html = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">'
  if (cssContent) html += "<style>" + cssContent + "</style>"
  html += "</head><body>"
  if (jsContent) html += "<script>" + jsContent + "</script>"
  html += "</body></html>"

  var png = pngEncode.packView(html, version)
  var outName = "view-" + name + "-v" + version + ".png"
  var outPath = path.join(DIST_DIR, outName)

  fs.writeFileSync(outPath, png)
  console.log("  => " + outName + " (" + (png.length / 1024).toFixed(1) + " KB)")

  return { name: name, file: outName, size: png.length, htmlSize: html.length }
}

function main() {
  var cfg = loadConfig()
  var args = parseArgs()
  var version = cfg.version || "1.0.0"

  fs.mkdirSync(DIST_DIR, { recursive: true })

  var views = discoverViews(args.view)
  if (!views.length) {
    console.log("No views to build")
    return
  }

  console.log("=== View Build ===")
  console.log("Version: v" + version)
  console.log("Views:   " + views.join(", "))

  var results = []
  for (var i = 0; i < views.length; i++) {
    results.push(buildView(views[i], version))
  }

  console.log("\n=== Summary ===")
  var total = 0
  for (var i = 0; i < results.length; i++) {
    var r = results[i]
    total += r.size
    console.log("  " + r.file + "  " + (r.size / 1024).toFixed(1) + " KB  (html " + (r.htmlSize / 1024).toFixed(1) + " KB)")
  }
  console.log("  TOTAL: " + (total / 1024).toFixed(1) + " KB")
  console.log("\nOutput: " + DIST_DIR)
}

main()
