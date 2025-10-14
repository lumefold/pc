import ProjectsWindow from '../ProjectsWindow';

export default function ProjectsWindowExample() {
  return (
    <div className="relative h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <ProjectsWindow onClose={() => console.log('Projects window closed')} />
    </div>
  );
}
