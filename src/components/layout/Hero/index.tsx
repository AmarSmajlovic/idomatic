import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { TerminalBlock } from "@/components/ui/TerminalBlock";

export default function Hero() {
  return (
    <section className=" text-white py-20 bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
            Automate your <span className="text-red-500">#ID</span> attributes.
            <br /> Stay consistent, stay testable.
          </h1>
          <p className="text-zinc-400 text-lg mb-6">
            IDomatic automatically adds meaningful <code>id</code> attributes to
            your HTML/JSX for better testability, maintainability, and team
            sanity.
          </p>

          <TerminalBlock command={`npx @idomatic/core scan --dry`} />

          {/* Get Started Button */}
          <Button className="bg-red-600 hover:bg-red-500 text-white text-bas mt-6  px-6 py-2 w-[190px]">
            Get Started
          </Button>
        </div>

        {/* RIGHT */}
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
          <p className="text-sm text-zinc-400 mb-2">Before:</p>
          <CodeBlock
            code={`function Button() {
  return <button>Click me</button>;
}`}
            language="tsx"
          />

          <p className="text-sm text-zinc-400 mb-2">After:</p>
          <CodeBlock
            code={`function Button() {
  return <button>Click me</button>;
}`}
            language="tsx"
          />
        </div>
      </div>
    </section>
  );
}
