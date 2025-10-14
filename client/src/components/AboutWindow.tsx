import Window from "./Window";
import { User, Mail, MapPin, Briefcase, GraduationCap } from "lucide-react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";

interface AboutWindowProps {
  onClose?: () => void;
}

export default function AboutWindow({ onClose }: AboutWindowProps) {
  return (
    <Window 
      title="About" 
      icon={User}
      defaultPosition={{ x: 250, y: 150 }}
      defaultSize={{ width: 700, height: 550 }}
      onClose={onClose}
    >
      <div className="p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="h-24 w-24 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center mb-4">
            <User className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-1">Vova</h1>
          <p className="text-muted-foreground mb-4">Full-Stack Developer & Creative Coder</p>
          
          <div className="flex gap-3">
            <a 
              href="#" 
              className="h-9 w-9 rounded-md border border-input flex items-center justify-center hover-elevate"
              data-testid="link-github"
            >
              <SiGithub className="h-4 w-4" />
            </a>
            <a 
              href="#" 
              className="h-9 w-9 rounded-md border border-input flex items-center justify-center hover-elevate"
              data-testid="link-linkedin"
            >
              <SiLinkedin className="h-4 w-4" />
            </a>
            <a 
              href="#" 
              className="h-9 w-9 rounded-md border border-input flex items-center justify-center hover-elevate"
              data-testid="link-x"
            >
              <SiX className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 rounded-md border border-border">
            <Briefcase className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Currently</p>
              <p className="text-sm text-muted-foreground">Senior Full-Stack Developer at Tech Company Inc.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-md border border-border">
            <GraduationCap className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Education</p>
              <p className="text-sm text-muted-foreground">Bachelor of Science in Computer Science</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-md border border-border">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Location</p>
              <p className="text-sm text-muted-foreground">San Francisco, CA</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-md border border-border">
            <Mail className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Contact</p>
              <a href="mailto:vova@example.com" className="text-sm text-primary hover:underline">
                vova@example.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-md">
          <p className="text-sm text-muted-foreground">
            Passionate about building beautiful and functional web applications. 
            Specialized in React, TypeScript, and Node.js with a focus on creating 
            exceptional user experiences.
          </p>
        </div>
      </div>
    </Window>
  );
}
