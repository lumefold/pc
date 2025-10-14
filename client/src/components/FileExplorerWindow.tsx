import Window from "./Window";
import { Folder, File, ChevronRight, Home, Star, Clock, FileText, FileCode, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

interface FileExplorerWindowProps {
  onClose?: () => void;
}

const sidebarItems = [
  { icon: Home, label: "Home", active: false },
  { icon: Star, label: "Favorites", active: false },
  { icon: Clock, label: "Recent", active: true },
];

const folders = [
  { icon: Folder, name: "Projects", items: 12, modified: "Today" },
  { icon: Folder, name: "Documents", items: 24, modified: "Yesterday" },
  { icon: Folder, name: "Pictures", items: 156, modified: "Last week" },
];

const files = [
  { icon: FileText, name: "Resume.pdf", size: "234 KB", modified: "2 days ago", type: "PDF" },
  { icon: FileCode, name: "portfolio.tsx", size: "12 KB", modified: "Today", type: "TypeScript" },
  { icon: ImageIcon, name: "cover.jpg", size: "1.2 MB", modified: "3 days ago", type: "Image" },
  { icon: FileText, name: "README.md", size: "4 KB", modified: "Today", type: "Markdown" },
];

export default function FileExplorerWindow({ onClose }: FileExplorerWindowProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <Window 
      title="File Explorer" 
      icon={Folder}
      defaultPosition={{ x: 120, y: 100 }}
      defaultSize={{ width: 900, height: 600 }}
      onClose={onClose}
    >
      <div className="flex h-full">
        <div className="w-48 border-r border-border p-2">
          <div className="space-y-1">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover-elevate ${
                  item.active ? 'bg-accent' : ''
                }`}
                data-testid={`sidebar-${item.label.toLowerCase()}`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="border-b border-border px-4 py-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Home className="h-3.5 w-3.5" />
              <ChevronRight className="h-3.5 w-3.5" />
              <span>Recent</span>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Folders</h3>
              <div className="space-y-1">
                {folders.map((folder, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedItem(folder.name)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md hover-elevate ${
                      selectedItem === folder.name ? 'bg-accent' : ''
                    }`}
                    data-testid={`folder-${folder.name.toLowerCase()}`}
                  >
                    <folder.icon className="h-5 w-5 text-yellow-500" />
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium">{folder.name}</p>
                      <p className="text-xs text-muted-foreground">{folder.items} items • {folder.modified}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Files</h3>
              <div className="space-y-1">
                {files.map((file, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedItem(file.name)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md hover-elevate ${
                      selectedItem === file.name ? 'bg-accent' : ''
                    }`}
                    data-testid={`file-${file.name.toLowerCase().replace(/\./g, '-')}`}
                  >
                    <file.icon className="h-5 w-5 text-primary" />
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.type} • {file.size} • {file.modified}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}
