import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMagneticHUD } from '../../hooks/useMagneticHUD';
import gsap from 'gsap';

// Mock gsap
const gsapToSpy = vi.fn();
const gsapSetSpy = vi.fn();

vi.mock('gsap', () => {
  let cleanup: any;
  return {
    default: {
      to: (target: any, vars: any) => gsapToSpy(target, vars),
      set: (target: any, vars: any) => gsapSetSpy(target, vars),
      matchMedia: () => ({
        add: vi.fn((_q, fn) => { cleanup = fn(); }),
        revert: vi.fn(() => { if (cleanup) cleanup(); }),
      }),
    },
    gsap: {
      to: (target: any, vars: any) => gsapToSpy(target, vars),
      set: (target: any, vars: any) => gsapSetSpy(target, vars),
      matchMedia: () => ({
        add: vi.fn((_q, fn) => { cleanup = fn(); }),
        revert: vi.fn(() => { if (cleanup) cleanup(); }),
      }),
    },
  };
});

describe('useMagneticHUD Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('registers and unregisters event listeners', () => {
    const addSpy = vi.spyOn(window, 'addEventListener');
    const removeSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useMagneticHUD());

    expect(addSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    
    unmount();
    expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    
    addSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it('animates elements on mousemove if in proximity', () => {
    const corner = document.createElement('div');
    corner.className = 'hud-corner';
    // Mock getBoundingClientRect
    corner.getBoundingClientRect = vi.fn(() => ({
      left: 100, top: 100, width: 50, height: 50,
      right: 150, bottom: 150, x: 100, y: 100,
      toJSON: () => {}
    } as DOMRect));
    document.body.appendChild(corner);

    renderHook(() => useMagneticHUD());

    // Center is (125, 125)
    // Trigger mouse move at (130, 130) -> Distance is near
    const mouseMoveEvent = new MouseEvent('mousemove', {
      clientX: 130,
      clientY: 130,
    });
    window.dispatchEvent(mouseMoveEvent);

    expect(gsapToSpy).toHaveBeenCalledWith(corner, expect.objectContaining({
      x: (130 - 125) * 0.4,
      y: (130 - 125) * 0.4,
    }));
  });

  it('resets positions on cleanup', () => {
    const corner = document.createElement('div');
    corner.className = 'hud-corner';
    document.body.appendChild(corner);

    const { unmount } = renderHook(() => useMagneticHUD());
    unmount();

    expect(gsapToSpy).not.toHaveBeenCalled(); // No move happened
    expect(gsapSetSpy).toHaveBeenCalledWith(corner, { x: 0, y: 0 });
  });
});
