import ResumeWindow from '../ResumeWindow';

export default function ResumeWindowExample() {
  return (
    <div className="relative h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <ResumeWindow onClose={() => console.log('Resume window closed')} />
    </div>
  );
}
