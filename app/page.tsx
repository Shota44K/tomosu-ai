'use client';

import { Suspense, useEffect } from "react";

import MobileStickyCta from "@/components/common/MobileStickyCta";
import ContactForm from "@/components/home/ContactForm";
import FAQ from "@/components/home/FAQ";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";
import Process from "@/components/home/Process";
import ProblemsAndSolutions from "@/components/home/ProblemsAndSolutions";
import UseCases from "@/components/home/UseCases";
import { observeSectionOnce } from "@/lib/analytics";
import { useScrollDepth } from "@/lib/useScrollDepth";

export default function HomePage() {
  useScrollDepth();

  useEffect(() => {
    ["#hero", "#usecases", "#solutions", "#process", "#pricing", "#faq", "#contact"].forEach(
      (selector) => {
        observeSectionOnce(selector);
      },
    );
  }, []);

  return (
    <>
      <main className="pt-28">
        <Suspense fallback={null}>
          <Hero />
        </Suspense>
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
