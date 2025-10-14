import { useEffect } from 'react';
import { useWindowStore } from '@/stores/windowStore';

interface KeyboardShortcutsHandlers {
  onToggleStart: () => void;
  onToggleNotifications: () => void;
  onToggleWidgets: () => void;
  onToggleVirtualDesktops: () => void;
  onToggleAltTab: (direction?: 'forward' | 'backward') => void;
}

export function useKeyboardShortcuts(handlers: KeyboardShortcutsHandlers) {
  const { focusedWindowId, snapWindow, windows } = useWindowStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMeta = e.metaKey || e.key === 'Meta';
      const isCtrl = e.ctrlKey;
      const isAlt = e.altKey;

      // Win key or Ctrl+Esc - Toggle Start Menu
      if ((isMeta && !e.ctrlKey && !e.altKey && !e.shiftKey) || (isCtrl && e.key === 'Escape')) {
        e.preventDefault();
        handlers.onToggleStart();
        return;
      }

      // Win + A - Notification Center
      if (isMeta && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        handlers.onToggleNotifications();
        return;
      }

      // Win + W - Widgets
      if (isMeta && e.key.toLowerCase() === 'w') {
        e.preventDefault();
        handlers.onToggleWidgets();
        return;
      }

      // Win + Tab - Virtual Desktops
      if (isMeta && e.key === 'Tab') {
        e.preventDefault();
        handlers.onToggleVirtualDesktops();
        return;
      }

      // Alt + Tab - App Switcher
      if (isAlt && e.key === 'Tab') {
        e.preventDefault();
        handlers.onToggleAltTab(e.shiftKey ? 'backward' : 'forward');
        return;
      }

      // Win + Arrow keys - Snap window
      if (isMeta && focusedWindowId) {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            snapWindow(focusedWindowId, 'left');
            break;
          case 'ArrowRight':
            e.preventDefault();
            snapWindow(focusedWindowId, 'right');
            break;
          case 'ArrowUp':
            e.preventDefault();
            const focusedWindow = windows.find(w => w.id === focusedWindowId);
            if (focusedWindow && !focusedWindow.isMaximized) {
              useWindowStore.getState().maximizeWindow(focusedWindowId);
            }
            break;
          case 'ArrowDown':
            e.preventDefault();
            const currentWindow = windows.find(w => w.id === focusedWindowId);
            if (currentWindow?.isMaximized) {
              useWindowStore.getState().restoreWindow(focusedWindowId);
            } else {
              useWindowStore.getState().minimizeWindow(focusedWindowId);
            }
            break;
        }
      }

      // Escape - Close active overlays
      if (e.key === 'Escape') {
        // This will be handled by individual components
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers, focusedWindowId, snapWindow, windows]);
}
