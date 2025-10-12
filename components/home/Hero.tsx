'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!titleRef.current || !sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // --- 要素参照（section 内に限定して衝突回避） ---
      const section = sectionRef.current!;
      const $ = <T extends HTMLElement = HTMLElement>(sel: string) =>
        Array.from(section.querySelectorAll<T>(sel));

      const primaryBlob = section.querySelector<HTMLElement>('[data-blob-id="primary"]');
      const allBlobs = $<HTMLElement>('[data-blob-id]');
      const secondaryBlobs = allBlobs.filter((b) => b.dataset.blobId !== 'primary');
      if (!primaryBlob || allBlobs.length === 0) {
        return;
      }

      // 座標ユーティリティ（ビューポート基準の中心座標）
      const center = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      };
      const sectionRect = () => section.getBoundingClientRect();
      const targetPoint = () => {
        const r = sectionRect();
        return { x: r.left + r.width * 0.75, y: r.top + r.height * 0.5 };
      };

      // --- 初期状態 ---

      // 朧げ感（Tailwindのblurと競合しても最終的にこちらが効くよう filter を明示）
      gsap.set(allBlobs, {
        opacity: 0,
        x: 0,
        y: 0,
        xPercent: 0,
        yPercent: 0,
        filter: 'blur(90px)',
        willChange: 'transform, filter, opacity',
      });

      // 浮遊は xPercent/yPercent のみ（あとで x/y を使う収束と干渉させない）
      const floatTweens: gsap.core.Tween[] = allBlobs.map((blob) =>
        gsap.to(blob, {
          xPercent: () => gsap.utils.random(-4, 4),
          yPercent: () => gsap.utils.random(-4, 4),
          scale: () => gsap.utils.random(0.95, 1.05),
          duration: () => (prefersReducedMotion ? gsap.utils.random(2.5, 3.5) : gsap.utils.random(3.5, 5.5)),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          paused: true,
        }),
      );

      let breathingTween: gsap.core.Tween | null = null;

      const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

      // --- フェーズ1: 浮遊の可視化 ---
      tl.addLabel('float-intro')
        .to(allBlobs, {
          opacity: 0.65,
          duration: prefersReducedMotion ? 0.6 : 1.0,
          stagger: 0.2,
          onStart: () => floatTweens.forEach((t) => t.play()),
        })
        .to({}, { duration: prefersReducedMotion ? 0.8 : 1.6 });

      // --- フェーズ2: 収束（secondary → primary 中心へ吸着しつつ消失） ---
      tl.addLabel('converge-start').add(() => {
        floatTweens.forEach((t) => t.pause());
      }, 'converge-start');

      tl.to(
        secondaryBlobs,
        {
          x: (_i, el) => {
            const p = center(primaryBlob);
            const s = center(el as HTMLElement);
            return `+=${p.x - s.x}`;
          },
          y: (_i, el) => {
            const p = center(primaryBlob);
            const s = center(el as HTMLElement);
            return `+=${p.y - s.y}`;
          },
          opacity: 0,
          scale: prefersReducedMotion ? 0.6 : 0.45,
          duration: prefersReducedMotion ? 1.0 : 1.4,
          stagger: 0.2,
          ease: 'power2.inOut',
        },
        'converge-start',
      );

      // primary 自身はセクションの 75% / 50% へ移動（left/top は触らず x/y で相対移動）
      tl.to(
        primaryBlob,
        {
          x: () => {
            const tgt = targetPoint();
            const p = center(primaryBlob);
            return `+=${tgt.x - p.x}`;
          },
          y: () => {
            const tgt = targetPoint();
            const p = center(primaryBlob);
            return `+=${tgt.y - p.y}`;
          },
          duration: prefersReducedMotion ? 0.9 : 1.2,
          ease: 'power2.inOut',
        },
        'converge-start',
      );

      // --- フェーズ3: 鮮明化 ---
      tl.to(primaryBlob, {
        filter: 'blur(40px)',
        width: '25rem',
        height: '25rem',
        opacity: 0.85,
        duration: prefersReducedMotion ? 0.8 : 1.1,
        ease: 'power2.out',
      });

      // --- フェーズ5: 最終の呼吸 ---
      tl.eventCallback('onComplete', () => {
        floatTweens.forEach((t) => t.kill());
        breathingTween = gsap.to(primaryBlob, {
          scale: prefersReducedMotion ? 1.03 : 1.08,
          y: prefersReducedMotion ? '-=4' : '-=6',
          duration: prefersReducedMotion ? 4.0 : 4.5,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });
      });

      // スクロールサイン（TL 完了後に開始）
      gsap.to("[data-animate='scroll-cue']", {
        y: 10,
        opacity: 0.35,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: tl.duration(),
      });

      return () => {
        floatTweens.forEach((t) => t.kill());
        breathingTween?.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative overflow-hidden bg-base text-primary"
      aria-label="Hero"
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          data-blob-id="1"
          className="absolute -left-24 -top-40 h-[28rem] w-[28rem] rounded-full blur-[70px]"
          style={{
            opacity: 0,
            background: 'radial-gradient(55% 55% at 50% 50%, rgba(0, 89, 79, 0.75), transparent)',
          }}
        />
        <div
          data-blob-id="2"
          className="absolute -right-48 top-[-4rem] h-[32rem] w-[32rem] rounded-full blur-[80px]"
          style={{
            opacity: 0,
            background: 'radial-gradient(60% 60% at 50% 50%, rgba(139, 197, 63, 0.68), transparent)',
          }}
        />
        <div
          data-blob-id="primary"
          className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
          style={{
            opacity: 0,
            background: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 89, 79, 0.58), transparent)',
          }}
        />
        <div
          data-blob-id="4"
          className="absolute left-[12%] bottom-[-6rem] h-[24rem] w-[24rem] rounded-full blur-[85px]"
          style={{
            opacity: 0,
            background: 'radial-gradient(55% 55% at 50% 50%, rgba(0, 89, 79, 0.4), transparent)',
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[70vh] max-w-4xl px-4 pb-24 pt-32 md:flex-row md:items-center">
        <div className="flex-1 space-y-6 md:flex-[1.6]">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            オーダーメイドAIシステム開発
          </span>
          <h1
            ref={titleRef}
            className="whitespace-pre-wrap text-3xl font-bold leading-tight tracking-tight text-primary md:text-5xl"
          >
            AIシステム開発の失敗リスクをゼロに
            {'\n'}
            効果が見えるまで費用負担なし
          </h1>
          <p
            data-animate="hero-lead"
            className="max-w-xl text-base text-text/80 md:text-lg"
          >
            PoC成功まで固定費ゼロ。要件整理から運用まで伴走し、成果が出たら課金する成功報酬モデルで導入障壁を取り除きます。
          </p>
          <div className="flex flex-col gap-4 sm:flex-row" data-animate="hero-cta">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/80"
            >
              相談する
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-primary px-6 py-3 text-base font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/40"
            >
              サービスを見る
            </a>
          </div>
        </div>
        <div className="flex-1 md:flex-[0.4]" />
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-sm text-text/60 md:flex">
        <span>Scroll</span>
        <span
          data-animate="scroll-cue"
          className="block h-10 w-px rounded-full bg-text/30"
        />
      </div>
    </section>
  );
}
