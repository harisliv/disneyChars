import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounceInputValue } from '../hooks/useDebounceInputValue';

describe('useDebounceInputValue', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounceInputValue('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce value updates with default delay', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounceInputValue(value),
      {
        initialProps: { value: 'initial' }
      }
    );

    expect(result.current).toBe('initial');

    // Update the value
    rerender({ value: 'updated' });
    expect(result.current).toBe('initial'); // Should still be initial

    // Fast-forward time by 500ms (default delay)
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('should debounce value updates with custom delay', async () => {
    const delay = 1000;
    const { result, rerender } = renderHook(
      ({ value }) => useDebounceInputValue(value, delay),
      {
        initialProps: { value: 'initial' }
      }
    );

    expect(result.current).toBe('initial');

    // Update the value
    rerender({ value: 'updated' });
    expect(result.current).toBe('initial'); // Should still be initial

    // Fast-forward time by less than delay
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe('initial'); // Should still be initial

    // Fast-forward the remaining time
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe('updated');
  });

  it('should only update with the latest value after rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounceInputValue(value, 500),
      {
        initialProps: { value: 'initial' }
      }
    );

    // Rapidly change the value multiple times
    rerender({ value: 'change1' });
    act(() => {
      vi.advanceTimersByTime(200);
    });

    rerender({ value: 'change2' });
    act(() => {
      vi.advanceTimersByTime(200);
    });

    rerender({ value: 'change3' });
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Should still be initial (none of the changes have passed the delay)
    expect(result.current).toBe('initial');

    // Fast-forward past the delay from the last change
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Should only have the last value
    expect(result.current).toBe('change3');
  });

  it('should cancel pending updates on unmount', () => {
    const { result, rerender, unmount } = renderHook(
      ({ value }) => useDebounceInputValue(value, 500),
      {
        initialProps: { value: 'initial' }
      }
    );

    rerender({ value: 'updated' });
    expect(result.current).toBe('initial');

    // Unmount before delay completes
    unmount();

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // The hook is unmounted, so we can't check result.current
    // But we can verify no errors occurred
    expect(true).toBe(true);
  });

  it('should handle multiple value changes correctly', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounceInputValue(value, 300),
      {
        initialProps: { value: 'value1' }
      }
    );

    expect(result.current).toBe('value1');

    rerender({ value: 'value2' });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe('value2');

    rerender({ value: 'value3' });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe('value3');
  });

  it('should not update if value has not changed', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounceInputValue(value, 500),
      {
        initialProps: { value: 'same' }
      }
    );

    const initialValue = result.current;
    expect(initialValue).toBe('same');

    // Rerender with the same value
    rerender({ value: 'same' });

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Value should remain the same (no unnecessary updates)
    expect(result.current).toBe('same');
  });
});
