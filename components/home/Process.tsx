import type { ReactNode } from "react";

type Step = {
  step: string;
  title: ReactNode;
  description: string;
  icon: ReactNode;
};

const STEPS: Step[] = [
  {
    step: "STEP 1",
    title: "ヒアリング",
    description:
      "まずはお気軽に、現状の課題やAIで実現したいことをお聞かせください。",
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
    step: "STEP 2",
    title: (
      <>
        試作AIシステム
        <br />
        無料開発
      </>
    ),
    description:
      "貴社課題を解決するAIシステムを試作開発。試作システムで効果を確かめていただきます。",
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
    step: "STEP 3",
    title: (
      <>
      試作AIシステム
      <br />
      評価
    </>
    ),
    description:
      "事前に合意した評価基準に基づき、本開発に進むかを判定いただきます。",
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
        <rect height="30" rx="3" width="22" x="13" y="9" />
        <path d="M19 17h10M19 23h10" />
        <path d="m19 29 5 5 6-8" />
      </svg>
    ),
  },
  {
    step: "STEP 4",
    title:  (
      <>
      本開発
      <br />
      運用開始
    </>
    ),
    description:
      "導入完了まで責任を持って開発し、運用をスタートします。",
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

const CONTRACT_LABEL = "ご契約";

function StepCard({ step, title, description, icon }: Step) {
  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-2xl border border-primary/10 bg-white px-2 py-8 text-center shadow-sm sm:px-8 sm:py-10 lg:flex-1 lg:min-w-0 lg:px-4 lg:py-8">
      <span className="font-semibold tracking-wide text-accent">
        {step}
      </span>
      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-primary/20 bg-primary/5">
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-primary md:text-xl">
          {title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-text/80">{description}</p>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex shrink-0 flex-col items-center justify-center py-2 lg:flex-row lg:self-stretch lg:px-1.5 lg:py-0">
      <svg
        aria-hidden="true"
        className="hidden h-6 w-6 text-primary lg:block"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <polygon points="8,5 18,12 8,19" />
      </svg>
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
        ご契約
      </span>
    </div>
  );
}


export default function Process() {
  return (
    <section id="process" className="bg-white/90">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-8 lg:px-12">
        <h2 className="text-2xl font-bold text-primary md:text-3xl">
          システム開発・導入までの流れ
        </h2>
        <div className="mt-10 flex flex-col items-center gap-0.5 lg:flex-row lg:flex-nowrap lg:items-stretch lg:justify-between lg:gap-0.5">
          <StepCard {...STEPS[0]} />
          <FlowArrow />
          <StepCard {...STEPS[1]} />
          <FlowArrow />
          <StepCard {...STEPS[2]} />
          <FlowArrow />
          <ContractBlock />
          <FlowArrow />
          <StepCard {...STEPS[3]} />
        </div>
        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-flex min-w-[12rem] items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow transition hover:bg-primary/90"
          >
            相談する
          </a>
        </div>
      </div>
    </section>
  );
}
