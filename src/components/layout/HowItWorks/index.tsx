import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightCircle } from "lucide-react";
import { TerminalBlock } from "@/components/ui/TerminalBlock";
import { CodeBlock } from "@/components/ui/CodeBlock";

const HowItWorks = () => {
  return (
    <section className="py-24 px-6 bg-gray-50 border-t">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">How idomatic works</h2>
        <p className="text-gray-600 text-lg">
          From install to improved markup — here’s how simple it is.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <Card className="shadow-lg border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">1. Initialize</CardTitle>
            <ArrowRightCircle className="w-5 h-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <TerminalBlock command="npm init @idomatic" />
            <p className="text-sm text-gray-500 mt-2">
              Choose your framework: React/JSX or HTML/Vue/Angular. A config
              file is generated.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">2. Customize config</CardTitle>
            <ArrowRightCircle className="w-5 h-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <CodeBlock
              code={`{
  "attributeName": "id",
  "prefix": "auto-id-",
  "excludeTags": ["html", "head", "script"],
  "includeExtensions": ["html", "vue"],
  "excludeFiles": []
}`}
            />
            <p className="text-sm text-gray-500 mt-2">
              Adjust the rules in <code>.idomatic.config.json</code> to match
              your project structure.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">3. Scan your code</CardTitle>
            <ArrowRightCircle className="w-5 h-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <TerminalBlock command="npx @idomatic/core scan" className="mb-4" />
            <p className="text-sm text-gray-500 mt-2">
              Run a full scan or preview which files will be modified using the{" "}
              <code className="font-semibold text-red-500">--dry</code> flag.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HowItWorks;
