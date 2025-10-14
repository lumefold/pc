import { useState } from 'react';
import QuickSettings from '../QuickSettings';
import { Settings } from 'lucide-react';

export default function QuickSettingsExample() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="absolute bottom-4 right-4 px-4 py-2 bg-card/70 backdrop-blur-xl rounded-md flex items-center gap-2"
      >
        <Settings className="h-4 w-4" />
        Toggle Settings
      </button>
      <QuickSettings isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
