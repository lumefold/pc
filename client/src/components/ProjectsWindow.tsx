import Window from "./Window";
import { Code, Github, ExternalLink, Star, GitFork } from "lucide-react";

interface ProjectsWindowProps {
  onClose?: () => void;
}

const projects = [
  {
    name: "portfolio-windows11",
    description: "Windows 11 inspired portfolio website built with React and TypeScript",
    stars: 124,
    forks: 23,
    language: "TypeScript",
    color: "bg-blue-500"
  },
  {
    name: "task-manager-pro",
    description: "Advanced task management system with real-time collaboration",
    stars: 89,
    forks: 15,
    language: "JavaScript",
    color: "bg-yellow-500"
  },
  {
    name: "weather-dashboard",
    description: "Beautiful weather visualization dashboard with charts and forecasts",
    stars: 156,
    forks: 31,
    language: "TypeScript",
    color: "bg-blue-500"
  },
  {
    name: "api-gateway",
    description: "Microservices API gateway with authentication and rate limiting",
    stars: 203,
    forks: 48,
    language: "Go",
    color: "bg-cyan-500"
  },
  {
    name: "ui-components",
    description: "Reusable React component library with TypeScript support",
    stars: 312,
    forks: 67,
    language: "TypeScript",
    color: "bg-blue-500"
  },
  {
    name: "devops-toolkit",
    description: "Collection of DevOps automation scripts and tools",
    stars: 78,
    forks: 19,
    language: "Python",
    color: "bg-green-600"
  }
];

export default function ProjectsWindow({ onClose }: ProjectsWindowProps) {
  return (
    <Window 
      title="Recent Projects" 
      icon={Code}
      defaultPosition={{ x: 180, y: 120 }}
      defaultSize={{ width: 850, height: 600 }}
      onClose={onClose}
    >
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">GitHub Projects</h1>
          <p className="text-muted-foreground">Open source projects and contributions</p>
        </div>

        <div className="space-y-3">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="border border-border rounded-md p-4 hover-elevate"
              data-testid={`project-${project.name}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Github className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold text-primary">{project.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <div className={`h-3 w-3 rounded-full ${project.color}`} />
                      <span>{project.language}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" />
                      <span>{project.stars}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-3.5 w-3.5" />
                      <span>{project.forks}</span>
                    </div>
                  </div>
                </div>
                <button 
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-input rounded-md text-sm hover-elevate"
                  onClick={() => console.log(`Viewing ${project.name}`)}
                  data-testid={`button-view-${project.name}`}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Window>
  );
}
