import AboutWindow from '../AboutWindow';

export default function AboutWindowExample() {
  return (
    <div className="relative h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <AboutWindow onClose={() => console.log('About window closed')} />
    </div>
  );
}
