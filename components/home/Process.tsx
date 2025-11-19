'use client';

import { track } from '@/lib/analytics';

const STEPS = [
  {
    num: '01',
    title: 'ヒアリング',
    desc: '現状の課題やAIで実現したいことを詳しくお聞かせください。ビジネスと技術の両面から要件を整理します。',
    duration: '1〜2週間',
  },
  {
    num: '02',
    title: 'AIシステム試作開発（無料）',
    desc: 'PoCとして実際のデータを用いたAIシステムを試作開発します。モックアップを通して効果を確実に確かめていただけます。',
    duration: '最短4週間',
  },
  {
    num: '03',
    title: '本開発・運用',
    desc: '試作の評価を踏まえて本開発へ移行。UI/UXの磨き込みやシステム連携を行い、安定した運用をサポートします。',
    duration: '平均2ヶ月〜',
  }
];

export default function Process() {
  return (
    <section id="process" className="bg-white py-24 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              ヒアリングから本開発完了まで<br/>
              <span className="text-accent">平均3ヶ月</span>のスピード導入
            </h2>
          </div>
          <div className="hidden md:block">
             <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white transition-colors duration-300"
              onClick={() => track('cta_click', { location: 'process_header', to: '#contact' })}
            >
              開発の相談をする
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          {/* 接続線（PCのみ） */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 -z-10" />

          {STEPS.map((step, i) => (
            <div key={step.num} className="group relative bg-white md:bg-transparent rounded-2xl p-5 md:p-0 border md:border-none border-primary/10 shadow-sm md:shadow-none">
              <div className="flex flex-row md:flex-col items-start md:items-center md:text-center gap-5 md:gap-0">
                {/* 番号 */}
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 md:w-24 md:h-24 rounded-full bg-white border border-primary/10 flex items-center justify-center shadow-sm md:mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <span className="text-xl md:text-3xl font-bold text-primary/20 group-hover:text-accent transition-colors duration-300">
                      {step.num}
                    </span>
                  </div>
                </div>

                <div className="flex-1 pt-1 md:pt-0">
                  <h3 className="text-lg md:text-xl font-bold text-primary mb-2">{step.title}</h3>
                  <span className="inline-block px-2 py-1 bg-primary/5 rounded text-xs font-semibold text-primary/70 mb-3">
                    {step.duration}
                  </span>
                  <p className="text-sm text-text/70 leading-relaxed md:max-w-xs">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* モバイル用CTA */}
         <div className="mt-10 text-center md:hidden">
            <a
              href="#contact"
              className="inline-flex min-w-[12rem] items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow transition hover:bg-primary/90"
              onClick={() => track('cta_click', { location: 'process_mobile', to: '#contact' })}
            >
              無料で相談する
            </a>
          </div>
      </div>
    </section>
  );
}
