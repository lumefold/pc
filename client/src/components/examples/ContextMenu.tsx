import { useState } from 'react';
import ContextMenu from '../ContextMenu';

export default function ContextMenuExample() {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>({ x: 200, y: 200 });

  return (
    <div 
      className="relative h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
      onContextMenu={(e) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
      }}
    >
      <p className="text-white text-lg">Right-click anywhere to open context menu</p>
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
}
