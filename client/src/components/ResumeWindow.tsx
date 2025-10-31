import Window from "./Window";
import { FileText, Download, Mail, Linkedin, Github } from "lucide-react";

interface ResumeWindowProps {
  onClose?: () => void;
}

export default function ResumeWindow({ onClose }: ResumeWindowProps) {
  return (
    <Window 
      title="Resume" 
      icon={FileText}
      defaultPosition={{ x: 200, y: 100 }}
      defaultSize={{ width: 800, height: 600 }}
      onClose={onClose}
    >
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Abdyu</h1>
            <p className="text-lg text-muted-foreground mb-3">Full-Stack Developer</p>
            <div className="flex items-center gap-4 text-sm">
              <a href="mailto:hello@lumefold.com" className="flex items-center gap-1.5 text-primary hover-elevate px-2 py-1 rounded-md" data-testid="link-email">
                <Mail className="h-4 w-4" />
                hello@lumefold.com
              </a>
              <a href="#" className="flex items-center gap-1.5 text-primary hover-elevate px-2 py-1 rounded-md" data-testid="link-linkedin">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a href="#" className="flex items-center gap-1.5 text-primary hover-elevate px-2 py-1 rounded-md" data-testid="link-github">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover-elevate" data-testid="button-download">
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3 border-b border-border pb-2">Experience</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Senior Full-Stack Developer</h3>
                <p className="text-sm text-muted-foreground">Tech Company Inc. • 2021 - Present</p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside">
                  <li>Led development of microservices architecture serving 1M+ users</li>
                  <li>Implemented CI/CD pipelines reducing deployment time by 60%</li>
                  <li>Mentored junior developers and conducted code reviews</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Full-Stack Developer</h3>
                <p className="text-sm text-muted-foreground">Startup Labs • 2019 - 2021</p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside">
                  <li>Built responsive web applications with React and Node.js</li>
                  <li>Designed and implemented RESTful APIs and GraphQL endpoints</li>
                  <li>Collaborated with design team to create pixel-perfect UIs</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 border-b border-border pb-2">Skills</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Frontend</h3>
                <div className="flex flex-wrap gap-1.5">
                  {["React", "Next.js", "TypeScript", "Tailwind CSS"].map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-muted text-xs rounded-md">{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Backend</h3>
                <div className="flex flex-wrap gap-1.5">
                  {["Node.js", "PostgreSQL", "MongoDB", "Docker"].map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-muted text-xs rounded-md">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 border-b border-border pb-2">Education</h2>
            <div>
              <h3 className="font-semibold">Bachelor of Science in Computer Science</h3>
              <p className="text-sm text-muted-foreground">University Name • 2015 - 2019</p>
            </div>
          </section>
        </div>
      </div>
    </Window>
  );
}
