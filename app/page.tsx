import { Suspense } from "react";

import MobileStickyCta from "@/components/common/MobileStickyCta";
import ContactForm from "@/components/home/ContactForm";
import FAQ from "@/components/home/FAQ";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";
import Process from "@/components/home/Process";
import ProblemsAndSolutions from "@/components/home/ProblemsAndSolutions";
import Services from "@/components/home/Services";
import UseCases from "@/components/home/UseCases";

export default function HomePage() {
  return (
    <>
      <main className="pt-28">
        <Hero />
        <UseCases />
        <ProblemsAndSolutions />
        <Process />
        <Pricing />
        <ContactForm />
        <FAQ />
      </main>
      <Suspense fallback={null}>
        <MobileStickyCta />
      </Suspense>
    </>
  );
}
