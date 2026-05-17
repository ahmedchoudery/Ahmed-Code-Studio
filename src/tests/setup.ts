import '@testing-library/jest-dom';
import { vi, beforeAll, afterAll, beforeEach } from 'vitest';

// Mock GSAP globally — it relies on browser APIs not available in jsdom
vi.mock('gsap', () => ({
  default: {
    to: vi.fn(),
    from: vi.fn(),
    fromTo: vi.fn(),
    set: vi.fn(),
    timeline: vi.fn(() => ({
      fromTo: vi.fn().mockReturnThis(),
      to: vi.fn().mockReturnThis(),
    })),
    context: vi.fn((fn) => {
      fn();
      return { revert: vi.fn() };
    }),
  },
}));

// Mock next/dynamic
vi.mock('next/dynamic', () => ({
  default: (fn: () => Promise<any>) => {
    return () => null;
  },
}));

// Silence console errors from React 19 during tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('ReactDOM.render') || args[0].includes('act('))
    ) return;
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
class IntersectionObserverMock {
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  callback: IntersectionObserverCallback;
  observe = vi.fn((element: Element) => {
    // Immediately trigger as visible in tests
    this.callback([{ isIntersecting: true, target: element } as any], this as any);
  });
  unobserve = vi.fn();
  disconnect = vi.fn();
}

// Global cleanup for tests
beforeEach(() => {
  vi.clearAllMocks();
  vi.useRealTimers();
});

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});
