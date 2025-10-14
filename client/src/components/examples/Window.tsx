import Window from '../Window';
import { Folder } from 'lucide-react';

export default function WindowExample() {
  return (
    <div className="relative h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <Window title="Example Window" icon={Folder}>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Window Content</h2>
          <p className="text-muted-foreground">This is a draggable, resizable window component.</p>
        </div>
      </Window>
    </div>
  );
}
