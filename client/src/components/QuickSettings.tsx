import { Wifi, Volume2, Battery, Sun, Moon, Monitor, Bluetooth, Plane } from "lucide-react";
import { useState } from "react";

interface QuickSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickSettings({ isOpen, onClose }: QuickSettingsProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [brightness, setBrightness] = useState(75);
  const [volume, setVolume] = useState(50);

  if (!isOpen) return null;

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const quickActions = [
    { icon: Wifi, label: "WiFi", active: true },
    { icon: Bluetooth, label: "Bluetooth", active: false },
    { icon: Plane, label: "Airplane", active: false },
    { icon: Battery, label: "Battery", active: true },
  ];

  return (
    <>
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
        data-testid="quick-settings-backdrop"
      />
      <div 
        className="fixed bottom-20 right-4 w-80 bg-card/70 backdrop-blur-3xl border border-card-border rounded-lg shadow-2xl z-50 p-4 animate-slide-up"
        data-testid="quick-settings"
      >
        <div className="grid grid-cols-2 gap-2 mb-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className={`p-3 rounded-md border transition-colors ${
                action.active 
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : 'border-input hover-elevate'
              }`}
              onClick={() => console.log(`Toggle ${action.label}`)}
              data-testid={`quick-action-${action.label.toLowerCase()}`}
            >
              <action.icon className="h-5 w-5 mb-1" />
              <p className="text-xs font-medium">{action.label}</p>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <span className="text-sm font-medium">Brightness</span>
              </div>
              <span className="text-xs text-muted-foreground">{brightness}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer"
              data-testid="slider-brightness"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                <span className="text-sm font-medium">Volume</span>
              </div>
              <span className="text-xs text-muted-foreground">{volume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer"
              data-testid="slider-volume"
            />
          </div>

          <button
            onClick={toggleTheme}
            className="w-full p-3 border border-input rounded-md hover-elevate flex items-center justify-between"
            data-testid="button-theme-toggle"
          >
            <div className="flex items-center gap-2">
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <span className="text-sm font-medium">Theme</span>
            </div>
            <span className="text-xs text-muted-foreground capitalize">{theme}</span>
          </button>

          <button
            className="w-full p-3 border border-input rounded-md hover-elevate flex items-center gap-2"
            onClick={() => console.log('Display settings')}
            data-testid="button-display-settings"
          >
            <Monitor className="h-4 w-4" />
            <span className="text-sm font-medium">Display Settings</span>
          </button>
        </div>
      </div>
    </>
  );
}
