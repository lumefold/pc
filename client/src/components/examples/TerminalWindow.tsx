import TerminalWindow from '../TerminalWindow';

export default function TerminalWindowExample() {
  return (
    <div className="relative h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <TerminalWindow onClose={() => console.log('Terminal closed')} />
    </div>
  );
}
