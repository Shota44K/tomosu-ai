'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

export function useScrollDepth() {
  useEffect(() => {
    const marks = [25, 50, 75, 100];
    const fired = new Set<number>();
    const onScroll = () => {
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      if (max <= 0) {
        marks
          .filter((percent) => !fired.has(percent))
          .forEach((percent) => {
            fired.add(percent);
            track('scroll_depth', { percent });
          });
        return;
      }
      const scrolled = (root.scrollTop / max) * 100;
      marks.forEach((percent) => {
        if (!fired.has(percent) && scrolled >= percent - 0.5) {
          fired.add(percent);
          track('scroll_depth', { percent });
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}
