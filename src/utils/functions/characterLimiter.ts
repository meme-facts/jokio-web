export function characterLimiter(limit: number, text?: string) {
  if (!text) {
    return text;
  }
  if (text.length <= limit) {
    return text;
  }
  const wordBreak = text.substring(0, limit);

  return wordBreak + "...";
}
