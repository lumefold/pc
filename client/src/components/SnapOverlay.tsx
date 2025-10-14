import { motion, AnimatePresence } from "framer-motion";

interface SnapOverlayProps {
  position: 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'maximize' | null;
}

export default function SnapOverlay({ position }: SnapOverlayProps) {
  if (!position) return null;

  const getSnapStyle = () => {
    const base = "absolute border-4 border-primary/50 bg-primary/20 backdrop-blur-sm";
    
    switch (position) {
      case 'left':
        return `${base} top-0 left-0 bottom-16 w-1/2`;
      case 'right':
        return `${base} top-0 right-0 bottom-16 w-1/2`;
      case 'top-left':
        return `${base} top-0 left-0 w-1/2 h-1/2`;
      case 'top-right':
        return `${base} top-0 right-0 w-1/2 h-1/2`;
      case 'bottom-left':
        return `${base} bottom-16 left-0 w-1/2 h-1/2`;
      case 'bottom-right':
        return `${base} bottom-16 right-0 w-1/2 h-1/2`;
      case 'maximize':
        return `${base} top-0 left-0 right-0 bottom-16`;
      default:
        return base;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        className={getSnapStyle()}
        data-testid={`snap-overlay-${position}`}
      />
    </AnimatePresence>
  );
}
