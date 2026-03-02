function _yIndent(line) {
  var n = line.search(/\S/)
  return n < 0 ? 0 : n
}

function _ySkip(ctx) {
  while (ctx.i < ctx.lines.length) {
    var t = ctx.lines[ctx.i].trim()
    if (t && t[0] !== "#") return true
    ctx.i++
  }
  return false
}

function _yBlock(ctx, parentIndent) {
  var save = ctx.i
  if (!_ySkip(ctx)) { ctx.i = save; return null }
  var line = ctx.lines[ctx.i]
  var indent = _yIndent(line)
  if (indent <= parentIndent) { ctx.i = save; return null }
  var trimmed = line.trim()
  if (trimmed[0] === "-") return _yList(ctx, indent)
  if (trimmed.indexOf(":") >= 0) return _yMap(ctx, indent)
  return _yBare(ctx, indent)
}

function _yMap(ctx, base) {
  var obj = {}
  while (true) {
    var save = ctx.i
    if (!_ySkip(ctx)) break
    var line = ctx.lines[ctx.i]
    var indent = _yIndent(line)
    if (indent !== base) { ctx.i = save; break }
    var m = line.trim().match(/^([\w][\w_-]*)\s*:\s*(.*)$/)
    if (!m) { ctx.i = save; break }
    ctx.i++
    obj[m[1]] = m[2].trim() ? m[2].trim() : (_yBlock(ctx, base) || "")
  }
  return obj
}

function _yList(ctx, base) {
  var arr = []
  while (true) {
    var save = ctx.i
    if (!_ySkip(ctx)) break
    var line = ctx.lines[ctx.i]
    var indent = _yIndent(line)
    if (indent < base) { ctx.i = save; break }
    var trimmed = line.trim()
    if (trimmed[0] !== "-") { ctx.i = save; break }
    var rest = trimmed.slice(1).trim()
    ctx.i++

    if (!rest) {
      arr.push(_yBlock(ctx, indent) || null)
      continue
    }

    var m = rest.match(/^([\w][\w_-]*)\s*:\s*(.*)$/)
    if (!m) {
      arr.push(rest)
      continue
    }

    var obj = {}
    obj[m[1]] = m[2].trim() ? m[2].trim() : (_yBlock(ctx, indent) || "")

    var propBase = -1
    while (true) {
      var save2 = ctx.i
      if (!_ySkip(ctx)) break
      var line2 = ctx.lines[ctx.i]
      var indent2 = _yIndent(line2)
      if (indent2 <= indent) { ctx.i = save2; break }
      if (propBase < 0) propBase = indent2
      if (indent2 !== propBase) { ctx.i = save2; break }
      var trimmed2 = line2.trim()
      if (trimmed2[0] === "-") { ctx.i = save2; break }
      var m2 = trimmed2.match(/^([\w][\w_-]*)\s*:\s*(.*)$/)
      if (!m2) { ctx.i = save2; break }
      ctx.i++
      obj[m2[1]] = m2[2].trim() ? m2[2].trim() : (_yBlock(ctx, indent2) || "")
    }

    arr.push(obj)
  }
  return arr
}

function _yBare(ctx, base) {
  var arr = []
  while (true) {
    var save = ctx.i
    if (!_ySkip(ctx)) break
    var line = ctx.lines[ctx.i]
    var indent = _yIndent(line)
    if (indent < base) { ctx.i = save; break }
    var trimmed = line.trim()
    if (trimmed[0] === "-" || trimmed.indexOf(":") >= 0) { ctx.i = save; break }
    arr.push(trimmed)
    ctx.i++
  }
  return arr
}

function parse(text) {
  var ctx = { i: 0, lines: text.split(/\r?\n/) }
  return _yMap(ctx, 0)
}

module.exports = { parse: parse }
