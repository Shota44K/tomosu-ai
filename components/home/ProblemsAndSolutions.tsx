'use client';

import { useState, ReactNode } from 'react';

/**
 * ProblemsAndStrengthsUnified_NoWrapper.tsx
 *
 * 要望対応：
 * - セクション全体を「カード内」に納めない（ラッパーの枠/影を撤去）
 * - その分、左右余白（container padding）を広めに確保
 *
 * 表示仕様：
 * - モバイル：課題→強みの「ペアカード」（強み詳細はアコーディオン／初期閉）
 * - PC：頻出課題（チップ）＋ 強み3カード（常時展開・アコーディオンなし）
 *
 * ブランディング：
 * - #F5F5F3 / #00594F / #8BC53F / #222 の淡色・余白・柔らかい影
 *
 * 計測：
 * - accordion_open:{id} / accordion_cta_click:{id} を gtag / dataLayer に送信
 */

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', event, params ?? {});
  if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event, ...(params ?? {}) });
}

/* ========= コピー（最終案） ========= */

const HEADING = 'AIシステム開発の3つの壁、tomosu-AIが解決します';

const CTA_LABEL = '無料で相談する（30分） ＞';
const CTA_HREF = '#contact';

type Pair = {
  id: 'p1' | 'p2' | 'p3';
  label: string;
  problem: string;
  strength: {
    labelNo: string;
    badge: string;
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
      badge: '伴走支援',
      headline: 'AI活用案の策定支援',
      summary: '要件定義〜運用まで伴走。投資効果最大化するAI活用案を共に設計',
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
      badge: 'リスクゼロ',
      headline: '無料でAIシステムを試作開発',
      summary: '効果が見えるまで費用は不要。',
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
      badge: '低価格',
      headline: '手頃な開発費用（大手の約1/5）',
      summary: '中間コストを削減し、どこよりも低価格を実現。',
      detail: (
        <>
          大手企業で発生する営業・管理などの中間コストをカット。少数精鋭チームでの開発により、総開発費用は<span className="font-semibold text-primary">業界最安値水準の平均300～600万円</span>を実現。
          <br className="hidden md:block" />
        </>
      ),
    },
  },
];

const PROBLEMS_PC = PAIRS_MOBILE.map((pair) => ({
  id: pair.id,
  label: pair.label,
  text: pair.problem,
}));

/* ========= コンポーネント ========= */

export default function ProblemsAndStrengthsUnified_NoWrapper() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => {
      const next = prev === id ? null : id;
      if (next) track(`accordion_open:${next}`, { id: next, section: 'paired_strengths' });
      return next;
    });
  };

  const onCTA = (id?: string) =>
    track(`accordion_cta_click:${id ?? 'section'}`, { id: id ?? 'section', href: CTA_HREF });

  return (
    <section id="solutions" className="bg-base">
      {/* コンテナ：左右余白を広めに（xlまで段階的に） */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16">
        {/* 見出しブロック（ラッパーカードなし） */}
        <header className="text-center md:text-left">
          <span className="mt-0.5 inline-flex flex-shrink-0 items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold tracking-[0.28em] text-accent">
            頻出課題と強み
          </span>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-primary md:mt-4 md:text-3xl">
            <span className="hidden md:inline">{HEADING}</span>
            <span className="block md:hidden">
              <span className="block">AIシステム開発の「3つの壁」</span>
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
                    {/* <p className="mt-4 text-[13px] font-semibold text-text/80">
                      {pair.strength.summary}
                    </p> */}
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

        {/* ===== PC：頻出課題（チップ）＋ 強み3カード（常時展開） ===== */}
        <div className="mt-10 hidden md:block">
          {/* 頻出課題（チップ） */}
          <ul className="grid gap-3 sm:grid-cols-3">
            {PROBLEMS_PC.map((item) => (
              <li
                key={item.id}
                className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-primary/5 px-4 py-3"
              >
                <span className="mt-0.5 inline-flex flex-shrink-0 items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-primary">
                  {item.label}
                </span>
                <span className="text-[15px] font-semibold text-text/90">{item.text}</span>
              </li>
            ))}
          </ul>

          {/* 強み3カード（常時展開） */}
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {PAIRS_MOBILE.map((pair) => (
              <article
                key={pair.id}
                className="flex h-full flex-col rounded-3xl border border-primary/10 bg-primary/5 p-6 text-left shadow-sm shadow-primary/5"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent/80">
                  {pair.strength.badge}
                </div>
                <h3 className="mt-2 text-lg font-bold text-primary">{pair.strength.headline}</h3>
                <p className="mt-2 text-[13.5px] font-semibold text-text/80">
                  {pair.strength.summary}
                </p>
                <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-text/80">
                  {pair.strength.detail}
                </p>
                <a
                  href={CTA_HREF}
                  onClick={() => onCTA(pair.id)}
                  className="mt-5 inline-flex items-center gap-1 text-[13.5px] font-semibold text-primary transition hover:translate-x-0.5"
                >
                  {CTA_LABEL}
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
