'use client';

import { useState } from 'react';
import { track } from '@/lib/analytics';

const FAQ_ITEMS = [
  {
    q: '無料で開発する試作品AIシステムは、本番で使うものと同等ですか？',
    a: 'いいえ、異なります。試作品は、本格導入の前に効果を判断いただくためのプロトタイプです。対象範囲を主要な機能に絞り、最短4週間で開発します。'
  },
  {
    q: 'セキュリティは大丈夫でしょうか？',
    a: 'ご安心ください。貴社のセキュリティ基準に合致した設計でAIシステムを開発いたします。データの取り扱いについても、機密保持契約（NDA）を締結の上、厳重に管理いたします。'
  },
  {
    q: 'IT導入補助金などの制度は利用できますか？',
    a: 'クラウド利用料など、一部の費用は補助金の対象となる可能性があります。開発内容により異なりますので、詳細は面談にてご相談ください。'
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
    if (openIndex !== i) track('accordion_open', { section: 'faq', index: i });
  };

  return (
    <section id="faq" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="text-center mb-12">
           <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            FAQ
          </span>
          <h2 className="text-3xl font-bold text-primary">よくあるご質問</h2>
        </div>
        
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-primary/5 overflow-hidden shadow-sm">
              <button
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                aria-expanded={openIndex === i}
              >
                <span className="font-bold text-primary pr-8">{item.q}</span>
                <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-primary/20 transition-transform duration-300 ${openIndex === i ? 'rotate-180 bg-primary text-white border-primary' : 'text-primary'}`}>
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                   </svg>
                </span>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="p-6 pt-0 text-sm text-text/70 leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
