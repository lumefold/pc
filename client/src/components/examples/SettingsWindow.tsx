import SettingsWindow from '../SettingsWindow';

export default function SettingsWindowExample() {
  return (
    <div className="relative h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <SettingsWindow onClose={() => console.log('Settings closed')} />
    </div>
  );
}
