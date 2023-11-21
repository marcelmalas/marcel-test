export function generateUniqueId() {
  const timestamp = Date.now();
  const randomComponent = Math.floor(Math.random() * 1000);
  return `${timestamp}${randomComponent}`;
}
