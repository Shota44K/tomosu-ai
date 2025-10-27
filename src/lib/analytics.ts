'use client';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

type EventName =
  | 'section_view'
  | 'seg_impression'
  | 'cta_click'
  | 'nav_click'
  | 'sticky_cta_show'
  | 'sticky_cta_hide'
  | 'sticky_cta_click'
  | 'usecase_card_click'
  | 'accordion_open'
  | 'process_step_open'
  | 'scroll_depth'
  | 'form_visible'
  | 'form_start'
  | 'consultation_type_select'
  | 'form_submit_start'
  | 'form_validation_error'
  | 'form_submit_fail'
  | 'form_submit_success'
  | 'recaptcha_error'
  | 'ads_conversion';

export function track(name: EventName, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', name, params);
  window.dataLayer?.push({ event: name, ...params });
}

const AW_ID = 'AW-17663914617';

export function sendAdsConversion(label: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  const payload = { send_to: `${AW_ID}/${label}`, ...params };
  window.gtag?.('event', 'conversion', payload);
  window.dataLayer?.push({ event: 'ads_conversion', ...payload });
}

const onceFlags = new Set<string>();

export function trackOnce(key: string, name: EventName, params: Record<string, unknown> = {}) {
  if (onceFlags.has(key)) return;
  onceFlags.add(key);
  track(name, params);
}

export function observeSectionOnce(
  selector: string,
  name: EventName = 'section_view',
  params: Record<string, unknown> = {},
  threshold = 0.5,
) {
  if (typeof window === 'undefined') return;
  const el = document.querySelector(selector);
  if (!el) return;
  let fired = false;
  const obs = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (!entry) return;
      if (!fired && entry.isIntersecting && entry.intersectionRatio >= threshold) {
        fired = true;
        track(name, { id: selector.replace('#', ''), ...params });
        obs.disconnect();
      }
    },
    { threshold: [threshold] },
  );
  obs.observe(el);
}
