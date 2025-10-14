import { useState } from 'react';
import StartMenu from '../StartMenu';

export default function StartMenuExample() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-card/70 backdrop-blur-xl rounded-md"
      >
        Toggle Start Menu
      </button>
      <StartMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
