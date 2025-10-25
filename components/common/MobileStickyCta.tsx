'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

type StickyHideReason = 'contact_in_view' | 'form_focus' | 'keyboard';
type SegmentVariant = 'core' | 'usecase' | 'default';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

const CTA_LABEL = {
  core: '無料で相談する（30分）',
  usecase: 'ユースケースを見る',
  default: '無料で相談する（30分）',
} satisfies Record<SegmentVariant, string>;

const CTA_HREF = {
  core: '#contact',
  usecase: '#usecases',
  default: '#contact',
} satisfies Record<SegmentVariant, string>;

const HIDE_DEBOUNCE_MS = 100;
const SHOW_DELAY_MS = 600;
const KEYBOARD_THRESHOLD = 150;

function sendAnalyticsEvent(name: string, params: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', name, params);
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...params });
  }
}

export default function MobileStickyCta() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [hideByContact, setHideByContact] = useState(false);
  const [hideByFocus, setHideByFocus] = useState(false);
  const [hideByKeyboard, setHideByKeyboard] = useState(false);
  const prevVisibleRef = useRef(false);
  const focusOutTimeoutRef = useRef<number | null>(null);
  const viewportBaseHeightRef = useRef<number | null>(null);

  const variant: SegmentVariant = useMemo(() => {
    const seg = searchParams?.get('seg');
    if (seg === 'core') return 'core';
    if (seg === 'usecase') return 'usecase';
    return 'default';
  }, [searchParams]);

  const label = CTA_LABEL[variant];
  const href = CTA_HREF[variant];

  const isVisible = ready && !hideByContact && !hideByFocus && !hideByKeyboard;

  useEffect(() => {
    let mounted = true;
    const timers: number[] = [];
    const cleanupFns: Array<() => void> = [];

    const clearTimers = () => {
      timers.forEach((t) => window.clearTimeout(t));
      timers.length = 0;
    };

    timers.push(
      window.setTimeout(() => {
        if (!mounted) return;
        setReady(true);
      }, SHOW_DELAY_MS),
    );

    const contactEl = document.querySelector('#contact');
    let io: IntersectionObserver | null = null;
    let ioTimeout: number | null = null;

    if (contactEl) {
      io = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          if (ioTimeout) window.clearTimeout(ioTimeout);
          ioTimeout = window.setTimeout(() => {
            setHideByContact(entry.isIntersecting && entry.intersectionRatio >= 0.2);
          }, HIDE_DEBOUNCE_MS);
        },
        { threshold: [0, 0.2] },
      );
      io.observe(contactEl);

      cleanupFns.push(() => {
        if (ioTimeout) window.clearTimeout(ioTimeout);
        io?.disconnect();
      });
    }

    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const tag = target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
        setHideByFocus(true);
      }
    };

    const handleFocusOut = () => {
      if (focusOutTimeoutRef.current) {
        window.clearTimeout(focusOutTimeoutRef.current);
      }
      focusOutTimeoutRef.current = window.setTimeout(() => {
        const active = document.activeElement as HTMLElement | null;
        if (!active) {
          setHideByFocus(false);
          return;
        }
        const tag = active.tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT') {
          setHideByFocus(false);
        }
      }, HIDE_DEBOUNCE_MS);
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    cleanupFns.push(() => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      if (focusOutTimeoutRef.current) {
        window.clearTimeout(focusOutTimeoutRef.current);
        focusOutTimeoutRef.current = null;
      }
    });

    const vv = window.visualViewport;
    let viewportTimeout: number | null = null;

    if (vv) {
      viewportBaseHeightRef.current = viewportBaseHeightRef.current ?? vv.height;

      const handleViewportResize = () => {
        if (viewportTimeout) window.clearTimeout(viewportTimeout);
        viewportTimeout = window.setTimeout(() => {
          const baseHeight = viewportBaseHeightRef.current ?? vv.height;
          if (viewportBaseHeightRef.current === null) {
            viewportBaseHeightRef.current = vv.height;
          }
          const shrink = baseHeight - vv.height;
          setHideByKeyboard(shrink > KEYBOARD_THRESHOLD);
        }, HIDE_DEBOUNCE_MS);
      };

      vv.addEventListener('resize', handleViewportResize);

      // Android では scroll イベントで変化するケースがあるため
      vv.addEventListener('scroll', handleViewportResize);

      const cleanupViewport = () => {
        if (viewportTimeout) window.clearTimeout(viewportTimeout);
        vv.removeEventListener('resize', handleViewportResize);
        vv.removeEventListener('scroll', handleViewportResize);
      };

      cleanupFns.push(cleanupViewport);
    }

    cleanupFns.push(() => {
      clearTimers();
      mounted = false;
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  useEffect(() => {
    const prevVisible = prevVisibleRef.current;
    const segForTracking = variant === 'default' ? 'core' : variant;
    if (!prevVisible && isVisible) {
      sendAnalyticsEvent('sticky_show', { seg: segForTracking, path: pathname });
    }
    prevVisibleRef.current = isVisible;
  }, [isVisible, pathname, variant]);

  useEffect(() => {
    if (!prevVisibleRef.current) return;

    const reason: StickyHideReason | null = hideByContact
      ? 'contact_in_view'
      : hideByFocus
        ? 'form_focus'
        : hideByKeyboard
          ? 'keyboard'
          : null;

    if (reason) {
      const segForTracking = variant === 'default' ? 'core' : variant;
      sendAnalyticsEvent('sticky_hide', { reason, seg: segForTracking, path: pathname });
    }
  }, [hideByContact, hideByFocus, hideByKeyboard, pathname, variant]);

  const dataSeg = variant === 'default' ? 'core' : variant;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 md:hidden ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={isVisible ? 'false' : 'true'}
      data-seg={dataSeg}
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)' }}
    >
      <div
        className={`mx-auto px-4 pb-3 transition duration-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <a
          href={href}
          aria-label={label}
          className={`flex h-14 items-center justify-center gap-2 rounded-full border border-[#0A6E62] bg-[#00594F] text-base font-semibold text-white shadow-lg transition-transform duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00594F66] hover:bg-[#00594F] hover:brightness-110 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
          onClick={() => {
            sendAnalyticsEvent('sticky_cta_click', { seg: dataSeg, href });
          }}
        >
          <span>{label}</span>
          <span aria-hidden="true" className="text-lg font-semibold leading-none">
            &gt;
          </span>
        </a>
      </div>
    </div>
  );
}

