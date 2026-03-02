export function formatModelLabel(raw: string): string {
  return raw.replace(/[(\uff08][^)\uff09]*[)\uff09]/, "").trim() || raw
}
