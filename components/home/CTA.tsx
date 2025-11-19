'use client';

import { track } from '@/lib/analytics';

export default function CTA() {
  return (
    <section id="cta" className="bg-primary py-20 relative overflow-hidden">
       {/* 背景装飾 */}
       <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
       <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          AIシステム開発のリスクをゼロに。<br/>
          効果が見えるまで費用負担なし。
        </h2>
        <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
          「AIで経営課題を解決できるかもしれない」<br className="md:hidden"/>その可能性を、リスクなく形にします。
        </p>
        
        <a
          href="#contact"
          className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-white text-primary font-bold text-lg shadow-lg hover:bg-slate-50 hover:scale-105 transition-all duration-300"
          onClick={() => track('cta_click', { location: 'bottom_cta', to: '#contact' })}
        >
          無料で相談する
        </a>
      </div>
    </section>
  );
}
