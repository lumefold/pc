import { motion, AnimatePresence } from "framer-motion";
import { useWindowStore } from "@/stores/windowStore";
import { LucideIcon } from "lucide-react";

interface AltTabSwitcherProps {
  isOpen: boolean;
  selectedIndex: number;
}

export default function AltTabSwitcher({ isOpen, selectedIndex }: AltTabSwitcherProps) {
  const { windows, currentDesktopId } = useWindowStore();
  const activeWindows = windows.filter(w => w.desktopId === currentDesktopId && !w.isMinimized);

  if (!isOpen || activeWindows.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm"
        data-testid="alt-tab-switcher"
      >
        <div className="bg-card/70 backdrop-blur-3xl border border-card-border rounded-lg shadow-2xl p-6">
          <div className="flex gap-4">
            {activeWindows.map((window, index) => {
              const Icon = window.icon as LucideIcon;
              const isSelected = index === selectedIndex % activeWindows.length;
              
              return (
                <motion.div
                  key={window.id}
                  animate={{ scale: isSelected ? 1.1 : 1 }}
                  className={`w-32 h-24 rounded-md border-2 p-3 flex flex-col items-center justify-center gap-2 transition-colors ${
                    isSelected 
                      ? 'border-primary bg-primary/20' 
                      : 'border-border bg-card/30'
                  }`}
                  data-testid={`alt-tab-item-${window.id}`}
                >
                  {Icon && <Icon className="h-8 w-8" />}
                  <span className="text-xs text-center truncate w-full">{window.title}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
