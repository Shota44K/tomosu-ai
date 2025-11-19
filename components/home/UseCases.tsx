'use client';

import { track } from '@/lib/analytics';

const USE_CASES = [
  {
    industry: "消費財メーカー",
    title: "消費者向けAIチャットボット",
    desc: "商品の選び方や利用方法などの悩みを解決するAIチャットボットによりユーザー体験を向上。",
    metrics: "満足度向上・継続率UP",
    icon: (
      <svg className="h-full w-full text-primary/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    )
  },
  {
    industry: "一般財団法人",
    title: "公共文章QAシステム",
    desc: "膨大な専門文章を扱う業務をRAGシステムで効率化。図表を含めた正確な検索性能を実現。",
    metrics: "専任要員 80%削減",
    icon: (
      <svg className="h-full w-full text-primary/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    industry: "工業製品メーカー",
    title: "社内ナレッジ検索AI",
    desc: "技術文書や製品情報から必要な情報を即座に検索。ベテラン技術者の知見を社内で共有。",
    metrics: "回答時間 65%短縮",
    icon: (
      <svg className="h-full w-full text-primary/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
  {
    industry: "税理士法人",
    title: "財務申告業務効率化AI",
    desc: "会計データに基づいて適用可能な控除を自動抽出するAIソリューション。",
    metrics: "PoC実施中",
    icon: (
      <svg className="h-full w-full text-primary/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  },
];

export default function UseCases() {
  return (
    <section id="usecases" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Case Studies
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              業界を問わない開発実績
            </h2>
          </div>
           <div className="hidden md:block">
             <a href="#contact" className="text-primary font-bold hover:text-accent transition-colors flex items-center gap-2">
               相談してみる <span aria-hidden="true">→</span>
             </a>
           </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {USE_CASES.map((item, i) => (
            <article 
              key={i}
              className="group bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-primary/5 hover:border-primary/10 transition-all duration-300 cursor-pointer flex flex-col h-full"
              onClick={() => track('usecase_click', { title: item.title })}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="h-12 w-12 p-2 bg-white rounded-lg shadow-sm">{item.icon}</div>
                <span className="text-xs font-bold text-slate-400 border border-slate-200 rounded-full px-2 py-1">
                  {item.industry}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-primary mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-text/70 mb-6 flex-1 leading-relaxed">
                {item.desc}
              </p>
              
              <div className="mt-auto pt-4 border-t border-slate-200">
                <div className="text-xs text-slate-500 font-semibold mb-1">成果</div>
                <div className="text-sm font-bold text-primary flex items-center gap-2">
                  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {item.metrics}
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
           <a href="#contact" className="text-primary font-bold hover:text-accent transition-colors inline-flex items-center gap-2">
             全ての事例について聞く <span aria-hidden="true">→</span>
           </a>
         </div>
      </div>
    </section>
  );
}
