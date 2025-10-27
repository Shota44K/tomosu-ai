'use client';

import { useState } from 'react';

const FAQ_ITEMS = [
  {
    question: 'Q1. 無料で開発する試作品AIシステムは、本番で使うものと同等ですか？',
    answer:
      'A1. いいえ、異なります。試作品は、本格導入の前に効果を判断いただくためのシステムです。対象範囲を主要なユースケースに絞り、最短4週間の期間で開発します。',
  },
  {
    question: 'Q2. セキュリティは大丈夫でしょうか？',
    answer:
      'A2. ご安心ください。貴社の基準に合致したセキュリティを担保したAIシステムを開発いたします。',
  },
  {
    question: 'Q3. IT導入補助金などの制度は利用できますか？',
    answer:
      'A3. クラウド利用料など、一部の費用は補助金の対象となる可能性があります。開発するAIシステムにより異なりますので、詳細は面談を通してご説明させていただきます。',
  },
];

export default function FAQ() {
  // モバイル用アコーディオンの開閉状態（複数同時オープン可）
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <section id="faq" className="bg-white/90">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-8 lg:px-12">
        <header className="text-center md:text-left mb-9">
          <span className="inline-flex w-full max-w-[16rem] items-center justify-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-9">
            FAQ
          </span>
          <h2 className="text-2xl font-bold text-primary md:text-3xl">よくあるご質問</h2>
        </header>
        <div className="mt-8 space-y-6">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openSet.has(i);
            const answerId = `faq-a-${i}`;
            const buttonId = `faq-q-${i}`;
            return (
              <article
                key={item.question}
                className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm"
              >
                {/* 見出し（モバイルはボタンで開閉、PCは非アコーディオンで常時展開） */}
                <button
                  id={buttonId}
                  type="button"
                  aria-controls={answerId}
                  aria-expanded={isOpen}
                  onClick={() => toggle(i)}
                  className="flex w-full items-start justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 md:cursor-default md:pointer-events-none"
                >
                  <h3 className="text-base font-semibold text-primary">{item.question}</h3>

                  {/* モバイルのみ表示の開閉アイコン */}
                  <span
                    aria-hidden="true"
                    className={`md:hidden inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary/30 text-primary transition-transform ${
                      isOpen ? 'rotate-180 bg-primary/5' : ''
                    }`}
                  >
                    {/* chevron-down アイコン（SVG） */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </button>

                {/* 回答：モバイルはアコーディオン、PCは常時表示 */}
                <p
                  id={answerId}
                  aria-labelledby={buttonId}
                  className={`mt-3 text-sm leading-relaxed text-text/80 ${
                    isOpen ? 'block' : 'hidden md:block'
                  }`}
                >
                  {item.answer}
                </p>
              </article>
            );
          })}
        </div>

        {/* CTA（PCのみ表示） */}
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
