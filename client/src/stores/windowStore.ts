import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  icon?: any;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  isAlwaysOnTop: boolean;
  zIndex: number;
  desktopId: string;
}

export interface Desktop {
  id: string;
  name: string;
  wallpaper?: string;
}

interface WindowStore {
  windows: WindowState[];
  desktops: Desktop[];
  currentDesktopId: string;
  focusedWindowId: string | null;
  
  openWindow: (appId: string, props?: Partial<WindowState>) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, width: number, height: number) => void;
  snapWindow: (id: string, position: 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') => void;
  toggleAlwaysOnTop: (id: string) => void;
  moveWindowToDesktop: (id: string, desktopId: string) => void;
  
  createDesktop: (name: string) => void;
  deleteDesktop: (id: string) => void;
  switchDesktop: (id: string) => void;
  
  getMaxZIndex: () => number;
}

const defaultDesktop: Desktop = {
  id: 'desktop-1',
  name: 'Desktop 1',
};

export const useWindowStore = create<WindowStore>()(
  persist(
    (set, get) => ({
      windows: [],
      desktops: [defaultDesktop],
      currentDesktopId: defaultDesktop.id,
      focusedWindowId: null,

      getMaxZIndex: () => {
        const windows = get().windows;
        if (windows.length === 0) return 100;
        return Math.max(...windows.map(w => w.zIndex));
      },

      openWindow: (appId, props = {}) => {
        const maxZ = get().getMaxZIndex();
        const newWindow: WindowState = {
          id: `window-${Date.now()}`,
          appId,
          title: props.title || appId,
          icon: props.icon,
          position: props.position || { x: 100 + get().windows.length * 30, y: 100 + get().windows.length * 30 },
          size: props.size || { width: 800, height: 600 },
          isMinimized: false,
          isMaximized: false,
          isAlwaysOnTop: false,
          zIndex: maxZ + 1,
          desktopId: get().currentDesktopId,
          ...props,
        };
        
        set(state => ({
          windows: [...state.windows, newWindow],
          focusedWindowId: newWindow.id,
        }));
      },

      closeWindow: (id) => {
        set(state => ({
          windows: state.windows.filter(w => w.id !== id),
          focusedWindowId: state.focusedWindowId === id ? null : state.focusedWindowId,
        }));
      },

      focusWindow: (id) => {
        const maxZ = get().getMaxZIndex();
        set(state => ({
          windows: state.windows.map(w => 
            w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w
          ),
          focusedWindowId: id,
        }));
      },

      minimizeWindow: (id) => {
        set(state => ({
          windows: state.windows.map(w => 
            w.id === id ? { ...w, isMinimized: true } : w
          ),
          focusedWindowId: state.focusedWindowId === id ? null : state.focusedWindowId,
        }));
      },

      maximizeWindow: (id) => {
        set(state => ({
          windows: state.windows.map(w => 
            w.id === id ? { ...w, isMaximized: true } : w
          ),
        }));
      },

      restoreWindow: (id) => {
        set(state => ({
          windows: state.windows.map(w => 
            w.id === id ? { ...w, isMaximized: false } : w
          ),
        }));
      },

      moveWindow: (id, x, y) => {
        set(state => ({
          windows: state.windows.map(w => 
            w.id === id ? { ...w, position: { x, y } } : w
          ),
        }));
      },

      resizeWindow: (id, width, height) => {
        set(state => ({
          windows: state.windows.map(w => 
            w.id === id ? { ...w, size: { width, height } } : w
          ),
        }));
      },

      snapWindow: (id, position) => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight - 64; // Account for taskbar
        
        const snapPositions = {
          left: { x: 0, y: 0, width: screenWidth / 2, height: screenHeight },
          right: { x: screenWidth / 2, y: 0, width: screenWidth / 2, height: screenHeight },
          top: { x: 0, y: 0, width: screenWidth, height: screenHeight },
          bottom: { x: 0, y: 0, width: screenWidth, height: screenHeight },
          'top-left': { x: 0, y: 0, width: screenWidth / 2, height: screenHeight / 2 },
          'top-right': { x: screenWidth / 2, y: 0, width: screenWidth / 2, height: screenHeight / 2 },
          'bottom-left': { x: 0, y: screenHeight / 2, width: screenWidth / 2, height: screenHeight / 2 },
          'bottom-right': { x: screenWidth / 2, y: screenHeight / 2, width: screenWidth / 2, height: screenHeight / 2 },
        };

        const snap = snapPositions[position];
        if (!snap) return;

        set(state => ({
          windows: state.windows.map(w => 
            w.id === id 
              ? { ...w, position: { x: snap.x, y: snap.y }, size: { width: snap.width, height: snap.height }, isMaximized: false }
              : w
          ),
        }));
      },

      toggleAlwaysOnTop: (id) => {
        set(state => ({
          windows: state.windows.map(w => 
            w.id === id ? { ...w, isAlwaysOnTop: !w.isAlwaysOnTop } : w
          ),
        }));
      },

      moveWindowToDesktop: (id, desktopId) => {
        set(state => ({
          windows: state.windows.map(w => 
            w.id === id ? { ...w, desktopId } : w
          ),
        }));
      },

      createDesktop: (name) => {
        const newDesktop: Desktop = {
          id: `desktop-${Date.now()}`,
          name,
        };
        set(state => ({
          desktops: [...state.desktops, newDesktop],
        }));
      },

      deleteDesktop: (id) => {
        const state = get();
        if (state.desktops.length <= 1) return; // Keep at least one desktop
        
        const desktopToDelete = state.desktops.find(d => d.id === id);
        if (!desktopToDelete) return;

        const remainingDesktops = state.desktops.filter(d => d.id !== id);
        const newCurrentDesktop = state.currentDesktopId === id ? remainingDesktops[0].id : state.currentDesktopId;

        set({
          desktops: remainingDesktops,
          currentDesktopId: newCurrentDesktop,
          windows: state.windows.map(w => 
            w.desktopId === id ? { ...w, desktopId: newCurrentDesktop } : w
          ),
        });
      },

      switchDesktop: (id) => {
        set({ currentDesktopId: id });
      },
    }),
    {
      name: 'windows-storage',
      partialize: (state) => ({
        desktops: state.desktops,
        currentDesktopId: state.currentDesktopId,
      }),
    }
  )
);
