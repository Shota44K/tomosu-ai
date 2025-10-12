const PRICE_HIGHLIGHTS = [
  {
    label: "試作品AIシステム開発",
    price: "0 円",
    description: "最短4週間・対象範囲は事前合意のうえで無償対応",
  },
  {
    label: "本開発費用",
    price: "平均開発費 500 万円",
    description: "大手開発企業の1/5と低価格。詳細は別途お見積り",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white/90">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-8 lg:px-12">
        <div>
          <h2 className="text-2xl font-bold text-primary md:text-3xl">
            無償の試作と低価格な本開発で導入リスクを最小化
          </h2>
        </div>

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

          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold text-primary">運用・保守費用</h3>
              <p className="mt-3 text-sm leading-relaxed text-text/80">
                月次もしくはスポットでのサポートは別途お見積り。システム規模やサポート範囲に合わせてご提案します。
              </p>
            </article>

            <article className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold text-primary">なぜ大手の1/5の価格か？</h3>
              <p className="mt-3 text-sm leading-relaxed text-text/80">
                コンサルティングから開発・運用までを自社で一気通貫。外部委託に伴うマージンを排除することで、品質とスピードを保ちながらコストを低減しています。
              </p>
            </article>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-flex min-w-[12rem] items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow transition hover:bg-primary/90"
          >
            相談する
          </a>
        </div>
      </div>
    </section>
  );
}
