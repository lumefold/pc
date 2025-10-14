import { Minus, Square, X } from "lucide-react";

interface WindowControlsProps {
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
}

export default function WindowControls({ onMinimize, onMaximize, onClose }: WindowControlsProps) {
  return (
    <div className="flex items-center gap-2" data-testid="window-controls">
      <button
        onClick={onMinimize}
        className="h-8 w-8 rounded-md flex items-center justify-center hover-elevate"
        data-testid="button-minimize"
        aria-label="Minimize"
      >
        <Minus className="h-3 w-3" />
      </button>
      <button
        onClick={onMaximize}
        className="h-8 w-8 rounded-md flex items-center justify-center hover-elevate"
        data-testid="button-maximize"
        aria-label="Maximize"
      >
        <Square className="h-3 w-3" />
      </button>
      <button
        onClick={onClose}
        className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"
        data-testid="button-close"
        aria-label="Close"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
