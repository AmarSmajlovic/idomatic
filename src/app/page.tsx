import Hero from "@/components/layout/Hero";
import HowItWorks from "@/components/layout/HowItWorks";
import WhatItSupport from "@/components/layout/WhatItSupport";
import WhyIdomatic from "@/components/layout/WhyIdomatic";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyIdomatic />
      <HowItWorks />
      <WhatItSupport />
    </>
  );
}
