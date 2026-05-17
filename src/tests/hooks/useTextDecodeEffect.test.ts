import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useTextDecodeEffect } from '../../hooks/useTextDecodeEffect';

describe('useTextDecodeEffect Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders initial text immediately when not active', () => {
    const { result } = renderHook(() => useTextDecodeEffect('FINAL TEXT', false));
    expect(result.current).toBe('FINAL TEXT');
  });

  it('scrambles text and eventually resolves to target text', () => {
    const text = 'HELLO';
    const { result } = renderHook(() => useTextDecodeEffect(text, true));

    // Initially, it might be scrambled or starting
    // We expect it to change over time
    act(() => {
      vi.advanceTimersByTime(100);
    });

    // Advance enough time to finish (maxIterations + 1 stays)
    // HELLO is 5 chars. 5 * 3 * 30ms = 450ms approximately
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current).toBe(text);
  });

  it('cleans up interval on unmount', () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
    const { unmount } = renderHook(() => useTextDecodeEffect('CLEANUP', true));
    
    unmount();
    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});
