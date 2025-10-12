'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!titleRef.current || !sectionRef.current) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    const ctx = gsap.context(() => {
      // --- 要素の参照を取得 ---
      const split = new SplitType(titleRef.current!, { types: 'lines' });
      const lines = split.lines ?? [];
      const lineContents = lines.map((line) => line.children[0] ?? line);

      const primaryBlob = sectionRef.current?.querySelector(
        '[data-blob-id="primary"]',
      ) as HTMLElement | null;
      if (!primaryBlob) {
        split.revert();
        return;
      }
      const allBlobs = gsap.utils.toArray<HTMLElement>('[data-blob-id]');
      const secondaryBlobs = allBlobs.filter((blob) => blob.dataset.blobId !== 'primary');

      let breathingTween: gsap.core.Tween | null = null;

      // --- フェーズ0: 初期状態設定 ---
      gsap.set(lines, { overflow: 'hidden' });
      gsap.set(lineContents, { yPercent: 120 });
      gsap.set("[data-animate='hero-lead']", { opacity: 0, y: 20 });
      gsap.set("[data-animate='hero-cta'] > *", { opacity: 0, y: 18 });

      if (prefersReducedMotion) {
        gsap.set(allBlobs, { opacity: 0.75 });
        gsap.set(secondaryBlobs, { opacity: 0 });
        gsap.set(primaryBlob, {
          left: '75%',
          top: '50%',
          translateX: '-50%',
          translateY: '-50%',
          filter: 'blur(40px)',
          width: '25rem',
          height: '25rem',
          opacity: 0.85,
        });
        gsap.set(lineContents, { yPercent: 0 });
        gsap.set("[data-animate='hero-lead']", { opacity: 1, y: 0 });
        gsap.set("[data-animate='hero-cta'] > *", { opacity: 1, y: 0 });
        return () => {
          split.revert();
        };
      }

      gsap.set(allBlobs, { opacity: 0, xPercent: 0, yPercent: 0 });

      const floatTweens: gsap.core.Tween[] = allBlobs.map((blob) =>
        gsap.to(blob, {
          xPercent: () => gsap.utils.random(-4, 4),
          yPercent: () => gsap.utils.random(-4, 4),
          scale: () => gsap.utils.random(0.92, 1.06),
          duration: () => gsap.utils.random(3.5, 5.5),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          overwrite: false,
          paused: true,
        }),
      );

      const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

      // --- フェーズ1: 浮遊状態の可視化 ---
      tl.addLabel('float-intro')
        .to(allBlobs, {
          opacity: 0.65,
          duration: 1,
          stagger: 0.2,
          onComplete: () => {
            floatTweens.forEach((tween) => tween.play());
          },
        })
        .to({}, { duration: 1.6 });

      // --- フェーズ2: 収束 (Convergence) ---
      tl.add(() => {
        floatTweens.forEach((tween) => tween.pause());
      }, 'converge-start');

      tl.to(
        secondaryBlobs,
        {
          left: '75%',
          top: '50%',
          translateX: '-50%',
          translateY: '-50%',
          opacity: 0,
          scale: 0.45,
          duration: 1.4,
          stagger: 0.2,
          ease: 'power2.inOut',
        },
        'converge-start',
      );

      tl.to(
        primaryBlob,
        {
          left: '75%',
          top: '50%',
          translateX: '-50%',
          translateY: '-50%',
          duration: 1.2,
          ease: 'power2.inOut',
        },
        'converge-start',
      );

      // --- フェーズ3: 鮮明化 (Sharpening) ---
      tl.to(primaryBlob, {
        filter: 'blur(40px)',
        width: '25rem',
        height: '25rem',
        opacity: 0.85,
        duration: 1.1,
        ease: 'power2.out',
      });

      // --- フェーズ4: テキストとの連動 ---
      tl.to(
        lineContents,
        {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
        },
        '-=0.7',
      )
        .to(
          "[data-animate='hero-lead']",
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          },
          '-=0.4',
        )
        .to(
          "[data-animate='hero-cta'] > *",
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
          },
          '-=0.3',
        );

      // --- フェーズ5: 最終状態のループアニメーション ---
      tl.eventCallback('onComplete', () => {
        floatTweens.forEach((tween) => tween.kill());
        breathingTween = gsap.to(primaryBlob, {
          scale: 1.08,
          y: '-6%',
          duration: 4.5,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });
      });

      // スクロールサインのアニメーション
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
        floatTweens.forEach((tween) => tween.kill());
        breathingTween?.kill();
        split.revert();
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

      <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col gap-10 px-4 pb-24 pt-32 md:flex-row md:items-center">
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
          <div
            className="flex flex-col gap-4 sm:flex-row"
            data-animate="hero-cta"
          >
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