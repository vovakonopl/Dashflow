import { useCallback, useRef } from 'react';

export function useDebounce() {
  const timeoutIdRef = useRef<NodeJS.Timeout>(null);

  return useCallback((callback: () => void, delay: number) => {
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = setTimeout(callback, delay);
  }, []);
}
