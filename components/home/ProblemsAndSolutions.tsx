'use client';

import { useState, ReactNode } from 'react';
import { track } from '@/lib/analytics';

/* ========= コピー ========= */

const HEADING = 'AIシステム開発の「3つの課題」を tomosu-AI が解決します';

type Pair = {
  id: 'p1' | 'p2' | 'p3';
  label: string;
  problem: string;
  strength: {
    labelNo: string;
    headline: string;
    summary: string;
    detail: ReactNode;
  };
};

const PAIRS_MOBILE: Pair[] = [
  {
    id: 'p1',
    label: '課題 ①',
    problem: '何から始めれば良いか、見当がつかない',
    strength: {
      labelNo: '強み ①',
      headline: 'AI活用案の検討支援',
      summary: '投資効果最大化するAI活用案を共に設計',
      detail: (
        <>
          数々の企業のDXを推進してきた経験を基に、御社のビジネスへの理解とAIの最新技術動向を踏まえ活用案を共に描きます。
          <span className="font-semibold text-primary"> 経営と技術の両面</span>から最適なAI活用をご提案します。
        </>
      ),
    },
  },
  {
    id: 'p2',
    label: '課題 ②',
    problem: '投資対効果が見えず、意思決定できない',
    strength: {
      labelNo: '強み ②',
      headline: '無料でAIシステム試作開発',
      summary: '効果が見えるまで費用は不要',
      detail: (
        <>
          「AIは本当に効果があるのか？」という疑問にお応えするため、無償でAI試作システム（プロトタイプ）を開発。
          効果をご確認いただけなかった場合、<span className="font-semibold text-primary">費用は一切いただきません</span>。
        </>
      ),
    },
  },
  {
    id: 'p3',
    label: '課題 ③',
    problem: '成果は欲しいが、高額な開発費は避けたい',
    strength: {
      labelNo: '強み ③',
      headline: '開発費用は大手の約1/5',
      summary: '中間コストを削減し、どこよりも低価格を実現',
      detail: (
        <>
          大手企業で発生する営業・管理などの中間コストをカット。少数精鋭チームでの開発により、総開発費用は
          <span className="font-semibold text-primary">業界最安値水準の平均300～600万円</span>を実現。
          <br className="hidden md:block" />
        </>
      ),
    },
  },
];

/* ========= コンポーネント ========= */

export default function ProblemsAndStrengthsUnified_NoWrapper() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => {
      const next = prev === id ? null : id;
      if (next) track('accordion_open', { id: next, section: 'solutions' });
      return next;
    });
  };

  return (
    <section id="solutions" className="bg-base">
      {/* コンテナ：左右余白を広めに（xlまで段階的に） */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-8 lg:px-12">
        {/* 見出しブロック（ラッパーカードなし） */}
        <header className="text-center md:text-left">
          <span className="inline-flex w-full max-w-[16rem] items-center justify-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-9">
            頻出課題と強み
          </span>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-primary md:mt-4 md:text-3xl">
            <span className="hidden md:inline">{HEADING}</span>
            <span className="block md:hidden">
              <span className="block">AIシステム開発の「3つの課題」</span>
              <span className="block">tomosu-AIが解決します</span>
            </span>
          </h2>
        </header>

        {/* ===== モバイル：課題⇄強みのペアカード（アコーディオン） ===== */}
        <div className="mt-8 space-y-6 md:hidden">
          {PAIRS_MOBILE.map((pair) => {
            const open = openId === pair.id;
            return (
              <div
                key={pair.id}
                className="rounded-xl border border-primary/10 bg-white/90 shadow-sm shadow-primary/5"
              >
                {/* 課題（上帯） */}
                <div className="flex items-start gap-3 rounded-t-xl border-b border-primary/10 bg-primary/5 px-5 py-4">
                  <span className="mt-0.5 inline-flex flex-shrink-0 items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-primary">
                    {pair.label}
                  </span>
                  <p className="text-[15px] font-semibold text-text/90">{pair.problem}</p>
                </div>

                {/* 強み要点＋トグル */}
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => toggle(pair.id)}
                  className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex flex-shrink-0 items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-primary">
                        {pair.strength.labelNo}
                      </span>
                      <h3 className="line-clamp-2 text-lg font-bold text-primary">
                        {pair.strength.headline}
                      </h3>
                    </div>
                  </div>
                  <span
                    aria-hidden="true"
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary/30 text-primary transition ${
                      open ? 'bg-primary/5' : ''
                    }`}
                  >
                    {/* 折りたたみアイコン */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </button>

                {/* 強みの詳細（アコーディオン） */}
                {open && (
                  <div className="border-t border-primary/10 px-5 pb-9 pt-3 text-[13.5px] leading-relaxed text-text/80">
                    <p className="my-4 text-base font-semibold text-text/80">
                      {pair.strength.summary}
                    </p>
                    <p>{pair.strength.detail}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ===== PC：課題＋強み＝1カード（常時展開・3列／上帯と下帯の間にアクセントライン） ===== */}
        <div className="mt-10 hidden md:grid md:grid-cols-3 gap-4">
          {PAIRS_MOBILE.map((pair) => (
            <article
              key={pair.id}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-sm shadow-primary/5 ring-1 ring-transparent transition hover:-translate-y-[2px] hover:shadow-lg hover:shadow-primary/10 focus-within:-translate-y-[2px] focus-within:shadow-lg focus-within:shadow-primary/10"
            >
              {/* 上帯：課題 */}
              <div className="flex flex-col p-6 bg-primary/10">
                <div className="flex justify-center items-start gap-3">
                  <span className="inline-flex flex-shrink-0 items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-base font-semibold tracking-wide text-primary">
                    {pair.label}
                  </span>
                  <p className="text-lg font-semibold text-text/90">{pair.problem}</p>
                </div>
              </div>

              {/* 指定のアクセントライン（上帯と下帯の間） */}
              <div className="relative h-[3px]">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 block h-[3px] rounded-t-3xl bg-gradient-to-r from-primary/70 via-accent/60 to-primary/70 opacity-80"
                />
              </div>

              {/* 下帯：強み（常時展開） */}
              <div className="flex flex-col p-6">
                {/* ラベル行：強みNo + バッジ */}
                <div className="flex items-start gap-3">
                  <span className="inline-flex flex-shrink-0 items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-base font-semibold tracking-wide text-primary">
                    {pair.strength.labelNo}
                  </span>
                  <h3 className="text-xl font-bold text-primary">
                    {pair.strength.headline}
                  </h3>
                </div>

                {/* 見出し・要約 */}
                <p className="mt-6 text-base font-semibold text-text/80">
                  {pair.strength.summary}
                </p>

                {/* 本文（詳細） */}
                <div className="my-6 flex-1 text-sm leading-relaxed text-text/80">
                  {pair.strength.detail}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
