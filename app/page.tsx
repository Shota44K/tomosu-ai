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
      <div hidden aria-hidden="true">
        <form
          name="contact"
          data-netlify="true"
          netlify-honeypot="bot-field"
          method="POST"
          action="/"
        >
          <input type="hidden" name="form-name" value="contact" />
          <label>
            会社名
            <input name="company" type="text" />
          </label>
          <label>
            お名前
            <input name="name" type="text" />
          </label>
          <label>
            メールアドレス
            <input name="email" type="email" />
          </label>
          <label>
            電話番号
            <input name="phone" type="tel" />
          </label>
          <label>
            ご相談内容
            <textarea name="message" />
          </label>
          <div>
            <label>
              bot-field
              <input name="bot-field" type="text" />
            </label>
          </div>
        </form>
      </div>
      <FAQ />
    </main>
  );
}
