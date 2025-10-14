import { useWindowStore } from "@/stores/windowStore";
import { Plus, X, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VirtualDesktopsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VirtualDesktops({ isOpen, onClose }: VirtualDesktopsProps) {
  const { desktops, currentDesktopId, windows, createDesktop, deleteDesktop, switchDesktop, moveWindowToDesktop } = useWindowStore();

  const handleSwitchDesktop = (desktopId: string) => {
    switchDesktop(desktopId);
    onClose();
  };

  const handleCreateDesktop = () => {
    createDesktop(`Desktop ${desktops.length + 1}`);
  };

  const handleDeleteDesktop = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (desktops.length > 1) {
      deleteDesktop(id);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-md z-50" 
        onClick={onClose}
        data-testid="virtual-desktops-backdrop"
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-8 pointer-events-none"
        data-testid="virtual-desktops"
      >
        <div className="pointer-events-auto bg-card/70 backdrop-blur-3xl border border-card-border rounded-lg shadow-2xl p-8 max-w-6xl w-full">
          <h2 className="text-2xl font-semibold mb-6">Virtual Desktops</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {desktops.map((desktop) => {
              const desktopWindows = windows.filter(w => w.desktopId === desktop.id && !w.isMinimized);
              const isActive = desktop.id === currentDesktopId;
              
              return (
                <motion.button
                  key={desktop.id}
                  onClick={() => handleSwitchDesktop(desktop.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative aspect-video rounded-md border-2 p-4 transition-all overflow-hidden group ${
                    isActive 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover-elevate'
                  }`}
                  data-testid={`desktop-${desktop.id}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20" />
                  
                  <div className="relative h-full flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Monitor className="h-4 w-4" />
                        <span className="text-sm font-medium">{desktop.name}</span>
                      </div>
                      {desktops.length > 1 && (
                        <button
                          onClick={(e) => handleDeleteDesktop(desktop.id, e)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover-elevate"
                          data-testid={`delete-desktop-${desktop.id}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                    
                    <div className="flex-1 flex flex-col gap-1">
                      {desktopWindows.slice(0, 3).map((window) => (
                        <div
                          key={window.id}
                          className="text-xs px-2 py-1 rounded bg-card/50 border border-border truncate"
                        >
                          {window.title}
                        </div>
                      ))}
                      {desktopWindows.length > 3 && (
                        <div className="text-xs text-muted-foreground">
                          +{desktopWindows.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
            
            <motion.button
              onClick={handleCreateDesktop}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="aspect-video rounded-md border-2 border-dashed border-border hover-elevate flex items-center justify-center gap-2"
              data-testid="button-create-desktop"
            >
              <Plus className="h-5 w-5" />
              <span className="text-sm font-medium">New Desktop</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
