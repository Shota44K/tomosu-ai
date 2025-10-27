'use client';

import { track } from "@/lib/analytics";

const PRICE_HIGHLIGHTS = [
  {
    label: "AIシステム試作開発費用",
    price: "0 円",
    description: "最短4週間でモック開発、PoCリスクをゼロへ",
  },
  {
    label: "本開発費用",
    price: (
      <>
        <span className="block text-xl">大手の約1/5水準</span>
        <span className="block">300～600万円</span>
      </>
    ),
    description: "詳細、別途お見積り",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-base">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-8 lg:px-12 text-center md:text-left">
        <header className="mb-9">
          <div>
            <span className="inline-flex w-full max-w-[16rem] items-center justify-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-9">
              開発費用
            </span>
            <h2 className="text-2xl font-bold text-primary md:text-3xl">
              <span className="hidden md:inline">無償PoCと低価格な本開発で導入リスクを最小化</span>
              <span className="block md:hidden">無償PoCと低価格な本開発</span>
              <span className="block md:hidden">導入リスクを最小化</span>
            </h2>
          </div>
        </header>
        

        <div className="mt-10 space-y-8">
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {PRICE_HIGHLIGHTS.map((highlight) => (
              <div key={highlight.label} className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
                <p className="text-s font-semibold uppercase tracking-wide text-primary/80">
                  {highlight.label}
                </p>
                <p className="mt-3 mb-4 text-3xl font-bold text-primary md:text-3xl">{highlight.price}</p>
                <p className="mt-2 text-sm text-text/90">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden mt-10 text-center md:block">
          <a
            href="#contact"
            className="hidden min-w-[12rem] items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow transition hover:bg-primary/90 md:inline-flex"
            onClick={() => track('cta_click', { location: 'pricing', to: '#contact' })}
          >
            無料で相談する（30分） &gt;
          </a>
        </div>
      </div>
    </section>
  );
}
