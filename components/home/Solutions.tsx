'use client';

import { ReactNode, useState } from "react";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

const CTA_LABEL = "無料で相談する（30分） >";
const CTA_HREF = "#contact";

type Strength = {
  id: string;
  badge: string;
  highlight: string;
  summary: string;
  detail: ReactNode;
};

const STRENGTHS: Strength[] = [
  {
    id: "support",
    badge: "① 伴走支援",
    highlight: "コンサルタントがAI活用構想の策定支援",
    summary: "要件定義〜運用まで伴走。投資効果最大化するAI活用案を共に設計。",
    detail: (
      <>
        数々の企業のDXを推進してきた経験を基に、御社のビジネスへの理解とAIの最新技術動向を踏まえ、AI活用案を伴に描きます。
        <span className="font-semibold text-primary"> ビジネスを成功に導くパートナー</span>として、技術だけでなく経営の視点から最適なAI活用をご提案します。
      </>
    ),
  },
  {
    id: "no-risk",
    badge: "② リスクゼロ",
    highlight: "効果確認まで費用不要。無料でAIシステムを試作開発。",
    summary: "効果が見えるまで費用は不要。AI導入の可否を無償試作で判断できます。",
    detail: (
      <>
        「AIは本当に効果があるのか？」という疑問にお応えするため、無償でAIシステムを試作開発します。プロトタイプを用いてAIが課題解決に役立つかをご判断ください。
        <span className="font-semibold text-primary"> 効果をご確認いただけなかった場合、費用は一切いただきません。</span>
      </>
    ),
  },
  {
    id: "cost",
    badge: "③ 低価格",
    highlight: "大手の約1/5。開発総費用300〜600万円。",
    summary: "中間コストを削減し精鋭チームで開発。より高い成果をより安く。",
    detail: (
      <>
        大手開発企業で発生する営業・管理などの中間コストをカット。少数精鋭チームでの開発により、総開発費用は業界最安値水準の
        <span className="font-semibold text-primary"> 300～600万円</span>を実現。
        <span className="font-semibold text-primary"> 大手の約1/5</span>のコストで業務課題を解決するオリジナルAIシステムを開発します。
      </>
    ),
  },
];

function sendAnalyticsEvent(eventName: string, params: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", eventName, params);
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...params });
  }
}

export default function StrengthHighlights() {
  const [openId, setOpenId] = useState<string | null>(STRENGTHS[0]?.id ?? null);

  const handleToggle = (id: string) => {
    setOpenId((prev) => {
      const next = prev === id ? null : id;
      if (next === id && prev !== id) {
        sendAnalyticsEvent(`accordion_open:${id}`, { id });
      }
      return next;
    });
  };

  const handleCta = (id: string) => {
    sendAnalyticsEvent(`accordion_cta_click:${id}`, { id, href: CTA_HREF });
  };

  return (
    <div>
      <div className="space-y-4 md:hidden">
        {STRENGTHS.map((strength) => {
          const isOpen = openId === strength.id;

          return (
            <div
              key={strength.id}
              className="rounded-3xl border border-primary/10 bg-white/90 shadow-sm shadow-primary/5"
            >
              <button
                type="button"
                className="flex w-full items-start justify-between gap-4 rounded-3xl px-5 py-5 text-left"
                aria-expanded={isOpen}
                onClick={() => handleToggle(strength.id)}
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent/70">
                    {strength.badge}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-primary">{strength.highlight}</h3>
                  <p className="mt-2 text-sm font-semibold text-text/80">{strength.summary}</p>
                </div>
                <span
                  aria-hidden="true"
                  className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-primary/30 text-primary transition ${isOpen ? 'bg-primary/5' : ''}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </button>
              {isOpen && (
                <div className="border-t border-primary/10 px-5 pb-5 pt-2 text-sm text-text/80">
                  <p className="mt-3 leading-relaxed">{strength.detail}</p>
                  <a
                    href={CTA_HREF}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                    onClick={() => handleCta(strength.id)}
                  >
                    {CTA_LABEL}
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="hidden gap-5 md:grid md:grid-cols-3">
        {STRENGTHS.map((strength) => (
          <article
            key={strength.id}
            className="flex h-full flex-col rounded-3xl border border-primary/10 bg-primary/5 p-6 text-left shadow-sm shadow-primary/5"
          >
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-accent/70">
              {strength.badge}
            </div>
            <h3 className="mt-3 text-xl font-bold text-primary">{strength.highlight}</h3>
            <p className="mt-2 text-sm font-semibold text-text/80">{strength.summary}</p>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-text/80">{strength.detail}</p>

            <a
              href={CTA_HREF}
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:translate-x-0.5"
              onClick={() => {
                sendAnalyticsEvent(`accordion_cta_click:${strength.id}`, { id: strength.id, href: CTA_HREF });
              }}
            >
              {CTA_LABEL}
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
