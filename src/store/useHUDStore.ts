import { create } from 'zustand';
import { projects } from '../data/projects';

export type HUDView = 'MAIN' | 'CONTACT' | 'PROJECT_DETAILS';

interface HUDState {
  currentIndex: number;

  isFlickering: boolean;
  isPending: boolean;
  systemMessage: string | null;
  lastTransitionId: number;
  lastMessageId: number;
  view: HUDView;
  
  // Actions
  next: () => void;
  prev: () => void;

  toggleDetails: () => void;
  selectProject: (index: number) => void;
  setFlicker: (active: boolean) => void;
  setPending: (pending: boolean) => void;
  pushMessage: (text: string) => void;
  setView: (view: HUDView) => void;
}

export const useHUDStore = create<HUDState>((set, get) => ({
  currentIndex: 0,

  isFlickering: false,
  isPending: false,
  systemMessage: null,
  lastTransitionId: 0,
  lastMessageId: 0,
  view: 'MAIN',

  pushMessage: (text: string) => {
    const nextMsgId = get().lastMessageId + 1;
    set({ systemMessage: text, lastMessageId: nextMsgId });
    
    setTimeout(() => {
      // PRO PATTERN: Only clear if this is still the current active message
      if (get().lastMessageId === nextMsgId) {
        set({ systemMessage: null });
      }
    }, 4000);
  },

  setFlicker: (active) => {
    set({ isFlickering: active });
  },

  setPending: (pending) => set({ isPending: pending }),

  setView: (view) => {
    set({ view });
  },

  next: () => {
    const { currentIndex, lastTransitionId } = get();
    const nextIndex = (currentIndex + 1) % projects.length;
    const nextTransId = lastTransitionId + 1;
    set({ currentIndex: nextIndex, isPending: true, lastTransitionId: nextTransId, isFlickering: true });
    setTimeout(() => {
      if (get().lastTransitionId === nextTransId) {
        set({ isFlickering: false, isPending: false });
      }
    }, 800);
  },

  prev: () => {
    const { currentIndex, lastTransitionId } = get();
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    const nextTransId = lastTransitionId + 1;
    set({ currentIndex: prevIndex, isPending: true, lastTransitionId: nextTransId, isFlickering: true });
    setTimeout(() => {
      if (get().lastTransitionId === nextTransId) {
        set({ isFlickering: false, isPending: false });
      }
    }, 800);
  },



  toggleDetails: () => {
    const { view } = get();
    set({ view: view === 'PROJECT_DETAILS' ? 'MAIN' : 'PROJECT_DETAILS' });
  },

  selectProject: (index: number) => {
    if (index < 0 || index >= projects.length) return;
    const { lastTransitionId } = get();
    const nextTransId = lastTransitionId + 1;
    set({ currentIndex: index, isPending: true, lastTransitionId: nextTransId, isFlickering: true, view: 'MAIN' });
    setTimeout(() => {
      if (get().lastTransitionId === nextTransId) {
        set({ isFlickering: false, isPending: false });
      }
    }, 800);
  }
}));
