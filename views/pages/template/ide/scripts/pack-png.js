var path = require("path")
var fs = require("fs")

var root = path.resolve(__dirname, "..")
var repoRoot = path.resolve(root, "..", "..", "..")
var pngEncode = require(path.join(repoRoot, "compile", "png-encode.js"))

var distDir = path.join(root, "dist")
var outDir = path.join(root, "build")

var distFiles = fs.readdirSync(distDir)
var jsFile = distFiles.find(function(f) { return /\.js$/.test(f) })
var cssFile = distFiles.find(function(f) { return /\.css$/.test(f) })

if (!jsFile) {
    console.error("No JS file in dist/")
    process.exit(1)
}

var js = fs.readFileSync(path.join(distDir, jsFile), "utf8")
var css = cssFile ? fs.readFileSync(path.join(distDir, cssFile), "utf8") : ""

var html = "<!DOCTYPE html><html><head>" +
    '<meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">' +
    (css ? "<style>" + css + "</style>" : "") +
    "</head><body>" +
    "<script>" + js + "</" + "script>" +
    "</body></html>"

fs.mkdirSync(outDir, { recursive: true })

var png = pngEncode.packView(html, "1.0.0")
var outPath = path.join(outDir, "view.png")
fs.writeFileSync(outPath, png)

console.log(JSON.stringify({ path: outPath, size: png.length }))
