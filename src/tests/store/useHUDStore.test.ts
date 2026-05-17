import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { useHUDStore } from '@/store/useHUDStore';
import { projects } from '@/data/projects';

describe('useHUDStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useHUDStore.setState({
      currentIndex: 0,
      isFlickering: false,
      isPending: false,
      systemMessage: null,
      lastTransitionId: 0,
      lastMessageId: 0,
      view: 'MAIN',
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize with default state', () => {
    const state = useHUDStore.getState();
    expect(state.currentIndex).toBe(0);
    expect(state.view).toBe('MAIN');
  });

  it('should change view to CONTACT', () => {
    useHUDStore.getState().setView('CONTACT');
    const state = useHUDStore.getState();
    expect(state.view).toBe('CONTACT');
  });



  it('should push message and clear it after timeout', () => {
    useHUDStore.getState().pushMessage('TEST_MSG');
    expect(useHUDStore.getState().systemMessage).toBe('TEST_MSG');
    expect(useHUDStore.getState().lastMessageId).toBe(1);

    // Fast-forward 4000ms
    vi.advanceTimersByTime(4000);
    expect(useHUDStore.getState().systemMessage).toBeNull();
  });

  it('should resolve next() transition correctly', () => {
    useHUDStore.getState().next();
    
    let state = useHUDStore.getState();
    expect(state.currentIndex).toBe(1 % projects.length);
    expect(state.isPending).toBe(true);
    expect(state.isFlickering).toBe(true);

    vi.advanceTimersByTime(800);
    
    state = useHUDStore.getState();
    expect(state.isPending).toBe(false);
    expect(state.isFlickering).toBe(false);
  });

  it('should resolve prev() transition correctly', () => {
    useHUDStore.getState().prev();
    
    let state = useHUDStore.getState();
    expect(state.currentIndex).toBe(projects.length - 1);
    expect(state.isPending).toBe(true);

    vi.advanceTimersByTime(800);
    
    state = useHUDStore.getState();
    expect(state.isPending).toBe(false);
  });

  it('should handle selectProject correctly', () => {
    if (projects.length > 1) {
      useHUDStore.getState().selectProject(1);
      expect(useHUDStore.getState().currentIndex).toBe(1);
      expect(useHUDStore.getState().isPending).toBe(true);

      vi.advanceTimersByTime(800);
      expect(useHUDStore.getState().isPending).toBe(false);
    }
  });

  it('should ignore invalid indices in selectProject', () => {
    useHUDStore.getState().selectProject(-1);
    expect(useHUDStore.getState().currentIndex).toBe(0);

    useHUDStore.getState().selectProject(999);
    expect(useHUDStore.getState().currentIndex).toBe(0);
  });

  it('should set flicker state', () => {
    useHUDStore.getState().setFlicker(true);
    expect(useHUDStore.getState().isFlickering).toBe(true);
    
    useHUDStore.getState().setFlicker(false);
    expect(useHUDStore.getState().isFlickering).toBe(false);
  });

  it('should set pending state', () => {
    useHUDStore.getState().setPending(true);
    expect(useHUDStore.getState().isPending).toBe(true);
  });
});


