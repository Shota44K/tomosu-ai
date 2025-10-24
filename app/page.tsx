import CTA from "@/components/home/CTA";
import ContactForm from "@/components/home/ContactForm";
import FAQ from "@/components/home/FAQ";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";
import Process from "@/components/home/Process";
import Problems from "@/components/home/Problems";
import Services from "@/components/home/Services";
import Solutions from "@/components/home/Solutions";
import UseCases from "@/components/home/UseCases";

export default function HomePage() {
  return (
    <main className="pt-28">
      <Hero />
      <Problems />
      <Solutions />
      <Process />
      <UseCases />
      <CTA />
      <Services />
      <Pricing />
      <ContactForm />
      <FAQ />
    </main>
  );
}
