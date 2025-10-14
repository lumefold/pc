import { Wifi, Volume2, Battery } from "lucide-react";
import { useState, useEffect } from "react";

interface SystemTrayProps {
  onQuickSettingsClick?: () => void;
}

export default function SystemTray({ onQuickSettingsClick }: SystemTrayProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'numeric', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="flex items-center gap-1 h-full px-2" data-testid="system-tray">
      <button 
        className="h-8 px-2 rounded-md hover-elevate flex items-center gap-1.5" 
        onClick={onQuickSettingsClick}
        data-testid="button-quick-settings"
      >
        <Wifi className="h-3.5 w-3.5" />
        <Volume2 className="h-3.5 w-3.5" />
        <Battery className="h-3.5 w-3.5" />
      </button>
      <button className="h-8 px-3 rounded-md hover-elevate flex flex-col items-end justify-center" data-testid="button-datetime">
        <span className="text-[11px] font-medium leading-none">{formatTime(currentTime)}</span>
        <span className="text-[11px] text-muted-foreground leading-none">{formatDate(currentTime)}</span>
      </button>
    </div>
  );
}
