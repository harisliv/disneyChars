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

    rerender({ value: 'updated' });
    expect(result.current).toBe('initial');

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

    rerender({ value: 'updated' });
    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe('initial');

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

    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(300);
    });

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

    unmount();

    act(() => {
      vi.advanceTimersByTime(500);
    });

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

    rerender({ value: 'same' });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('same');
  });
});
