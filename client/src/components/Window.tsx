import { useState } from "react";
import WindowControls from "./WindowControls";
import { LucideIcon } from "lucide-react";

interface WindowProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  onClose?: () => void;
}

export default function Window({ 
  title, 
  icon: Icon, 
  children, 
  defaultPosition = { x: 100, y: 100 },
  defaultSize = { width: 800, height: 600 },
  onClose
}: WindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position] = useState(defaultPosition);
  const [size] = useState(defaultSize);

  const handleMinimize = () => {
    console.log('Window minimized');
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    console.log('Window maximized/restored');
  };

  const handleClose = () => {
    console.log('Window closed');
    onClose?.();
  };

  const windowStyle = isMaximized 
    ? { top: 0, left: 0, right: 0, bottom: '4rem', width: 'auto', height: 'auto' }
    : { top: position.y, left: position.x, width: size.width, height: size.height };

  return (
    <div
      className="absolute bg-card/70 backdrop-blur-2xl border border-card-border rounded-md shadow-2xl overflow-hidden"
      style={windowStyle}
      data-testid="window"
    >
      <div className="h-8 bg-card/50 backdrop-blur-xl border-b border-card-border px-3 flex items-center justify-between cursor-move" data-testid="window-titlebar">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
          <span className="text-xs font-semibold">{title}</span>
        </div>
        <WindowControls 
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
          onClose={handleClose}
        />
      </div>
      <div className="h-[calc(100%-2rem)] overflow-auto">
        {children}
      </div>
    </div>
  );
}
