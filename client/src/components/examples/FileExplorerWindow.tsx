import FileExplorerWindow from '../FileExplorerWindow';

export default function FileExplorerWindowExample() {
  return (
    <div className="relative h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <FileExplorerWindow onClose={() => console.log('File explorer closed')} />
    </div>
  );
}
