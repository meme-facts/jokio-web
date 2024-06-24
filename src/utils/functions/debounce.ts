export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timeout: ReturnType<typeof setTimeout>;

  return function (this: void, ...args: Parameters<T>): Promise<ReturnType<T>> {
    return new Promise<ReturnType<T>>((resolve) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => resolve(func(...args)), wait);
    });
  };
}
