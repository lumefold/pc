import { motion, AnimatePresence } from "framer-motion";
import { Cloud, Newspaper, Calendar, StickyNote, X } from "lucide-react";

interface WidgetsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const widgets = [
  {
    id: 'weather',
    icon: Cloud,
    title: 'Weather',
    content: (
      <div>
        <div className="text-3xl font-bold">72°F</div>
        <div className="text-sm text-muted-foreground">Partly Cloudy</div>
        <div className="mt-2 text-xs">San Francisco, CA</div>
      </div>
    ),
  },
  {
    id: 'news',
    icon: Newspaper,
    title: 'News',
    content: (
      <div className="space-y-2">
        <div className="text-sm">Latest headlines from around the world</div>
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">• Breaking: Tech innovation continues</div>
          <div className="text-xs text-muted-foreground">• Market update: Stocks rise</div>
          <div className="text-xs text-muted-foreground">• Sports: Championship finals</div>
        </div>
      </div>
    ),
  },
  {
    id: 'calendar',
    icon: Calendar,
    title: 'Calendar',
    content: (
      <div>
        <div className="text-sm font-medium mb-2">Today's Schedule</div>
        <div className="space-y-1">
          <div className="text-xs">
            <span className="text-muted-foreground">10:00 AM</span> - Team Meeting
          </div>
          <div className="text-xs">
            <span className="text-muted-foreground">2:00 PM</span> - Project Review
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'notes',
    icon: StickyNote,
    title: 'Quick Notes',
    content: (
      <textarea
        className="w-full h-24 bg-transparent border border-border rounded-md p-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary"
        placeholder="Type your notes here..."
        data-testid="textarea-notes"
      />
    ),
  },
];

export default function WidgetsPanel({ isOpen, onClose }: WidgetsPanelProps) {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
        data-testid="widgets-backdrop"
      />
      <AnimatePresence>
        <motion.div
          initial={{ x: -400 }}
          animate={{ x: 0 }}
          exit={{ x: -400 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed left-0 top-0 bottom-16 w-96 bg-card/70 backdrop-blur-3xl border-r border-card-border shadow-2xl z-50 p-6 overflow-auto"
          data-testid="widgets-panel"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Widgets</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover-elevate"
              data-testid="button-close-widgets"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            {widgets.map((widget) => (
              <div
                key={widget.id}
                className="bg-card/50 border border-border rounded-md p-4 hover-elevate"
                data-testid={`widget-${widget.id}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <widget.icon className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">{widget.title}</h3>
                </div>
                {widget.content}
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
