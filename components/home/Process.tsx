const STEPS = [
  {
    step: "STEP 1",
    title: "無料相談",
    description:
      "まずはお気軽に、現状の課題やAIで実現したいことをお聞かせください。",
  },
  {
    step: "STEP 2",
    title: "AIシステム試作開発（無料）",
    description:
      "貴社課題を解決するAIシステムを試作開発。試作システムで効果を確かめていただきます。",
  },
  {
    step: "STEP 3",
    title: "効果判定",
    description:
      "事前に合意した評価基準に基づき、本開発に進むかを判定いただきます。",
  },
  {
    step: "STEP 4",
    title: "本開発と運用開始",
    description:
      "導入完了まで責任を持って開発し、運用をスタートします。",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-white/90">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-2xl font-bold text-primary md:text-3xl">
          システム開発・導入までの流れ。
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {STEPS.map((item) => (
            <div
              key={item.step}
              className="flex flex-col gap-4 rounded-2xl border border-primary/10 bg-white p-6 shadow-sm"
            >
              <div className="min-h-[5rem] space-y-2">
                <span className="text-sm font-semibold text-accent">
                  {item.step}
                </span>
                <h3 className="text-xl font-semibold leading-snug text-primary">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-text/80">
                {item.description}
              </p>
            </div>
          ))}
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
