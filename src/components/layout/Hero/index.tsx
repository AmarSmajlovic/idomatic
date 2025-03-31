import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className=" text-white py-20 min-h-screen">
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

          {/* NPM Install */}
          <div className="bg-zinc-800 border border-zinc-600 rounded-md px-4 py-3 font-mono text-sm text-zinc-200 mb-4 w-[190px]">
            npm init @idomatic
          </div>

          {/* Get Started Button */}
          <Button className="bg-red-600 hover:bg-red-500 text-white text-base  px-6 py-2 w-[190px]">
            Get Started
          </Button>
        </div>

        {/* RIGHT */}
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
          <p className="text-sm text-zinc-400 mb-2">Before:</p>
          <pre className="bg-zinc-900 p-4 rounded-md text-sm overflow-auto mb-4">
            {`<button>Click me</button>`}
          </pre>

          <p className="text-sm text-zinc-400 mb-2">After:</p>
          <pre className="bg-zinc-900 p-4 rounded-md text-sm overflow-auto">
            {`<button id="cta-click-me">Click me</button>`}
          </pre>
        </div>
      </div>
    </section>
  );
}
