import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Terminal, Zap, Code } from "lucide-react";

const WhyIdomatic = () => {
  return (
    <section className="py-20 px-6 bg-gray-50 ">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-semibold mb-2 text-black">
          Why use idomatic?
        </h2>
        <p className="text-gray-600">
          Speed up your test automation and maintain clean markup with zero
          effort.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <Card className="shadow-md">
          <CardHeader>
            <CheckCircle className="h-8 w-8 text-green-500" />
            <CardTitle>Auto-detects missing IDs</CardTitle>
          </CardHeader>
          <CardContent>
            Scans your project and smartly inserts IDs where needed, saving time
            and effort.
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <Terminal className="h-8 w-8 text-blue-500" />
            <CardTitle>Zero-config CLI</CardTitle>
          </CardHeader>
          <CardContent>
            Just run one command — no setup or config files required.
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <Code className="h-8 w-8 text-purple-500" />
            <CardTitle>Framework-agnostic</CardTitle>
          </CardHeader>
          <CardContent>
            Supports multiple frontend frameworks: HTML, JSX, Vue, and Angular
            templates.
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <Zap className="h-8 w-8 text-yellow-500" />
            <CardTitle>Test-friendly IDs</CardTitle>
          </CardHeader>
          <CardContent>
            Adds readable and reliable IDs optimized for automated tests.
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WhyIdomatic;
