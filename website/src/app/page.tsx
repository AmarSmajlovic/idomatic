import Hero from "@/components/layout/Hero";
import Stats from "@/components/layout/Stats";
import WhyIdomatic from "@/components/layout/WhyIdomatic";
import UseCases from "@/components/layout/UseCases";
import HowItWorks from "@/components/layout/HowItWorks";
import WhatItSupport from "@/components/layout/WhatItSupport";
import FAQ from "@/components/layout/FAQ";
import CTA from "@/components/layout/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <WhyIdomatic />
      <UseCases />
      <HowItWorks />
      <WhatItSupport />
      <FAQ />
      <CTA />
    </>
  );
}
