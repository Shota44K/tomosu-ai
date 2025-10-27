'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { track } from '@/lib/analytics';

type StickyHideReason = 'hero_in_view' | 'contact_in_view' | 'footer_in_view' | 'form_focus' | 'keyboard';

const CTA_LABEL = '無料で相談する（30分）';
const CTA_HREF = '#contact';
const TRACKING_SEGMENT = 'core';

const HIDE_DEBOUNCE_MS = 100;
const SHOW_DELAY_MS = 600;
const KEYBOARD_THRESHOLD = 150;

export default function MobileStickyCta() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [hideByHero, setHideByHero] = useState(false);
  const [hideByContact, setHideByContact] = useState(false);
  const [hideByFooter, setHideByFooter] = useState(false);
  const [hideByFocus, setHideByFocus] = useState(false);
  const [hideByKeyboard, setHideByKeyboard] = useState(false);
  const prevVisibleRef = useRef(false);
  const focusOutTimeoutRef = useRef<number | null>(null);
  const viewportBaseHeightRef = useRef<number | null>(null);

  const isVisible = ready && !hideByHero && !hideByContact && !hideByFooter && !hideByFocus && !hideByKeyboard;

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

    const setupIntersectionWatcher = (
      selector: string,
      threshold: number,
      setter: (hidden: boolean) => void,
    ) => {
      const target = document.querySelector(selector);
      if (!target) return null;

      let timeoutId: number | null = null;
      const thresholds =
        threshold >= 1
          ? [0, 1]
          : Array.from(new Set([0, threshold])).sort((a, b) => a - b);

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          if (timeoutId) window.clearTimeout(timeoutId);
          timeoutId = window.setTimeout(() => {
            setter(entry.isIntersecting && entry.intersectionRatio >= threshold);
          }, HIDE_DEBOUNCE_MS);
        },
        { threshold: thresholds },
      );

      observer.observe(target);

      return () => {
        if (timeoutId) window.clearTimeout(timeoutId);
        observer.disconnect();
      };
    };

    const heroCleanup = setupIntersectionWatcher('#hero', 0.2, setHideByHero);
    if (heroCleanup) cleanupFns.push(heroCleanup);

    const contactCleanup = setupIntersectionWatcher('#contact', 0.2, setHideByContact);
    if (contactCleanup) cleanupFns.push(contactCleanup);

    const footerCleanup = setupIntersectionWatcher('#site-footer', 0.2, setHideByFooter);
    if (footerCleanup) cleanupFns.push(footerCleanup);

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
    if (!prevVisible && isVisible) {
      track('sticky_cta_show', { seg: TRACKING_SEGMENT, path: pathname });
    }
    prevVisibleRef.current = isVisible;
  }, [isVisible, pathname]);

  useEffect(() => {
    if (!prevVisibleRef.current) return;

    const reason: StickyHideReason | null = hideByHero
      ? 'hero_in_view'
      : hideByContact
        ? 'contact_in_view'
        : hideByFooter
          ? 'footer_in_view'
          : hideByFocus
            ? 'form_focus'
            : hideByKeyboard
              ? 'keyboard'
              : null;

    if (reason) {
      track('sticky_cta_hide', { reason, seg: TRACKING_SEGMENT, path: pathname });
    }
  }, [hideByHero, hideByContact, hideByFooter, hideByFocus, hideByKeyboard, pathname]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 md:hidden ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={isVisible ? 'false' : 'true'}
      data-seg={TRACKING_SEGMENT}
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)' }}
    >
      <div
        className={`mx-auto px-4 pb-3 transition duration-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <a
          href={CTA_HREF}
          aria-label={CTA_LABEL}
          className={`flex h-14 items-center justify-center gap-2 rounded-full border border-[#0A6E62] bg-[#00594F] text-base font-semibold text-white shadow-xl transition-transform duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00594F66] hover:bg-[#00594F] hover:brightness-110 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
          onClick={() => {
            track('sticky_cta_click', { seg: TRACKING_SEGMENT, href: CTA_HREF });
          }}
        >
          <span>{CTA_LABEL}</span>
          <span aria-hidden="true" className="text-lg font-semibold leading-none">
            &gt;
          </span>
        </a>
      </div>
    </div>
  );
}
