function debounce<T extends (...args: T[]) => void>(fn: T, delay: number) {
  let timerID: ReturnType<typeof setTimeout> | null = null;
  return function (...args: Parameters<T>) {
    if (timerID) {
      clearTimeout(timerID);
    }
    timerID = setTimeout(() => fn.apply(self, args), delay);
  };
}

export default debounce;
