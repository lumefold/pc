import WindowControls from '../WindowControls';

export default function WindowControlsExample() {
  return (
    <div className="p-8 bg-card">
      <WindowControls
        onMinimize={() => console.log('Minimize clicked')}
        onMaximize={() => console.log('Maximize clicked')}
        onClose={() => console.log('Close clicked')}
      />
    </div>
  );
}
