import { useState } from 'react';
import NotificationCenter from '../NotificationCenter';
import { Bell } from 'lucide-react';

export default function NotificationCenterExample() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="absolute bottom-4 right-4 px-4 py-2 bg-card/70 backdrop-blur-xl rounded-md flex items-center gap-2"
      >
        <Bell className="h-4 w-4" />
        Toggle Notifications
      </button>
      <NotificationCenter isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
