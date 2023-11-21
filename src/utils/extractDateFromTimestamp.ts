export function extractDateFromTimestamp(timestamp: Date) {
  const date = new Date(timestamp);
  return date.toISOString().split("T")[0];
}
