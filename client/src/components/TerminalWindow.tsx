import Window from "./Window";
import { Terminal as TerminalIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface TerminalWindowProps {
  onClose?: () => void;
}

const initialOutput = [
  "Windows PowerShell",
  "Copyright (C) Microsoft Corporation. All rights reserved.",
  "",
  "Try the new cross-platform PowerShell https://aka.ms/pscore6",
  "",
  "PS C:\\Users\\Abdyu> ",
];

export default function TerminalWindow({ onClose }: TerminalWindowProps) {
  const [output, setOutput] = useState<string[]>(initialOutput);
  const [input, setInput] = useState("");
  const outputEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  const handleCommand = (cmd: string) => {
    const newOutput = [...output, `PS C:\\Users\\Abdyu> ${cmd}`];
    
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === "help") {
      newOutput.push(
        "",
        "Available commands:",
        "  help     - Show this help message",
        "  clear    - Clear the terminal",
        "  whoami   - Display current user",
        "  date     - Display current date",
        "  echo     - Echo a message",
        ""
      );
    } else if (trimmedCmd === "clear") {
      setOutput(["PS C:\\Users\\Abdyu> "]);
      setInput("");
      return;
    } else if (trimmedCmd === "whoami") {
      newOutput.push("Abdyu - Full-Stack Developer", "");
    } else if (trimmedCmd === "date") {
      newOutput.push(new Date().toLocaleString(), "");
    } else if (trimmedCmd.startsWith("echo ")) {
      newOutput.push(cmd.substring(5), "");
    } else if (trimmedCmd === "") {
      newOutput.push("");
    } else {
      newOutput.push(`'${cmd}' is not recognized as a command. Type 'help' for available commands.`, "");
    }
    
    newOutput.push("PS C:\\Users\\Abdyu> ");
    setOutput(newOutput);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <Window 
      title="Terminal" 
      icon={TerminalIcon}
      defaultPosition={{ x: 220, y: 140 }}
      defaultSize={{ width: 800, height: 500 }}
      onClose={onClose}
    >
      <div className="h-full bg-[#012456] dark:bg-[#0c0c0c] p-4 font-mono text-sm text-white overflow-auto">
        <div>
          {output.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap">
              {line}
            </div>
          ))}
          <div className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none border-none text-white caret-white"
              autoFocus
              data-testid="input-terminal"
            />
          </div>
          <div ref={outputEndRef} />
        </div>
      </div>
    </Window>
  );
}
