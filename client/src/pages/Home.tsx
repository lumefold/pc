import { useState } from "react";
import Desktop from "@/components/Desktop";
import Taskbar from "@/components/Taskbar";
import DesktopIcon from "@/components/DesktopIcon";
import PortfolioWindow from "@/components/PortfolioWindow";
import ResumeWindow from "@/components/ResumeWindow";
import { Folder, FileText, Heart, MessageSquare, Code } from "lucide-react";

type WindowType = "portfolio" | "resume" | "projects" | null;

export default function Home() {
  const [openWindow, setOpenWindow] = useState<WindowType>(null);

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

  return (
    <Desktop>
      <div className="h-full pb-16 p-4">
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
      </div>

      <Taskbar onAppClick={handleAppClick} />
    </Desktop>
  );
}
