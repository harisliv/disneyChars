import { useEffect, useState } from 'react';

/**
 * Simplified debounce hook for string input values.
 * @param value The string value to debounce
 * @param delay The delay in milliseconds (default is 500ms)
 * @returns The debounced string value
 */
export function useDebounceInputValue(
  value: string,
  delay: number = 500
): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
}
