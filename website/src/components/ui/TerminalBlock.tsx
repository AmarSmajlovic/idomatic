"use client";

import { Highlight, themes } from "prism-react-renderer";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TerminalBlockProps {
  command: string;
  className?: string;
}

export function TerminalBlock({ command, className }: TerminalBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "relative bg-[#1e1e2f] text-white rounded-md overflow-hidden text-sm font-mono ",
        className
      )}
    >
      <Highlight
        code={command.trim()}
        language="bash"
        theme={themes.shadesOfPurple}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre className="p-4 overflow-x-auto " style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>

      <Button
        size="sm"
        variant="ghost"
        onClick={handleCopy}
        className="absolute top-2 right-2 text-white hover:bg-white/10"
      >
        {copied ? (
          <ClipboardCheck className="w-4 h-4" />
        ) : (
          <Clipboard className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}
