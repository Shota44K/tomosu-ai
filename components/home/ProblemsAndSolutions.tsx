'use client';

import { ReactNode } from 'react';

const HEADING = 'AIシステム開発の「3つの壁」を突破する';

type ProblemSolutionPair = {
  id: string;
  problem: {
    icon: ReactNode;
    text: string;
  };
  solution: {
    title: string;
    description: string;
    detail: ReactNode;
  };
};

const PAIRS: ProblemSolutionPair[] = [
  {
    id: 'p1',
    problem: {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: '何から始めれば良いかわからない',
    },
    solution: {
      title: 'AI活用案の検討支援',
      description: '投資効果を最大化するAI活用案を共に設計',
      detail: (
        <>
          数々の企業のDXを推進してきた経験を基に、ビジネス理解と技術動向の両面から、
          <span className="font-bold text-primary">経営にインパクトのある最適なAI活用</span>をご提案します。
        </>
      ),
    },
  },
  {
    id: 'p2',
    problem: {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: '投資対効果が見えず決裁できない',
    },
    solution: {
      title: '無料でAI試作開発',
      description: '効果が見えるまで費用は不要',
      detail: (
        <>
          「本当に使えるのか？」という疑問に答えるため、無償でプロトタイプを開発。
          効果を確認できなければ、<span className="font-bold text-primary">費用は一切いただきません</span>。
        </>
      ),
    },
  },
  {
    id: 'p3',
    problem: {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      text: '成果は欲しいが高額な開発費は避けたい',
    },
    solution: {
      title: '開発費用は大手の約1/5',
      description: '中間コストを削減し適正価格を実現',
      detail: (
        <>
          営業・管理などの中間コストを徹底カット。少数精鋭チームにより、
          <span className="font-bold text-primary">業界最安値水準（300～600万円）</span>での高品質な開発を実現します。
        </>
      ),
    },
  },
];

export default function ProblemsAndSolutions() {
  return (
    <section id="solutions" className="bg-gradient-to-b from-base to-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Solutions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
            {HEADING}
          </h2>
          <p className="mt-4 text-text/70">
            多くの企業が抱えるAI導入の課題を、tomosu-AI独自の開発モデルで解決します。
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {PAIRS.map((pair, index) => (
            <div 
              key={pair.id}
              className="group relative flex flex-col h-full bg-white rounded-3xl shadow-sm border border-primary/5 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* 課題パート (Top) */}
              <div className="bg-slate-50 p-6 border-b border-slate-100 relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                    {pair.problem.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Problem 0{index + 1}</div>
                    <h3 className="text-sm font-semibold text-slate-600 leading-snug">{pair.problem.text}</h3>
                  </div>
                </div>
                
                {/* 矢印アイコン */}
                <div className="absolute left-1/2 -bottom-4 -translate-x-1/2 w-8 h-8 bg-white rounded-full border border-primary/10 flex items-center justify-center z-10 shadow-sm">
                  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>

              {/* 解決策パート (Bottom) */}
              <div className="p-8 pt-10 flex-1 flex flex-col">
                <div className="text-xs font-bold text-accent uppercase tracking-wider mb-2">Solution 0{index + 1}</div>
                <h4 className="text-xl font-bold text-primary mb-3">{pair.solution.title}</h4>
                <p className="text-sm font-medium text-primary/80 mb-4">{pair.solution.description}</p>
                <div className="text-sm text-text/70 leading-relaxed mt-auto pt-4 border-t border-dashed border-slate-200">
                  {pair.solution.detail}
                </div>
              </div>
              
              {/* ホバー時の枠線エフェクト */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/10 rounded-3xl pointer-events-none transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
