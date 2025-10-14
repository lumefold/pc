import { LucideIcon } from "lucide-react";

interface DesktopIconProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  onDoubleClick?: () => void;
}

export default function DesktopIcon({ icon: Icon, label, onClick, onDoubleClick }: DesktopIconProps) {
  return (
    <button
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className="flex flex-col items-center gap-1 p-2 rounded-md w-20 hover-elevate group"
      data-testid={`icon-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="h-12 w-12 flex items-center justify-center">
        <Icon className="h-10 w-10 text-white drop-shadow-lg" />
      </div>
      <span className="text-[11px] text-white drop-shadow-md text-center leading-tight max-w-full truncate px-1">
        {label}
      </span>
    </button>
  );
}
