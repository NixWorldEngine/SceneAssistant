import { marked } from "marked"

var _DANGEROUS_RE = /<\s*\/?\s*(?:script|iframe|object|embed|form|link|meta|base|applet)\b[^>]*>|on\w+\s*=\s*["'][^"']*["']|on\w+\s*=\s*[^\s>]+/gi
var _JS_PROTO_RE = /(?:javascript|vbscript|data)\s*:/i
var _ENTITY_DECODE_RE = /&#x?[0-9a-fA-F]+;?/g

function _decodeEntities(s: string): string {
  return s.replace(_ENTITY_DECODE_RE, m => {
    try {
      const code = m.startsWith("&#x") ? parseInt(m.slice(3), 16) : parseInt(m.slice(2), 10)
      return isNaN(code) ? m : String.fromCodePoint(code)
    } catch { return m }
  })
}

function _sanitize(html: string): string {
  let s = html.replace(_DANGEROUS_RE, "")
  s = s.replace(/href\s*=\s*["']([^"']*)["']/gi, (match, url) => {
    const decoded = _decodeEntities(url).replace(/\s/g, "")
    if (_JS_PROTO_RE.test(decoded)) return 'href="#"'
    return match
  })
  s = s.replace(/src\s*=\s*["']([^"']*)["']/gi, (match, url) => {
    const decoded = _decodeEntities(url).replace(/\s/g, "")
    if (_JS_PROTO_RE.test(decoded)) return 'src=""'
    return match
  })
  s = s.replace(/\sstyle\s*=\s*["'][^"']*["']/gi, "")
  return s
}

marked.setOptions({ breaks: true, gfm: true })

const CJK_QUOTE_RE = /\u201c([\s\S]*?)\u201d/g
const CORNER_QUOTE_RE = /\u300c([\s\S]*?)\u300d/g

export function wrapCjkQuotes(html: string): string {
  return html
    .replace(CJK_QUOTE_RE, '<q class="cjk-quote">\u201c$1\u201d</q>')
    .replace(CORNER_QUOTE_RE, '<q class="cjk-quote">\u300c$1\u300d</q>')
}

export function renderMarkdown(text: string): string {
  if (!text) return ""
  return _sanitize(marked.parse(text, { async: false }) as string)
}

export function renderContent(text: string): string {
  if (!text) return ""
  try {
    return wrapCjkQuotes(renderMarkdown(text))
  } catch {
    return text
  }
}
