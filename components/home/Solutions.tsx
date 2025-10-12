import { Fragment } from "react";

const SOLUTIONS = [
  {
    title: "効果が見えるまで、費用をいただきません",
    subtitle: "リスクゼロ",
    description:
      "「AIは本当に効果があるのか？」そういったお声にお応えするため、試作品AIシステムを無償で開発します。AIが課題解決に役立つかをその試作品AIを通してご判断ください。効果をご確認いただけなかった場合、費用は一切いただきません。",
  },
  {
    title: "平均開発費用500万円 大手の1/5水準*",
    subtitle: "圧倒的な低価格",
    description:
      "大手開発企業にて発生する営業・管理などの中間コストをカットし、低価格開発を実現します。また、小規模な開発体制の利点を活かし、お客様と密な連携を通して、低価格でありながら高品質・ハイスピードな導入を実現します。",
  },
  {
    title: "大手コンサル出身者がAI活用案を構想",
    subtitle: "AI活用案を伴に構想",
    description:
      "数々の企業のDXを推進してきた経験を基に、御社のビジネスへの理解とAIの最新技術動向を踏まえ、AI活用案を伴に描きます。ビジネスを成功に導くパートナーとして、技術だけでなく経営の視点から最適なAI活用をご提案します。",
  },
];

export default function Solutions() {
  return (
    <section id="solutions" className="bg-base">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-primary md:text-3xl">
            そのお悩み、弊社がすべて解決します
          </h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {SOLUTIONS.map((solution) => {
            const lines = solution.title.split("<br>");

            return (
              <article
                key={solution.subtitle}
                className="flex flex-col gap-4 rounded-2xl border border-primary/10 bg-white p-6 shadow-sm"
              >
                <div className="min-h-[6rem] space-y-2">
                  <div className="text-xl font-semibold text-accent">
                    {solution.subtitle}
                  </div>
                  <h3 className="text-md font-semibold leading-snug text-primary">
                    {lines.map((line, index) => (
                      <Fragment key={index}>
                        {line}
                        {index !== lines.length - 1 && <br />}
                      </Fragment>
                    ))}
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-text/80">
                  {solution.description}
                </p>
              </article>
            );
          })}
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
