import { useState, useEffect } from "react";
import Desktop from "@/components/Desktop";
import Taskbar from "@/components/Taskbar";
import DesktopIcon from "@/components/DesktopIcon";
import PortfolioWindow from "@/components/PortfolioWindow";
import ResumeWindow from "@/components/ResumeWindow";
import ProjectsWindow from "@/components/ProjectsWindow";
import AboutWindow from "@/components/AboutWindow";
import FileExplorerWindow from "@/components/FileExplorerWindow";
import TerminalWindow from "@/components/TerminalWindow";
import SettingsWindow from "@/components/SettingsWindow";
import ContextMenu from "@/components/ContextMenu";
import NotificationCenter from "@/components/NotificationCenter";
import QuickSettings from "@/components/QuickSettings";
import LoadingScreen from "@/components/LoadingScreen";
import VirtualDesktops from "@/components/VirtualDesktops";
import WidgetsPanel from "@/components/WidgetsPanel";
import AltTabSwitcher from "@/components/AltTabSwitcher";
import SnapOverlay from "@/components/SnapOverlay";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useWindowStore } from "@/stores/windowStore";
import { Folder, FileText, Heart, MessageSquare, Code, User, Bell, FolderOpen, Terminal, Settings } from "lucide-react";

type SnapPosition = 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'maximize' | null;

const APP_CONFIGS = {
  portfolio: { title: "Portfolio", icon: Folder, component: PortfolioWindow },
  resume: { title: "Resume", icon: FileText, component: ResumeWindow },
  projects: { title: "Projects", icon: Code, component: ProjectsWindow },
  about: { title: "About", icon: User, component: AboutWindow },
  explorer: { title: "File Explorer", icon: FolderOpen, component: FileExplorerWindow },
  terminal: { title: "Terminal", icon: Terminal, component: TerminalWindow },
  settings: { title: "Settings", icon: Settings, component: SettingsWindow },
};

export default function Home() {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [quickSettingsOpen, setQuickSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [virtualDesktopsOpen, setVirtualDesktopsOpen] = useState(false);
  const [widgetsOpen, setWidgetsOpen] = useState(false);
  const [altTabOpen, setAltTabOpen] = useState(false);
  const [altTabIndex, setAltTabIndex] = useState(0);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [snapPreview, setSnapPreview] = useState<SnapPosition>(null);

  const { windows, currentDesktopId, openWindow, closeWindow, focusWindow } = useWindowStore();
  const activeWindows = windows.filter(w => w.desktopId === currentDesktopId && !w.isMinimized);

  useKeyboardShortcuts({
    onToggleStart: () => setStartMenuOpen(prev => !prev),
    onToggleNotifications: () => setNotificationsOpen(prev => !prev),
    onToggleWidgets: () => setWidgetsOpen(prev => !prev),
    onToggleVirtualDesktops: () => setVirtualDesktopsOpen(prev => !prev),
    onToggleAltTab: (direction) => {
      const eligibleWindows = activeWindows.filter(w => !w.isMinimized);
      if (eligibleWindows.length === 0) return;

      const nextIndex = direction === 'backward'
        ? (altTabIndex - 1 + eligibleWindows.length) % eligibleWindows.length
        : (altTabIndex + 1) % eligibleWindows.length;

      setAltTabIndex(nextIndex);
      setAltTabOpen(true);

      const handleKeyUp = (e: KeyboardEvent) => {
        if (!e.altKey) {
          setAltTabOpen(false);
          const targetWindow = eligibleWindows[nextIndex];
          if (targetWindow) {
            focusWindow(targetWindow.id);
          }
          window.removeEventListener('keyup', handleKeyUp);
        }
      };
      window.addEventListener('keyup', handleKeyUp);
    },
  });

  const handleAppClick = (appName: string) => {
    const appKey = appName.toLowerCase().replace(' ', '');
    const config = APP_CONFIGS[appKey as keyof typeof APP_CONFIGS];
    
    if (config) {
      openWindow(appKey, {
        title: config.title,
        icon: config.icon,
      });
    } else {
      console.log(`Opening ${appName}`);
    }
  };

  const handleDesktopIconDoubleClick = (iconName: string) => {
    handleAppClick(iconName);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const renderWindow = (window: typeof windows[0]) => {
    const config = APP_CONFIGS[window.appId as keyof typeof APP_CONFIGS];
    if (!config) return null;

    const WindowComponent = config.component;
    return (
      <WindowComponent
        key={window.id}
        onClose={() => closeWindow(window.id)}
      />
    );
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <Desktop>
      <div 
        className="h-full pb-16 p-4"
        onContextMenu={handleContextMenu}
      >
        <div className="grid grid-cols-8 gap-4 content-start">
          <DesktopIcon
            icon={Folder}
            label="Portfolio"
            onDoubleClick={() => handleDesktopIconDoubleClick("Portfolio")}
          />
          <DesktopIcon
            icon={FileText}
            label="Resume"
            onDoubleClick={() => handleDesktopIconDoubleClick("Resume")}
          />
          <DesktopIcon
            icon={Code}
            label="Projects"
            onDoubleClick={() => handleDesktopIconDoubleClick("Projects")}
          />
          <DesktopIcon
            icon={User}
            label="About"
            onDoubleClick={() => handleAppClick("about")}
          />
          <DesktopIcon
            icon={FolderOpen}
            label="File Explorer"
            onDoubleClick={() => handleAppClick("explorer")}
          />
          <DesktopIcon
            icon={Terminal}
            label="Terminal"
            onDoubleClick={() => handleAppClick("terminal")}
          />
          <DesktopIcon
            icon={Settings}
            label="Settings"
            onDoubleClick={() => handleAppClick("settings")}
          />
          <DesktopIcon
            icon={Heart}
            label="Likes"
            onDoubleClick={() => console.log("Opening Likes")}
          />
          <DesktopIcon
            icon={MessageSquare}
            label="Comments"
            onDoubleClick={() => console.log("Opening Comments")}
          />
        </div>

        {activeWindows.map(renderWindow)}

        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={() => setContextMenu(null)}
          />
        )}

        <button
          onClick={() => setNotificationsOpen(!notificationsOpen)}
          className="fixed top-20 right-4 z-40 h-10 w-10 bg-card/70 backdrop-blur-xl border border-card-border rounded-md flex items-center justify-center hover-elevate"
          data-testid="button-notifications"
        >
          <Bell className="h-5 w-5" />
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-[10px] text-white font-semibold">3</span>
          </div>
        </button>

        <NotificationCenter 
          isOpen={notificationsOpen} 
          onClose={() => setNotificationsOpen(false)} 
        />

        <QuickSettings
          isOpen={quickSettingsOpen}
          onClose={() => setQuickSettingsOpen(false)}
        />

        <VirtualDesktops
          isOpen={virtualDesktopsOpen}
          onClose={() => setVirtualDesktopsOpen(false)}
        />

        <WidgetsPanel
          isOpen={widgetsOpen}
          onClose={() => setWidgetsOpen(false)}
        />

        <AltTabSwitcher
          isOpen={altTabOpen}
          selectedIndex={altTabIndex}
        />

        <SnapOverlay position={snapPreview} />
      </div>

      <Taskbar 
        onAppClick={handleAppClick}
        onQuickSettingsClick={() => setQuickSettingsOpen(!quickSettingsOpen)}
      />
    </Desktop>
  );
}
