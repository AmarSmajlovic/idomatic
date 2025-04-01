import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Sparkles } from "lucide-react";

const WhatItSupport = () => {
  return (
    <section className="py-24 px-6 bg-gray-50 border-t">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">What it supports</h2>
        <p className="text-gray-600 text-lg">
          IDomatic is built for the modern frontend ecosystem — with more
          support on the way.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <Card className="shadow-md border border-green-200">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <CheckCircle className="text-green-500" /> Currently Supported
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>JavaScript / JSX / TSX</li>
              <li>React & React Native</li>
              <li>HTML</li>
              <li>Vue</li>
              <li>Angular</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="shadow-md border border-yellow-200">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Sparkles className="text-yellow-500" /> Coming Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Svelte</li>
              <li>Astro</li>
              <li>Handlebars</li>
              <li>SolidJS</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WhatItSupport;
