export default function Services() {
  const prototypeListSections = [
    {
      title: "ご提供内容",
      items: [
        "課題ヒアリングと、最も効果的なユースケース1件の選定",
        "貴社の実データ（一部）を活用したAI試作品の開発 最短4週間（無償）",
        "効果測定のための評価設計",
      ],
    },
    {
      title: "本プランに含まれないもの",
      items: [
        "独自のデザインを施したUI開発",
        "他システムとのデータ連携",
        "AIの学習に必要な大規模なデータ整備",
      ],
    },
    {
      title: "お客様にご協力いただくこと",
      items: [
        "オンラインでのお打ち合わせ",
        "AIが学習・参考にするためのデータと評価用データのご準備とご提供（範囲は事前協議）",
      ],
    },
  ];

  const developmentDeliverables = [
    "AIシステム",
    "要件定義仕様書",    
    "システム概要書",
  ];

  const supportNote =
    "システム公開後の保守や機能改善などを月額制にてサポート（別途お見積り）";

  return (
    <section id="services" className="bg-base">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-8 lg:px-12">
        <div>
          <h2 className="mt-3 text-2xl font-bold text-primary md:text-3xl">
            <span className="hidden md:inline">試作品開発(無料)から本開発・運用までのステップ</span>
            <span className="block md:hidden">試作品開発(無料)から</span>
            <span className="block md:hidden">本開発・運用までのステップ</span>
          </h2>
        </div>

        <div className="mt-6 grid gap-8">
          <article className="flex h-full flex-col rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
            <h3 className="mt-2 text-xl font-semibold text-primary md:text-2xl">
              試作AIシステム開発（無料）
            </h3>
            <p className="mt-3 text-sm text-text/70">
              実データを用いた試作品で効果を確認し、投資判断をいただくためのステップです。
            </p>

            <div className="mt-6 flex flex-1 flex-col gap-6">
              {prototypeListSections.map((section) => (
                <section key={section.title} className="space-y-3">
                  <h4 className="text-lg font-semibold text-text">{section.title}</h4>
                  <ul className="space-y-2 text-sm text-text/80">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-primary/60" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </article>

          <article className="flex h-full flex-col rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
            <h3 className="mt-2 text-xl font-semibold text-primary md:text-2xl">
              本開発・運用
            </h3>
            <p className="mt-3 text-sm text-text/70">
              本格導入ステップ。要件定義から開発、運用サポートまでをワンストップでご提供します。
            </p>

            <div className="flex flex-1 flex-col gap-4">
              <section>
                <h4 className="mt-6 text-lg font-semibold text-text">本開発に含まれる主な成果物</h4>
                <ul className="mt-3 space-y-2 text-sm text-text/80">
                  {developmentDeliverables.map((deliverable) => (
                    <li key={deliverable} className="flex gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary/60" aria-hidden="true" />
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className="text-lg font-semibold text-text">保守・運用サポート</h4>
                <ul className="mt-3 space-y-2 text-sm text-text/80">
                  <li key={supportNote} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary/60" aria-hidden="true" />
                    <span>{supportNote}</span>
                  </li>
                </ul>
                
              </section>
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
