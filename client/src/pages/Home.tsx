import { useState } from "react";
import Desktop from "@/components/Desktop";
import Taskbar from "@/components/Taskbar";
import DesktopIcon from "@/components/DesktopIcon";
import PortfolioWindow from "@/components/PortfolioWindow";
import ResumeWindow from "@/components/ResumeWindow";
import ProjectsWindow from "@/components/ProjectsWindow";
import AboutWindow from "@/components/AboutWindow";
import ContextMenu from "@/components/ContextMenu";
import NotificationCenter from "@/components/NotificationCenter";
import { Folder, FileText, Heart, MessageSquare, Code, User, Bell } from "lucide-react";

type WindowType = "portfolio" | "resume" | "projects" | "about" | null;

export default function Home() {
  const [openWindow, setOpenWindow] = useState<WindowType>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleAppClick = (appName: string) => {
    switch (appName.toLowerCase()) {
      case "portfolio":
        setOpenWindow("portfolio");
        break;
      case "resume":
        setOpenWindow("resume");
        break;
      case "projects":
        setOpenWindow("projects");
        break;
      default:
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
            onDoubleClick={() => setOpenWindow("about")}
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

        {openWindow === "portfolio" && (
          <PortfolioWindow onClose={() => setOpenWindow(null)} />
        )}
        {openWindow === "resume" && (
          <ResumeWindow onClose={() => setOpenWindow(null)} />
        )}
        {openWindow === "projects" && (
          <ProjectsWindow onClose={() => setOpenWindow(null)} />
        )}
        {openWindow === "about" && (
          <AboutWindow onClose={() => setOpenWindow(null)} />
        )}

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
      </div>

      <Taskbar onAppClick={handleAppClick} />
    </Desktop>
  );
}
