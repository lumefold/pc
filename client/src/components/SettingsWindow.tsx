import Window from "./Window";
import { Settings, Palette, Monitor, Bell, Info } from "lucide-react";
import { useState, useEffect } from "react";

interface SettingsWindowProps {
  onClose?: () => void;
}

type SettingsPage = 'personalization' | 'system' | 'notifications' | 'about';

export default function SettingsWindow({ onClose }: SettingsWindowProps) {
  const [activePage, setActivePage] = useState<SettingsPage>('personalization');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [accentColor, setAccentColor] = useState('#0078d4');
  const [displayScale, setDisplayScale] = useState(100);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleAccentColorChange = (color: string) => {
    setAccentColor(color);
    localStorage.setItem('accentColor', color);
  };

  const sidebarItems = [
    { id: 'personalization' as SettingsPage, icon: Palette, label: 'Personalization' },
    { id: 'system' as SettingsPage, icon: Monitor, label: 'System' },
    { id: 'notifications' as SettingsPage, icon: Bell, label: 'Notifications' },
    { id: 'about' as SettingsPage, icon: Info, label: 'About' },
  ];

  const accentColors = [
    { name: 'Blue', value: '#0078d4' },
    { name: 'Purple', value: '#8764b8' },
    { name: 'Green', value: '#10893e' },
    { name: 'Orange', value: '#ff8c00' },
    { name: 'Red', value: '#e81123' },
  ];

  return (
    <Window 
      title="Settings" 
      icon={Settings}
      defaultPosition={{ x: 200, y: 80 }}
      defaultSize={{ width: 900, height: 650 }}
      onClose={onClose}
    >
      <div className="flex h-full">
        <div className="w-56 border-r border-border p-3">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm hover-elevate ${
                  activePage === item.id ? 'bg-accent' : ''
                }`}
                data-testid={`settings-nav-${item.id}`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {activePage === 'personalization' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Personalization</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Customize the appearance of your desktop
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-3">Theme</h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleThemeChange('light')}
                    className={`flex-1 p-4 rounded-md border-2 hover-elevate ${
                      theme === 'light' ? 'border-primary' : 'border-border'
                    }`}
                    data-testid="theme-light"
                  >
                    <div className="w-full h-20 bg-white border border-gray-300 rounded mb-2" />
                    <span className="text-sm font-medium">Light</span>
                  </button>
                  <button
                    onClick={() => handleThemeChange('dark')}
                    className={`flex-1 p-4 rounded-md border-2 hover-elevate ${
                      theme === 'dark' ? 'border-primary' : 'border-border'
                    }`}
                    data-testid="theme-dark"
                  >
                    <div className="w-full h-20 bg-gray-900 border border-gray-700 rounded mb-2" />
                    <span className="text-sm font-medium">Dark</span>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Accent Color</h3>
                <div className="flex gap-2">
                  {accentColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => handleAccentColorChange(color.value)}
                      className={`w-12 h-12 rounded-md border-2 ${
                        accentColor === color.value ? 'border-foreground' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                      data-testid={`accent-${color.name.toLowerCase()}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activePage === 'system' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">System</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Display, sound, and performance settings
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-3">Display Scaling</h3>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="75"
                    max="150"
                    step="25"
                    value={displayScale}
                    onChange={(e) => setDisplayScale(Number(e.target.value))}
                    className="flex-1 h-1.5 bg-muted rounded-full appearance-none cursor-pointer"
                    data-testid="slider-display-scale"
                  />
                  <span className="text-sm font-medium w-12">{displayScale}%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Adjust the size of text, apps, and other items
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-3">Sound Volume</h3>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="50"
                    className="flex-1 h-1.5 bg-muted rounded-full appearance-none cursor-pointer"
                    data-testid="slider-volume"
                  />
                  <span className="text-sm font-medium w-12">50%</span>
                </div>
              </div>
            </div>
          )}

          {activePage === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Manage your notification preferences
                </p>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-md">
                <div>
                  <h3 className="font-medium">Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Show notifications from apps and system
                  </p>
                </div>
                <button
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    notificationsEnabled ? 'bg-primary' : 'bg-muted'
                  }`}
                  data-testid="toggle-notifications"
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {activePage === 'about' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">About</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">System Name</h3>
                  <p className="text-lg">Windows 11 Clone</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Version</h3>
                  <p className="text-lg">1.0.0</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Developer</h3>
                  <p className="text-lg">Built with React, TypeScript, and Tailwind CSS</p>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    This is a web-based recreation of the Windows 11 interface for educational and demonstration purposes.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Window>
  );
}
