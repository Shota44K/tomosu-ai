'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { track } from '@/lib/analytics';

type Step = {
  step: string;
  title: ReactNode;
  description: string;
  icon: ReactNode;
};

const STEPS: Step[] = [
  {
    step: 'STEP 1',
    title: 'ヒアリング',
    description:
      '現状の課題やAIで実現したいことをお聞かせください。',
    icon: (
      <svg
        aria-hidden="true"
        className="h-14 w-14 text-primary"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        viewBox="0 0 48 48"
      >
        <rect height="32" rx="3" width="24" x="12" y="8" />
        <path d="M18 16h12M18 22h12M18 28h7M26.5 35.5L30 32" />
        <path d="M24 35.5 30 32l1.5 4.5-3 2z" />
      </svg>
    ),
  },
  {
    step: 'STEP 2',
    title: 'AIシステム試作開発（無料）',
    description:
      'PoCとしてAIシステムを試作開発します。モックアップを通して効果を確かめていただきます。',
    icon: (
      <svg
        aria-hidden="true"
        className="h-14 w-14 text-primary"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        viewBox="0 0 48 48"
      >
        <rect height="24" rx="3" width="36" x="6" y="10" />
        <path d="M18 38h12M22 34v4" />
        <path d="M16 18h16l-6 6-4-4-6 6z" />
      </svg>
    ),
  },
  {
    step: 'STEP 3',
    title: '本開発・運用',
    description:
      '試作開発成果を踏まえて本開発を行います。開発完了後、運用をスタートします。',
    icon: (
      <svg
        aria-hidden="true"
        className="h-14 w-14 text-primary"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        viewBox="0 0 48 48"
      >
        <circle cx="24" cy="24" r="6" />
        <path d="M24 12V7M24 41v-5M36 24h5M7 24h5M33.5 14.5l3.5-3.5M10.5 33.5l3.5-3.5M14 14l3.5 3.5M30.5 30.5 34 34" />
      </svg>
    ),
  },
];

const CONTRACT_LABEL = 'ご契約';

/* =========================
 * Mobile（md未満）専用：タイムライン型UI（アコーディオン対応）
 * ========================= */
function MobileStepItem({
  step,
  title,
  description,
  icon,
  isLast = false,
  open,
  onToggle,
}: Step & { isLast?: boolean; open: boolean; onToggle: () => void }) {
  return (
    <div className="relative mb-0.5">
      {/* アコーディオンヘッダー */}
      <button
        onClick={onToggle}
        className="relative w-full rounded-2xl border border-primary/15 bg-white p-3 shadow-sm text-left transition-all hover:shadow-lg"
      >
        <div className="flex items-center gap-4">
          {/* 左アイコン */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary/25 bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm [&>svg]:h-6 [&>svg]:w-6">
            {icon}
          </div>
          <div className="flex flex-1 flex-col gap-0.5">
            <span className="text-xs font-bold tracking-wider text-accent uppercase">
              {step}
            </span>
            <h3 className="text-base font-bold leading-tight text-primary">{title}</h3>
          </div>
          {/* 折りたたみアイコン */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-4 w-4 shrink-0 text-primary transition-transform ${
              open ? 'rotate-180' : ''
            }`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>

        {/* アコーディオンコンテンツ */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="mt-4 pt-4 border-t border-primary/10 text-sm leading-relaxed text-text/75">
            {description}
          </p>
        </div>
      </button>

      {/* 下方向への縦ライン（最後の要素以外に表示） */}
      {/* {!isLast && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[2.25rem] top-[4.5rem] w-0.5 bg-gradient-to-b from-primary/30 to-primary/15"
          style={{ height: 'calc(100% - 3rem)' }}
        />
      )} */}
    </div>
  );
}

function MobileContractDivider() {
  return (
    <div className="relative flex min-h-16 items-center justify-center">
      {/* 上の縦ライン接続 */}
      {/* <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[2.25rem] top-0 h-6 w-0.5 bg-gradient-to-b from-primary/15 to-primary/30"
      /> */}
      {/* 下の縦ライン接続 */}
      {/* <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[2.25rem] bottom-0 h-6 w-0.5 bg-gradient-to-b from-primary/30 to-primary/15"
      /> */}
      <div className="inline-flex items-center justify-center rounded-2xl border-1 border-primary/15 bg-white p-3 shadow-sm text-left transition-all hover:shadow-lg w-full">
        <span className="text-sm font-bold tracking-wide text-primary">{CONTRACT_LABEL}</span>
      </div>
    </div>
  );
}

/* =========================
 * PC用（md以上）：従来の横並びフロー
 * ========================= */
function StepCard({ step, title, description, icon }: Step) {
  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-2xl border border-primary/10 bg-white px-2 py-8 text-center shadow-sm sm:px-8 sm:py-10 lg:flex-1 lg:min-w-0 lg:px-4 lg:py-8">
      <span className="font-semibold tracking-wide text-accent">{step}</span>
      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-primary/20 bg-primary/5">
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-primary md:text-xl">{title}</h3>
      </div>
      <p className="text-sm leading-relaxed text-text/80">{description}</p>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex shrink-0 flex-col items-center justify-center lg:flex-row lg:self-stretch lg:px-1.5 lg:py-0 md:mb-0.5">
      {/* PC矢印（横向き） */}
      <svg
        aria-hidden="true"
        className="hidden h-6 w-6 text-primary lg:block"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <polygon points="8,5 18,12 8,19" />
      </svg>
      {/* モバイル矢印はタイムライン化で不要のため非表示 */}
      <svg
        aria-hidden="true"
        className="h-6 w-6 text-primary lg:hidden"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <polygon points="6,10 12,18 18,10" />
      </svg>
    </div>
  );
}

function ContractBlock() {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-primary/10 bg-white px-4 py-1.5 text-center shadow-sm sm:px-6 sm:py-2.5 lg:w-auto lg:min-w-[3.0rem] lg:px-1 lg:py-3">
      <span className="font-bold text-primary lg:[writing-mode:vertical-rl] lg:tracking-[0.15em] lg:leading-tight">
        {CONTRACT_LABEL}
      </span>
    </div>
  );
}

export default function Process() {
  const [openMobileStep, setOpenMobileStep] = useState<string | null>(null);

  const toggleMobileStep = (id: string) => {
    setOpenMobileStep((prev) => {
      const next = prev === id ? null : id;
      if (next) {
        track('process_step_open', { step: next });
      }
      return next;
    });
  };

  return (
    <section id="process" className="bg-white/90">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-8 lg:px-12">
        <header className="mb-9 text-center md:text-left">


          <span className="mb-9 inline-flex w-full max-w-[16rem] items-center justify-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            AIシステム開発の流れ
          </span>
          <h2 className="text-2xl font-bold text-primary md:text-3xl">
            <span className="hidden md:inline">ヒアリングから本開発完了まで平均3ヵ月</span>
            <span className="block md:hidden">ヒアリングから</span>
            <span className="block md:hidden">本開発完了まで平均3ヵ月</span>

          </h2>
        </header>

        {/* ====== モバイル（縦タイムライン・アコーディオン） ====== */}
        <div className="mt-8 space-y-3 md:hidden">
          <MobileStepItem
            {...STEPS[0]}
            open={openMobileStep === STEPS[0].step}
            onToggle={() => toggleMobileStep(STEPS[0].step)}
          />
          <FlowArrow />
          <MobileStepItem
            {...STEPS[1]}
            open={openMobileStep === STEPS[1].step}
            onToggle={() => toggleMobileStep(STEPS[1].step)}
          />
          <FlowArrow />
          <MobileStepItem
            {...STEPS[2]}
            isLast
            open={openMobileStep === STEPS[2].step}
            onToggle={() => toggleMobileStep(STEPS[2].step)}
          />
        </div>

        {/* ====== PC（従来の横並びフロー） ====== */}
        <div className="mt-10 hidden flex-col items-center gap-0.5 md:flex lg:flex-row lg:flex-nowrap lg:items-stretch lg:justify-between lg:gap-0.5">
          <StepCard {...STEPS[0]} />
          <FlowArrow />
          <StepCard {...STEPS[1]} />
          {/* <FlowArrow /> */}
          {/* <ContractBlock /> */}
          <FlowArrow />
          <StepCard {...STEPS[2]} />
        </div>

        {/* CTA（PCのみ表示） */}
        <div className="hidden mt-10 text-center md:block">
          <a
            href="#contact"
            className="hidden min-w-[12rem] items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow transition hover:bg-primary/90 md:inline-flex"
            onClick={() => track('cta_click', { location: 'process', to: '#contact' })}
          >
            無料で相談する（30分） &gt;
          </a>
        </div>
      </div>
    </section>
  );
}
