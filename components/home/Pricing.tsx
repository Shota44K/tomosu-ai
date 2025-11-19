'use client';

import { track } from "@/lib/analytics";

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            リスクゼロで始める、明確な料金体系
          </h2>
          <p className="mt-4 text-text/70 max-w-2xl mx-auto">
            まずは無料の試作開発で価値を確認。納得いただいてから本契約となります。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plan 1 */}
          <div className="bg-white rounded-3xl p-8 border-2 border-primary/5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-2 bg-primary" />
            <div className="absolute top-2 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
              STEP 1
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">AIシステム試作開発</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-bold text-primary">0</span>
              <span className="text-lg text-slate-500 font-medium">円</span>
            </div>
            <p className="text-sm text-text/70 mb-8 border-b border-slate-100 pb-8">
              実際のデータを使ったプロトタイプ開発。<br/>
              効果が見えるまで費用は一切かかりません。
            </p>
            <ul className="space-y-3 mb-8">
              {['要件ヒアリング', 'ユースケース選定', 'プロトタイプ開発', '導入効果の試算'].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-text/80">
                  <svg className="w-5 h-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Plan 2 */}
          <div className="bg-white rounded-3xl p-8 border-2 border-primary/5 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 inset-x-0 h-2 bg-primary" />
             <div className="absolute top-2 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
              STEP 2
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">本開発・運用</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-2xl font-bold text-primary">300~600</span>
              <span className="text-lg text-slate-500 font-medium">万円</span>
            </div>
            <p className="text-sm text-text/70 mb-8 border-b border-slate-100 pb-8">
              大手企業の約1/5の価格設定。<br/>
              必要な機能を厳選し、高品質かつ適正価格で提供。
            </p>
            <ul className="space-y-3 mb-8">
              {['システム設計・開発', 'UI/UXデザイン', 'セキュリティ対策', '運用保守サポート'].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-text/80">
                  <svg className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
             <div className="text-center">
               <a href="#contact" 
                  className="inline-block w-full py-4 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                  onClick={() => track('cta_click', { location: 'pricing_card', to: '#contact' })}
               >
                 見積もりを依頼する
               </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
