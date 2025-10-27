const PRICE_HIGHLIGHTS = [
  {
    label: "AIシステム試作開発",
    price: "0 円",
    description: "最短4週間・対象範囲は事前合意のうえで無償対応",
  },
  {
    label: "本開発費用",
    price: "業界最安値水準 300～600万円",
    description: "詳細は別途お見積り",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white/90">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-8 lg:px-12">
        <header className="text-center md:text-left mb-9">
          <div>
            <span className="inline-flex w-full max-w-[16rem] items-center justify-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-9">
              開発費用
            </span>
            <h2 className="text-2xl font-bold text-primary md:text-3xl">
              <span className="hidden md:inline">無償の試作と低価格な本開発で導入リスクを最小化</span>
              <span className="block md:hidden">無償の試作と低価格な本開発で</span>
              <span className="block md:hidden">導入リスクを最小化</span>
            </h2>
          </div>
        </header>
        

        <div className="mt-10 space-y-8">
          <article className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-primary md:text-xl">開発費用</h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {PRICE_HIGHLIGHTS.map((highlight) => (
                <div key={highlight.label} className="rounded-xl bg-primary/5 p-5">
                  <p className="text-s font-semibold uppercase tracking-wide text-primary/80">
                    {highlight.label}
                  </p>
                  <p className="mt-3 text-2xl font-bold text-primary md:text-3xl">{highlight.price}</p>
                  <p className="mt-2 text-sm text-text/70">{highlight.description}</p>
                </div>
              ))}
            </div>
          </article>

        </div>

        <div className="hidden mt-10 text-center md:block">
          <a
            href="#contact"
            className="hidden min-w-[12rem] items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow transition hover:bg-primary/90 md:inline-flex"
          >
            無料で相談する（30分） &gt;
          </a>
        </div>
      </div>
    </section>
  );
}
