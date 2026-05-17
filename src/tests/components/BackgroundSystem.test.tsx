import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import BackgroundSystem from '../../components/BackgroundSystem';

describe('BackgroundSystem Component', () => {
  beforeEach(() => {
    // Mock getContext to avoid JSDOM errors
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
      setTransform: vi.fn(),
      fillRect: vi.fn(),
      createLinearGradient: vi.fn().mockReturnValue({ addColorStop: vi.fn() }),
      createRadialGradient: vi.fn().mockReturnValue({ addColorStop: vi.fn() }),
      drawImage: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      closePath: vi.fn(),
      stroke: vi.fn(),
      fill: vi.fn(),
      arc: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
      scale: vi.fn(),
      putImageData: vi.fn(),
      createImageData: vi.fn().mockReturnValue({ data: new Uint8ClampedArray(256 * 256 * 4) }),
    }) as any;
  });

  it('handles window events and animation loop', async () => {
    vi.useFakeTimers();
    
    // Mock requestAnimationFrame to run immediately
    let rafCallback: any = null;
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      rafCallback = cb;
      return 1;
    });

    const { unmount, getByRole, container } = render(<BackgroundSystem />);
    
    // Check for preloader
    expect(getByRole('status')).toBeInTheDocument();
    expect(container.querySelector('#bg-loader')).toBeInTheDocument();
    
    // Check for CSS overlays
    expect(container.querySelector('.amb-warm')).toBeInTheDocument();
    expect(container.querySelector('.amb-cool')).toBeInTheDocument();
    expect(container.querySelector('#vig')).toBeInTheDocument();

    // Trigger the initial RAF
    if (rafCallback) rafCallback(1000);

    // 1. Mouse move
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 500, clientY: 500 }));
    
    // 2. Click (ripple)
    window.dispatchEvent(new MouseEvent('click', { clientX: 200, clientY: 200 }));
    
    // 3. Touch events
    const touch = { clientX: 100, clientY: 100 };
    window.dispatchEvent(new TouchEvent('touchmove', { touches: [touch as any] }));
    window.dispatchEvent(new TouchEvent('touchstart', { touches: [touch as any] }));

    // 4. Keydown (Enter/Space)
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));

    // 5. Resize
    window.dispatchEvent(new Event('resize'));
    vi.advanceTimersByTime(200); // Trigger resize timeout

    // 6. Visibility change
    Object.defineProperty(document, 'hidden', { value: true, configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));
    
    Object.defineProperty(document, 'hidden', { value: false, configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));

    // 7. Advance animation several frames
    for (let i = 0; i < 5; i++) {
       if (rafCallback) rafCallback(1000 + i * 16);
       vi.advanceTimersByTime(16);
    }

    // Unmount to trigger cleanup
    unmount();

    vi.useRealTimers();
  });
});


