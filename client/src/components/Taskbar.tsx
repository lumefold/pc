import { useState } from "react";
import { Command, Github, Code, Figma, Folder, FileText, Trash2 } from "lucide-react";
import SearchBox from "./SearchBox";
import SystemTray from "./SystemTray";
import StartMenu from "./StartMenu";

interface TaskbarProps {
  onAppClick?: (appName: string) => void;
}

const taskbarApps = [
  { icon: Github, label: "GitHub" },
  { icon: Code, label: "VSCode" },
  { icon: Figma, label: "Figma" },
  { icon: Folder, label: "Portfolio" },
  { icon: FileText, label: "Resume" },
  { icon: Trash2, label: "Recycle Bin" },
];

export default function Taskbar({ onAppClick }: TaskbarProps) {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [activeApp, setActiveApp] = useState<string | null>(null);

  const handleAppClick = (appLabel: string) => {
    setActiveApp(appLabel);
    onAppClick?.(appLabel);
    console.log(`Opened ${appLabel}`);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-card/70 backdrop-blur-xl border-t border-card-border z-30 px-2" data-testid="taskbar">
        <div className="h-full flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsStartOpen(!isStartOpen)}
              className="h-10 w-10 flex items-center justify-center rounded-md hover-elevate"
              data-testid="button-start"
            >
              <Command className="h-5 w-5" />
            </button>

            <SearchBox />
          </div>

          <div className="flex items-center gap-1">
            {taskbarApps.map((app, index) => (
              <button
                key={index}
                onClick={() => handleAppClick(app.label)}
                className={`relative h-10 w-10 flex items-center justify-center rounded-md hover-elevate ${
                  activeApp === app.label ? 'bg-accent' : ''
                }`}
                data-testid={`taskbar-app-${app.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <app.icon className="h-5 w-5" />
                {activeApp === app.label && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          <SystemTray />
        </div>
      </div>

      <StartMenu isOpen={isStartOpen} onClose={() => setIsStartOpen(false)} />
    </>
  );
}
