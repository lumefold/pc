import { useState, useEffect } from "react";
import wallpaperImage from "@assets/stock_images/windows_11_style_abs_291635e5.jpg";

interface DesktopProps {
  children?: React.ReactNode;
}

export default function Desktop({ children }: DesktopProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${wallpaperImage})` }}
      >
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
      </div>
      
      <div className="relative z-10 h-full w-full">
        {children}
      </div>

      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="fixed top-4 right-4 z-50 px-3 py-1.5 bg-card/70 backdrop-blur-xl border border-card-border rounded-md text-xs hover-elevate"
        data-testid="button-theme-toggle"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </div>
  );
}
