import { useEffect, useRef } from "react";
import { RefreshCw, Settings, Paintbrush, Monitor } from "lucide-react";

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
}

const menuItems = [
  { icon: RefreshCw, label: "Refresh", shortcut: "" },
  { type: "separator" },
  { icon: Settings, label: "Personalize", shortcut: "" },
  { icon: Paintbrush, label: "Change theme", shortcut: "" },
  { icon: Monitor, label: "Display settings", shortcut: "" },
];

export default function ContextMenu({ x, y, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="fixed z-50 min-w-[200px] bg-popover/70 backdrop-blur-2xl border border-popover-border rounded-md shadow-xl py-1 animate-slide-up"
      style={{ left: x, top: y }}
      data-testid="context-menu"
    >
      {menuItems.map((item, index) =>
        item.type === "separator" ? (
          <div key={index} className="h-px bg-border my-1" />
        ) : (
          <button
            key={index}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm hover-elevate"
            onClick={() => {
              console.log(`Context menu: ${item.label}`);
              onClose();
            }}
            data-testid={`context-menu-${item.label?.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {item.icon && <item.icon className="h-4 w-4" />}
            <span className="flex-1 text-left">{item.label}</span>
            {item.shortcut && <span className="text-xs text-muted-foreground">{item.shortcut}</span>}
          </button>
        )
      )}
    </div>
  );
}
