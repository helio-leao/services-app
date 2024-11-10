export function normalizeString(value: string) {
  return value.trim().replace(/\s{2,}/g, " ");
}
