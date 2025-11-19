'use client';

export default function Services() {
  return (
    <section id="services" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            開発・提供プラン
          </h2>
          <p className="mt-4 text-text/70 max-w-2xl mx-auto">
            まずは無料の試作開発から。リスクを最小限に抑えたステップアップ開発を提供します。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Free Prototype */}
          <div className="bg-white rounded-3xl p-8 border border-primary/10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-4 py-1 rounded-bl-xl z-10">
              FREE
            </div>
            <h3 className="text-2xl font-bold text-primary mb-2">試作AIシステム開発</h3>
            <p className="text-sm text-text/60 mb-8">本開発の前に、効果を実証するためのプロトタイプ開発。</p>

            <div className="space-y-6">
               <div className="bg-primary/5 rounded-xl p-5">
                 <h4 className="font-bold text-primary text-sm mb-3">ご提供内容</h4>
                 <ul className="space-y-2">
                   {[
                     '課題ヒアリングとユースケース選定',
                     '貴社実データを活用したAI試作品開発（最短4週間）',
                     '効果測定のための評価設計サポート'
                   ].map((item, i) => (
                     <li key={i} className="flex items-start gap-2 text-sm text-text/80">
                       <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                       <span>{item}</span>
                     </li>
                   ))}
                 </ul>
               </div>
               <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                 <h4 className="font-bold text-slate-500 text-sm mb-3">ご協力いただくこと</h4>
                   <ul className="space-y-2">
                   {[
                     'オンラインでのお打ち合わせ',
                     '学習・評価用データのご準備（機密保持契約締結の上）'
                   ].map((item, i) => (
                     <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                       <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                       <span>{item}</span>
                     </li>
                   ))}
                 </ul>
               </div>
            </div>
          </div>

          {/* Right: Main Development */}
          <div className="bg-primary text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
            {/* 背景装飾 */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-accent/20 rounded-full blur-2xl" />
            
            <h3 className="text-2xl font-bold mb-2 relative z-10">本開発・運用</h3>
            <p className="text-sm text-white/70 mb-8 relative z-10">本格的なシステム構築と継続的な改善サポート。</p>

            <div className="space-y-6 relative z-10">
               <div className="bg-white/10 rounded-xl p-5 border border-white/10 backdrop-blur-sm">
                 <h4 className="font-bold text-white text-sm mb-3">主な成果物</h4>
                 <ul className="space-y-2">
                   {[
                     'AIシステム本体（Web/アプリ）',
                     '要件定義書・システム設計書',
                     '運用マニュアル'
                   ].map((item, i) => (
                     <li key={i} className="flex items-start gap-2 text-sm text-white/90">
                       <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                       </svg>
                       <span>{item}</span>
                     </li>
                   ))}
                 </ul>
               </div>
               
               <div className="bg-white/5 rounded-xl p-5 border border-white/5">
                  <h4 className="font-bold text-white text-sm mb-2">保守・運用（オプション）</h4>
                  <p className="text-sm text-white/70 leading-relaxed">
                    システム公開後のサーバー監視、データ更新、機能追加などを月額定額にてサポートいたします。
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
