'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { gsap } from 'gsap';
import { track } from '@/lib/analytics';

type SegmentVariant = 'core' | 'usecase' | 'default';

const CTA_LABEL = {
  core: '無料で相談する（30分）',
  usecase: 'システム開発事例を見る',
  default: '無料で相談する（30分）',
} satisfies Record<SegmentVariant, string>;

const CTA_HREF = {
  core: '#contact',
  usecase: '#usecases',
  default: '#contact',
} satisfies Record<SegmentVariant, string>;

export default function Hero() {
  const searchParams = useSearchParams();
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const seg = searchParams.get('seg');
  const ctaVariant: SegmentVariant = seg === 'core' || seg === 'usecase' ? (seg as SegmentVariant) : 'default';
  const heroCtaLabel = CTA_LABEL[ctaVariant];
  const heroCtaHref = CTA_HREF[ctaVariant];

  useEffect(() => {
    track('seg_impression', { variant: ctaVariant });
  }, [ctaVariant]);

  useLayoutEffect(() => {
    if (!titleRef.current || !sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const $ = <T extends HTMLElement = HTMLElement>(sel: string) =>
        Array.from(section.querySelectorAll<T>(sel));

      const primaryBlob = section.querySelector<HTMLElement>('[data-blob-id="primary"]');
      const allBlobs = $<HTMLElement>('[data-blob-id]');
      const secondaryBlobs = allBlobs.filter((b) => b.dataset.blobId !== 'primary');
      
      if (!primaryBlob || allBlobs.length === 0) return;

      const center = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      };
      const sectionRect = () => section.getBoundingClientRect();
      const targetPoint = () => {
        const r = sectionRect();
        const isMobile = window.innerWidth < 768;
        return { 
          x: r.left + r.width * (isMobile ? 0.5 : 0.75), 
          y: r.top + r.height * (isMobile ? 0.4 : 0.5) 
        };
      };

      gsap.set(allBlobs, {
        opacity: 0,
        x: 0,
        y: 0,
        xPercent: 0,
        yPercent: 0,
        filter: 'blur(90px)',
        willChange: 'transform, filter, opacity',
      });

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

      tl.addLabel('float-intro')
        .to(allBlobs, {
          opacity: 0.65,
          duration: prefersReducedMotion ? 0.6 : 1.0,
          stagger: 0.2,
          onStart: () => floatTweens.forEach((t) => t.play()),
        })
        .to({}, { duration: prefersReducedMotion ? 0.8 : 1.6 });

      tl.addLabel('converge-start').add(() => {
        floatTweens.forEach((t) => t.pause());
      }, 'converge-start');

      tl.to(secondaryBlobs, {
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
        }, 'converge-start');

      tl.to(primaryBlob, {
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
        }, 'converge-start');

      tl.to(primaryBlob, {
        filter: 'blur(80px)',
        width: '28rem',
        height: '28rem',
        opacity: 0.85,
        duration: prefersReducedMotion ? 0.8 : 1.1,
        ease: 'power2.out',
      });

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

      gsap.to("[data-animate='scroll-cue']", {
        y: 8,
        opacity: 0.6,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: tl.duration(),
      });

      gsap.fromTo("[data-animate='fade-in-up']", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.5, ease: 'power2.out' }
      );

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
      className="relative -mt-28 overflow-hidden bg-base text-primary min-h-[100dvh] flex items-center"
      aria-label="Hero"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div data-blob-id="1" className="absolute -left-24 -top-40 h-[28rem] w-[28rem] rounded-full blur-[70px]" style={{ opacity: 0, background: 'radial-gradient(55% 55% at 50% 50%, rgba(0, 89, 79, 0.85), rgba(20, 132, 118, 0.38) 65%, transparent 100%)' }} />
        <div data-blob-id="2" className="absolute -right-48 top-[-4rem] h-[32rem] w-[32rem] rounded-full blur-[80px]" style={{ opacity: 0, background: 'radial-gradient(60% 60% at 42% 45%, rgba(139, 197, 63, 0.72), rgba(0, 89, 79, 0.42) 55%, transparent 100%)' }} />
        <div data-blob-id="primary" className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]" style={{ opacity: 0, background: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 89, 79, 0.62), rgba(16, 124, 108, 0.4) 60%, rgba(139, 197, 63, 0.24) 85%, transparent 100%)' }} />
        <div data-blob-id="4" className="absolute left-[12%] bottom-[-6rem] h-[24rem] w-[24rem] rounded-full blur-[85px]" style={{ opacity: 0, background: 'radial-gradient(55% 55% at 48% 52%, rgba(38, 124, 111, 0.5), rgba(0, 89, 79, 0.34) 60%, rgba(139, 197, 63, 0.22) 85%, transparent 100%)' }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-20 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="flex-[1.5] space-y-8 md:space-y-10">
            <div data-animate="fade-in-up" className="inline-flex">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/60 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-primary shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                オーダーメイドAIシステム開発
              </span>
            </div>

            <h1 ref={titleRef} data-animate="fade-in-up" className="font-bold leading-[1.15] tracking-tight text-primary">
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 md:mb-4">
                AI開発のリスクを
                <span className="relative whitespace-nowrap text-primary/90">
                   ゼロにする
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-accent/40 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary/80 font-medium">
                効果が見えるまで費用負担なし
              </span>
            </h1>

            <p data-animate="fade-in-up" className="max-w-xl text-base leading-relaxed text-text/80 md:text-lg">
              消費財メーカー・財団法人・税理士法人など実績多数。<br />
              中堅・中小企業の経営課題を、リスクのないAI開発で解決します。
            </p>

            <div data-animate="fade-in-up" className="flex flex-col gap-4 sm:flex-row">
              <a
                href={heroCtaHref}
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary/90 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                onClick={() => track('cta_click', { location: 'hero', variant: ctaVariant, href: heroCtaHref })}
              >
                <span className="relative z-10">{heroCtaLabel}</span>
                <svg className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
              </a>
              <a href="#usecases" className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-primary/30 bg-white/50 backdrop-blur-sm px-8 py-4 text-base font-bold text-primary transition-all hover:bg-white/80 hover:border-primary/50">
                事例を見る
              </a>
            </div>
          </div>
          <div className="hidden md:block md:flex-[1]" />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs font-medium tracking-widest text-primary/60 uppercase">
        <span>Scroll</span>
        <div className="h-12 w-[1px] overflow-hidden bg-primary/20">
          <div data-animate="scroll-cue" className="h-1/2 w-full bg-primary"></div>
        </div>
      </div>
    </section>
  );
}
