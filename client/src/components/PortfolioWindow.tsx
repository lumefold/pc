import Window from "./Window";
import { Folder, ExternalLink, Github } from "lucide-react";
import { Card } from "./ui/card";

interface PortfolioWindowProps {
  onClose?: () => void;
}

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=300&fit=crop"
  },
  {
    title: "Task Management App",
    description: "Collaborative task management tool with real-time updates",
    tech: ["Next.js", "TypeScript", "Prisma", "WebSocket"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop"
  },
  {
    title: "Weather Dashboard",
    description: "Beautiful weather forecast application with data visualization",
    tech: ["React", "D3.js", "OpenWeather API"],
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=400&h=300&fit=crop"
  },
];

export default function PortfolioWindow({ onClose }: PortfolioWindowProps) {
  return (
    <Window 
      title="Portfolio" 
      icon={Folder}
      defaultPosition={{ x: 150, y: 80 }}
      defaultSize={{ width: 900, height: 650 }}
      onClose={onClose}
    >
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">My Projects</h1>
          <p className="text-muted-foreground">A collection of my recent work and side projects</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover-elevate" data-testid={`project-${index}`}>
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 bg-muted text-xs rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm hover-elevate" data-testid={`button-view-${index}`}>
                    <ExternalLink className="h-3.5 w-3.5" />
                    View
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 border border-input rounded-md text-sm hover-elevate" data-testid={`button-github-${index}`}>
                    <Github className="h-3.5 w-3.5" />
                    Code
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Window>
  );
}
