export function getUuid7Timestamp(uuid: string) {
  const hex = uuid.replace(/-/g, "").slice(0, 12)
  const ms = parseInt(hex, 16)

  return new Date(ms)
}
