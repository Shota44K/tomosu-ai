export default function Pricing() {
  return (
    <section id="pricing" className="bg-white/90">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-2xl font-bold text-primary md:text-3xl">
          試作品AIシステム無償開発と大手の約1/5 低価格な本開発
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <article className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-primary">tomosu-AIの料金体系</h3>
            <ul className="mt-4 space-y-2 text-sm text-text/80">
              <li>
                <span className="font-semibold text-text">効果実感AI 試作品開発：</span> 0 円（最短4週間・対象範囲は事前に合意します）
              </li>
              <li>
                <span className="font-semibold text-text">本開発費用：</span> 平均開発費 500 万円（詳細は別途お見積り）
              </li>
              <li>
                <span className="font-semibold text-text">月次運用・保守費用：</span> 別途お見積り（システムの要件やサポート範囲に応じて最適なプランをご提案します）
              </li>
            </ul>
          </article>
          <article className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-primary">なぜ大手の1/5の価格を実現できるのか？</h3>
            <p className="mt-4 text-sm leading-relaxed text-text/80">
              コンサルティングから開発、運用まで、外部委託せずすべて自社で完結。不要なマージンを徹底的にカットし低価格でのAIシステム開発を実現しています。
            </p>
          </article>
        </div>
        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white shadow transition hover:bg-primary/90"
          >
            相談する
          </a>
        </div>
      </div>
    </section>
  );
}
