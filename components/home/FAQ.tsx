const FAQ_ITEMS = [
  {
    question: "Q1. 無料で開発する試作品AIシステムは、本番で使うものと同等ですか？",
    answer:
      "A1. いいえ、異なります。試作品は、本格導入の前に効果を判断いただくためのシステムです。対象範囲を主要なユースケースに絞り、最短4週間の期間で開発します。",
  },
  {
    question: "Q2. セキュリティは大丈夫でしょうか？",
    answer:
      "A2. ご安心ください。貴社の基準に合致したセキュリティを担保したAIシステムを開発いたします。",
  },
  {
    question: "Q3. IT導入補助金などの制度は利用できますか？",
    answer:
      "A3. クラウド利用料など、一部の費用は補助金の対象となる可能性があります。開発するAIシステムにより異なりますので、詳細は面談を通してご説明させていただきます。",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-white/90">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-2xl font-bold text-primary md:text-3xl">
          よくあるご質問
        </h2>
        <div className="mt-8 space-y-6">
          {FAQ_ITEMS.map((item) => (
            <article
              key={item.question}
              className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-primary">
                {item.question}
              </h3>
              <p className="mt-3 text-base text-text/80">{item.answer}</p>
            </article>
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
