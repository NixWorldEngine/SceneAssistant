var zlib = require("zlib")

var PNG_SIG = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
var FILL = Buffer.from([0x16, 0x6d, 0x3b])
var AC_MAGIC_V5 = Buffer.from([0x41, 0x43, 0x05, 0x00])

var _crc32Table = new Uint32Array(256)
;(function() {
  for (var n = 0; n < 256; n++) {
    var c = n
    for (var k = 0; k < 8; k++) c = (c & 1) ? ((c >>> 1) ^ 0xEDB88320) : (c >>> 1)
    _crc32Table[n] = c >>> 0
  }
})()

function crc32(data) {
  var c = 0xFFFFFFFF
  for (var i = 0; i < data.length; i++) c = _crc32Table[(c ^ data[i]) & 0xFF] ^ (c >>> 8)
  return (c ^ 0xFFFFFFFF) >>> 0
}

function putChunk(out, tag, body) {
  var len = Buffer.alloc(4)
  len.writeUInt32BE(body.length, 0)
  out.push(len)
  out.push(Buffer.from(tag))
  out.push(body)

  var tmp = Buffer.concat([Buffer.from(tag), body])
  var crcBuf = Buffer.alloc(4)
  crcBuf.writeUInt32BE(crc32(tmp), 0)
  out.push(crcBuf)
}

function encodePayload(payload) {
  var payloadLen = payload.length
  var pxNeed = Math.ceil(payloadLen / 3)
  var side = Math.max(1, Math.ceil(Math.sqrt(pxNeed)))

  var rowSz = 1 + side * 3
  var scanlines = Buffer.alloc(rowSz * side)
  var bi = 0

  for (var y = 0; y < side; y++) {
    var rowOff = y * rowSz
    scanlines[rowOff] = 0

    for (var x = 0; x < side; x++) {
      var pxOff = rowOff + 1 + x * 3
      if (bi < payloadLen) {
        scanlines[pxOff] = payload[bi++]
        scanlines[pxOff + 1] = bi < payloadLen ? payload[bi++] : 0
        scanlines[pxOff + 2] = bi < payloadLen ? payload[bi++] : 0
      } else {
        scanlines[pxOff] = FILL[0]
        scanlines[pxOff + 1] = FILL[1]
        scanlines[pxOff + 2] = FILL[2]
      }
    }
  }

  var idat = zlib.deflateSync(scanlines, { level: 6 })

  var ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(side, 0)
  ihdr.writeUInt32BE(side, 4)
  ihdr[8] = 8
  ihdr[9] = 2

  var parts = [PNG_SIG]
  putChunk(parts, "IHDR", ihdr)
  putChunk(parts, "IDAT", idat)
  putChunk(parts, "IEND", Buffer.alloc(0))

  return Buffer.concat(parts)
}

function buildEnvelope(meta, body) {
  var metaJson = Buffer.from(JSON.stringify(meta))
  var crcData = Buffer.concat([metaJson, body])
  var crc = crc32(crcData)

  var envelope = Buffer.alloc(4 + 2 + metaJson.length + 4 + body.length + 4)
  var off = 0
  AC_MAGIC_V5.copy(envelope, off); off += 4
  envelope.writeUInt16LE(metaJson.length, off); off += 2
  metaJson.copy(envelope, off); off += metaJson.length
  envelope.writeUInt32LE(body.length, off); off += 4
  body.copy(envelope, off); off += body.length
  envelope.writeUInt32BE(crc, off)

  return envelope
}

function encodeChunk(data) {
  var header = Buffer.alloc(4)
  header.writeUInt32LE(data.length, 0)
  return encodePayload(Buffer.concat([header, data]))
}

function encodeChunked(data, chunkSize) {
  chunkSize = chunkSize || (15 * 1024 * 1024)
  if (data.length <= chunkSize) return [encodeChunk(data)]

  var chunks = []
  var off = 0
  while (off < data.length) {
    var end = Math.min(off + chunkSize, data.length)
    chunks.push(encodeChunk(data.slice(off, end)))
    off = end
  }
  return chunks
}

function packACv5(meta, body) {
  return encodePayload(buildEnvelope(meta, body))
}

function _buildManifestBody(files, gzLevel) {
  if (gzLevel === undefined) gzLevel = 9
  var gzipped = []
  var dataChunks = []

  for (var i = 0; i < files.length; i++) {
    var f = files[i]
    var content = Buffer.isBuffer(f.content) ? f.content : Buffer.from(f.content)
    var gz = zlib.gzipSync(content, { level: gzLevel })
    gzipped.push({ name: f.name, type: f.type || "js", size: content.length, gzSize: gz.length })
    dataChunks.push(gz)
  }

  var offset = 0
  var manifest = gzipped.map(function(g) {
    var entry = { name: g.name, offset: offset, size: g.size, gzSize: g.gzSize, type: g.type }
    offset += g.gzSize
    return entry
  })

  var manifestBuf = Buffer.from(JSON.stringify(manifest))
  var manifestLen = Buffer.alloc(4)
  manifestLen.writeUInt32LE(manifestBuf.length, 0)

  return Buffer.concat([manifestLen, manifestBuf].concat(dataChunks))
}

function _buildCodeEnvelope(files, version, extraMeta) {
  var body = _buildManifestBody(files)
  return buildEnvelope(Object.assign({ kind: "code", hidden: false, version: version }, extraMeta || {}), body)
}

function packCode(files, version, extraMeta) {
  return encodePayload(_buildCodeEnvelope(files, version, extraMeta))
}

function packCodeChunked(files, version, extraMeta, chunkSize) {
  return encodeChunked(_buildCodeEnvelope(files, version, extraMeta), chunkSize)
}

function buildModelEnvelope(files, meta) {
  var body = _buildManifestBody(files, 1)
  return buildEnvelope(Object.assign({ kind: "model", hidden: true }, meta || {}), body)
}

function packView(htmlContent, version, hidden) {
  var body = Buffer.isBuffer(htmlContent) ? htmlContent : Buffer.from(htmlContent)
  var meta = { kind: "view", hidden: !!hidden, version: version || "1.0.0" }
  return packACv5(meta, body)
}

module.exports = {
  crc32, encodePayload, buildEnvelope,
  encodeChunk, encodeChunked,
  packACv5, packCode, packCodeChunked, buildModelEnvelope, packView
}
