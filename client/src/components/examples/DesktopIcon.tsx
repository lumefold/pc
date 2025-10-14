import DesktopIcon from '../DesktopIcon';
import { Folder, FileText, Trash2 } from 'lucide-react';

export default function DesktopIconExample() {
  return (
    <div className="p-8 bg-gradient-to-br from-blue-500 to-purple-600 min-h-[400px]">
      <div className="grid grid-cols-6 gap-4">
        <DesktopIcon 
          icon={Folder} 
          label="My Portfolio" 
          onDoubleClick={() => console.log('Opening Portfolio')}
        />
        <DesktopIcon 
          icon={FileText} 
          label="Resume" 
          onDoubleClick={() => console.log('Opening Resume')}
        />
        <DesktopIcon 
          icon={Trash2} 
          label="Recycle Bin" 
          onDoubleClick={() => console.log('Opening Recycle Bin')}
        />
      </div>
    </div>
  );
}
