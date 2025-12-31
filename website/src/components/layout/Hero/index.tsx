"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Play, Check, Settings, ChevronDown, RotateCcw } from "lucide-react";
import InteractiveGrid from "@/components/ui/InteractiveGrid";
import {
  SiTypescript,
  SiHtml5,
  SiJavascript,
  SiVuedotjs,
  SiAngular
} from "react-icons/si";

type FileType = "tsx" | "html" | "js" | "vue" | "angular";

interface CodeExample {
  before: string;
  after: (config: ConfigOptions) => string;
  language: string;
}

interface ConfigOptions {
  attributeName: string;
  prefix: string;
  excludeTags: string[];
  includeExtensions: string[];
}

const defaultConfig: ConfigOptions = {
  attributeName: "id",
  prefix: "auto-id-",
  excludeTags: ["html", "head"],
  includeExtensions: ["html", "vue"],
};

const codeExamples: Record<FileType, CodeExample> = {
  tsx: {
    before: `function Example() {
  return (
    <div>
      <p>Click the button below</p>
      <button>Click me</button>
    </div>
  );
}`,
    after: (config) => `function Example() {
  return (
    <div ${config.attributeName}="${config.prefix}container">
      <p ${config.attributeName}="${config.prefix}text">Click the button below</p>
      <button ${config.attributeName}="${config.prefix}btn">Click me</button>
    </div>
  );
}`,
    language: "tsx",
  },
  html: {
    before: `<div class="card">
  <h2>Welcome</h2>
  <p>This is a card component</p>
  <button class="btn">Learn More</button>
</div>`,
    after: (config) => `<div ${config.attributeName}="${config.prefix}card" class="card">
  <h2 ${config.attributeName}="${config.prefix}title">Welcome</h2>
  <p ${config.attributeName}="${config.prefix}desc">This is a card component</p>
  <button ${config.attributeName}="${config.prefix}btn" class="btn">Learn More</button>
</div>`,
    language: "html",
  },
  js: {
    before: `const App = () => {
  return createElement('div', null,
    createElement('input', { type: 'text' }),
    createElement('button', null, 'Submit')
  );
};`,
    after: (config) => `const App = () => {
  return createElement('div', { ${config.attributeName}: '${config.prefix}root' },
    createElement('input', { ${config.attributeName}: '${config.prefix}input', type: 'text' }),
    createElement('button', { ${config.attributeName}: '${config.prefix}submit' }, 'Submit')
  );
};`,
    language: "javascript",
  },
  vue: {
    before: `<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <input v-model="search" placeholder="Search...">
    <button @click="submit">Search</button>
  </div>
</template>`,
    after: (config) => `<template>
  <div ${config.attributeName}="${config.prefix}container" class="container">
    <h1 ${config.attributeName}="${config.prefix}title">{{ title }}</h1>
    <input ${config.attributeName}="${config.prefix}search" v-model="search" placeholder="Search...">
    <button ${config.attributeName}="${config.prefix}btn" @click="submit">Search</button>
  </div>
</template>`,
    language: "html",
  },
  angular: {
    before: `<div class="wrapper">
  <h2>{{ heading }}</h2>
  <input [(ngModel)]="name" placeholder="Enter name">
  <button (click)="save()">Save</button>
</div>`,
    after: (config) => `<div ${config.attributeName}="${config.prefix}wrapper" class="wrapper">
  <h2 ${config.attributeName}="${config.prefix}heading">{{ heading }}</h2>
  <input ${config.attributeName}="${config.prefix}input" [(ngModel)]="name" placeholder="Enter name">
  <button ${config.attributeName}="${config.prefix}save" (click)="save()">Save</button>
</div>`,
    language: "html",
  },
};

export default function Hero() {
  const [selectedFile, setSelectedFile] = useState<FileType>("tsx");
  const [isRunning, setIsRunning] = useState(false);
  const [showAfter, setShowAfter] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [fileDropdownOpen, setFileDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [config, setConfig] = useState<ConfigOptions>(defaultConfig);
  const [npmVersion, setNpmVersion] = useState<string>("1.0.0");

  useEffect(() => {
    setMounted(true);

    // Fetch NPM version
    fetch('https://registry.npmjs.org/@idomatic/core/latest')
      .then(res => res.json())
      .then(data => {
        if (data.version) {
          setNpmVersion(data.version);
        }
      })
      .catch(() => {
        // Keep default version on error
      });
  }, []);

  const handleRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    setShowAfter(false);

    setTimeout(() => {
      setShowAfter(true);
      setIsRunning(false);
    }, 1500);
  };

  const handleReset = () => {
    setShowAfter(false);
  };

  const handleFileChange = (file: FileType) => {
    setSelectedFile(file);
    setShowAfter(false);
    setFileDropdownOpen(false);
  };

  const updateConfig = useCallback((key: keyof ConfigOptions, value: string | string[]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  }, []);

  const currentExample = codeExamples[selectedFile];

  return (
    <section className="text-white py-16 md:py-24 lg:py-32 bg-zinc-950 overflow-hidden min-h-[90vh] flex items-center relative">
      {/* Interactive grid background */}
      <InteractiveGrid />

      <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full relative z-10">
        {/* LEFT - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Automate your <motion.span
              className="text-red-500 inline-block"
              animate={{
                textShadow: mounted ? [
                  "0 0 0px rgba(239, 68, 68, 0)",
                  "0 0 30px rgba(239, 68, 68, 0.6)",
                  "0 0 0px rgba(239, 68, 68, 0)"
                ] : "0 0 0px rgba(239, 68, 68, 0)"
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >#ID</motion.span> attributes.
            <br /> Stay consistent, stay testable.
          </motion.h1>

          <motion.p
            className="text-zinc-400 text-lg lg:text-xl mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            IDomatic automatically adds meaningful <code className="bg-zinc-800 px-2 py-1 rounded text-red-400 text-base">id</code> attributes to
            your HTML/JSX for better testability, maintainability, and team
            sanity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8"
          >
            <TerminalCommand command="npm init @idomatic" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link href="/docs#installation">
              <Button className="bg-red-600 cursor-pointer hover:bg-red-500 text-white text-lg px-8 py-3 h-14 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT - Interactive Playground */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotateY: -10 }}
          animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : 50, rotateY: mounted ? 0 : -10 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          style={{ perspective: "1000px" }}
        >
          <motion.div
            className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden shadow-2xl shadow-black/50"
            whileHover={{
              boxShadow: "0 25px 60px -12px rgba(239, 68, 68, 0.2)",
              borderColor: "rgba(239, 68, 68, 0.4)"
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-950 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                {/* Window dots */}
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>

                {/* File selector */}
                <div className="relative">
                  <button
                    onClick={() => setFileDropdownOpen(!fileDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 rounded-md text-sm text-zinc-300 hover:bg-zinc-700 transition-colors border border-zinc-700"
                  >
                    <FileIcon type={selectedFile} />
                    <span>example.{selectedFile === "angular" ? "component.html" : selectedFile}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${fileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {fileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 bg-zinc-900 border border-zinc-700 rounded-md overflow-hidden z-10 min-w-[180px] shadow-xl"
                      >
                        {(["tsx", "html", "js", "vue", "angular"] as FileType[]).map((file) => (
                          <button
                            key={file}
                            onClick={() => handleFileChange(file)}
                            className={`flex items-center gap-2 w-full px-3 py-2.5 text-sm text-left hover:bg-zinc-800 transition-colors ${selectedFile === file ? "bg-zinc-800 text-white" : "text-zinc-300"
                              }`}
                          >
                            <FileIcon type={file} />
                            <span>example.{file === "angular" ? "component.html" : file}</span>
                            {selectedFile === file && <Check className="w-4 h-4 ml-auto text-green-500" />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Reset button */}
                {showAfter && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={handleReset}
                    className="p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </motion.button>
                )}

                {/* Config button */}
                <motion.button
                  onClick={() => setShowConfig(!showConfig)}
                  className={`p-2 rounded-md transition-colors ${showConfig ? 'bg-red-500/20 text-red-400' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Settings className="w-4 h-4" />
                </motion.button>

                {/* Run button */}
                <motion.button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-500 disabled:bg-red-600/50 rounded-md text-sm font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isRunning ? (
                    <motion.div
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  <span>{isRunning ? "Running..." : "Run"}</span>
                </motion.button>
              </div>
            </div>

            {/* Config Panel - JSON Editor */}
            <AnimatePresence>
              {showConfig && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden border-b border-zinc-800"
                >
                  <div className="bg-zinc-950/80">
                    {/* Config file header */}
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
                      <div className="w-3 h-3 rounded-sm bg-yellow-500/80 flex items-center justify-center">
                        <span className="text-[8px] font-bold text-zinc-900">{ }</span>
                      </div>
                      <span className="text-xs text-zinc-400 font-mono">.idomatic.config.json</span>
                    </div>
                    {/* JSON Content */}
                    <div className="p-4 font-mono text-sm">
                      <div className="text-zinc-500">{"{"}</div>
                      <div className="pl-4">
                        <span className="text-purple-400">&quot;attributeName&quot;</span>
                        <span className="text-zinc-500">: </span>
                        <span className="text-green-400">&quot;</span>
                        <input
                          type="text"
                          value={config.attributeName}
                          onChange={(e) => updateConfig('attributeName', e.target.value)}
                          className="bg-transparent text-green-400 outline-none border-b border-transparent focus:border-green-500 transition-colors w-8"
                          style={{ width: `${Math.max(config.attributeName.length, 2)}ch` }}
                        />
                        <span className="text-green-400">&quot;</span>
                        <span className="text-zinc-500">,</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-purple-400">&quot;prefix&quot;</span>
                        <span className="text-zinc-500">: </span>
                        <span className="text-green-400">&quot;</span>
                        <input
                          type="text"
                          value={config.prefix}
                          onChange={(e) => updateConfig('prefix', e.target.value)}
                          className="bg-transparent text-green-400 outline-none border-b border-transparent focus:border-green-500 transition-colors"
                          style={{ width: `${Math.max(config.prefix.length, 2)}ch` }}
                        />
                        <span className="text-green-400">&quot;</span>
                        <span className="text-zinc-500">,</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-purple-400">&quot;excludeTags&quot;</span>
                        <span className="text-zinc-500">: </span>
                        <span className="text-yellow-400">[</span>
                        <span className="text-green-400">{config.excludeTags.map(t => `"${t}"`).join(", ")}</span>
                        <span className="text-yellow-400">]</span>
                        <span className="text-zinc-500">,</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-purple-400">&quot;includeExtensions&quot;</span>
                        <span className="text-zinc-500">: </span>
                        <span className="text-yellow-400">[</span>
                        <span className="text-green-400">{config.includeExtensions.map(t => `"${t}"`).join(", ")}</span>
                        <span className="text-yellow-400">]</span>
                      </div>
                      <div className="text-zinc-500">{"}"}</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Code Area */}
            <div className="p-4 min-h-[320px]">
              <AnimatePresence mode="wait">
                {!showAfter ? (
                  <motion.div
                    key="before"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-zinc-600" />
                      <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Input</span>
                    </div>
                    <CodeDisplay code={currentExample.before} language={currentExample.language} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="after"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-green-500"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      />
                      <span className="text-xs text-green-500 uppercase tracking-wider font-medium">Output</span>
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xs text-zinc-500"
                      >
                        — IDs added successfully!
                      </motion.span>
                    </div>
                    <CodeDisplayAnimated code={currentExample.after(config)} language={currentExample.language} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Status bar */}
            <div className="px-4 py-2.5 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
              <span className="font-mono">idomatic v{npmVersion}</span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${showAfter ? 'bg-green-500' : 'bg-zinc-600'}`} />
                  {showAfter ? 'Transformed' : 'Ready'}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-red-500/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-radial from-red-500/5 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}

// Terminal command component with typing animation
function TerminalCommand({ command }: { command: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= command.length) {
        setDisplayedText(command.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, [command]);

  return (
    <div className="bg-zinc-950 rounded-xl p-5 font-mono text-base border border-zinc-800 shadow-lg">
      <div className="flex items-center gap-2 text-zinc-400">
        <span className="text-green-500">$</span>
        <span className="text-white">{displayedText}</span>
        <motion.span
          className="w-2.5 h-6 bg-white"
          animate={{ opacity: showCursor ? 1 : 0 }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>
  );
}

// File icon component with real SVG icons
function FileIcon({ type }: { type: FileType }) {
  const iconConfig: Record<FileType, { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string }> = {
    tsx: { icon: SiTypescript, color: "#3178C6" },
    html: { icon: SiHtml5, color: "#E34F26" },
    js: { icon: SiJavascript, color: "#F7DF1E" },
    vue: { icon: SiVuedotjs, color: "#4FC08D" },
    angular: { icon: SiAngular, color: "#DD0031" },
  };

  const config = iconConfig[type];
  const Icon = config.icon;

  return (
    <Icon className="w-4 h-4" style={{ color: config.color }} />
  );
}

// Code display component
function CodeDisplay({ code, language }: { code: string; language: string }) {
  return (
    <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={{ ...style, background: 'transparent' }}
          className="rounded-lg p-4 overflow-x-auto text-sm font-mono leading-relaxed bg-zinc-950/50 border border-zinc-800"
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })} className="flex">
              <span className="text-zinc-700 select-none w-8 text-right pr-4 text-xs">{i + 1}</span>
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

// Animated code display with highlight effect on IDs
function CodeDisplayAnimated({ code, language }: { code: string; language: string }) {
  return (
    <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={{ ...style, background: 'transparent' }}
          className="rounded-lg p-4 overflow-x-auto text-sm font-mono leading-relaxed bg-zinc-950/50 border border-zinc-800"
        >
          {tokens.map((line, i) => (
            <motion.div
              key={i}
              {...getLineProps({ line })}
              className="flex"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <span className="text-zinc-700 select-none w-8 text-right pr-4 text-xs">{i + 1}</span>
              <span className="flex-1">
                {line.map((token, key) => {
                  const isIdAttribute = token.content.includes('id=') ||
                    token.content.includes('id:') ||
                    (token.content.includes('"') && token.content.includes('-'));
                  return (
                    <motion.span
                      key={key}
                      {...getTokenProps({ token })}
                      initial={isIdAttribute ? { backgroundColor: "rgba(239, 68, 68, 0.4)" } : {}}
                      animate={isIdAttribute ? { backgroundColor: "rgba(239, 68, 68, 0)" } : {}}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                  );
                })}
              </span>
            </motion.div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
