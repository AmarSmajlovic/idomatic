"use client";

import { Highlight, themes } from "prism-react-renderer";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = "tsx",
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  return (
    <Highlight
      theme={themes.shadesOfPurple}
      code={code.trim()}
      language={language}
    >
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={style}
          className={cn(
            "rounded-md p-4 overflow-x-auto text-sm font-mono leading-relaxed",
            className
          )}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })} className="flex space-x-3">
              {showLineNumbers && (
                <span className="text-gray-400 select-none w-6 text-right">
                  {i + 1}
                </span>
              )}
              <span className="flex-1">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
