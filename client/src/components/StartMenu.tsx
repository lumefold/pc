import { Search, Github, Code, Figma, FileText, Folder, Twitter, Linkedin, Terminal } from "lucide-react";

interface StartMenuProps {
  isOpen: boolean;
  onClose?: () => void;
}

const pinnedApps = [
  { icon: Folder, label: "Portfolio", color: "text-yellow-500" },
  { icon: FileText, label: "Resume", color: "text-blue-500" },
  { icon: Code, label: "Projects", color: "text-green-500" },
  { icon: Github, label: "GitHub", color: "text-foreground" },
  { icon: Code, label: "VSCode", color: "text-blue-600" },
  { icon: Figma, label: "Figma", color: "text-purple-500" },
  { icon: Terminal, label: "Terminal", color: "text-foreground" },
  { icon: Twitter, label: "Twitter", color: "text-sky-500" },
  { icon: Linkedin, label: "LinkedIn", color: "text-blue-600" },
];

const recommended = [
  { icon: FileText, label: "Resume.pdf", time: "Sunday at 10:14 AM" },
  { icon: Folder, label: "My Portfolio", time: "August 26" },
  { icon: Code, label: "Recent Projects", time: "August 25" },
];

export default function StartMenu({ isOpen, onClose }: StartMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
        data-testid="start-menu-backdrop"
      />
      <div 
        className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[640px] bg-card/70 backdrop-blur-3xl border border-card-border rounded-lg shadow-2xl z-50 p-6"
        data-testid="start-menu"
      >
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Type here to search..."
              className="w-full h-9 pl-9 pr-3 bg-muted/50 border border-input rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              data-testid="input-start-search"
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold">Pinned</h3>
            <button className="text-xs text-primary hover-elevate px-2 py-1 rounded-md" data-testid="button-all-apps">
              All apps →
            </button>
          </div>
          <div className="grid grid-cols-6 gap-3">
            {pinnedApps.map((app, index) => (
              <button
                key={index}
                className="flex flex-col items-center gap-1.5 p-2 rounded-md hover-elevate"
                onClick={() => console.log(`Opening ${app.label}`)}
                data-testid={`app-${app.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <app.icon className={`h-8 w-8 ${app.color}`} />
                <span className="text-[11px] text-center leading-tight">{app.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold">Recommended</h3>
            <button className="text-xs text-primary hover-elevate px-2 py-1 rounded-md" data-testid="button-more">
              More →
            </button>
          </div>
          <div className="space-y-1">
            {recommended.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-3 p-2 rounded-md hover-elevate"
                onClick={() => console.log(`Opening ${item.label}`)}
                data-testid={`recommended-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <item.icon className="h-6 w-6 text-muted-foreground" />
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
