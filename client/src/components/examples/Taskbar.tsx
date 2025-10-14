import Taskbar from '../Taskbar';

export default function TaskbarExample() {
  return (
    <div className="relative h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <Taskbar onAppClick={(app) => console.log(`App clicked: ${app}`)} />
    </div>
  );
}
