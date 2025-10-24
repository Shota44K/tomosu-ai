'use client';

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import Script from 'next/script';

type GrecaptchaEnterprise = {
  ready(callback: () => void): void;
  execute(siteKey: string, options: { action: string }): Promise<string>;
};

type Grecaptcha = {
  enterprise?: GrecaptchaEnterprise;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
    gtag?: (...args: unknown[]) => void;
  }
}

type ContactFields = {
  company: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};
type FieldName = keyof ContactFields;

const initialFormState: ContactFields = { company:'', name:'', email:'', phone:'', message:'' };
const generalErrorMessage = '必須項目です。';
const requiredFields: FieldName[] = ['company','name','email','phone','message']; // 仕様上「電話番号を任意」にするなら 'phone' を外し、input の required も外してください。

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFields>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [privacyError, setPrivacyError] = useState<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_SITE_RECAPTCHA_KEY ?? '';
  const recaptchaAction = 'contact_submit';
  const conversionTimeoutRef = useRef<number | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (conversionTimeoutRef.current !== null) {
        window.clearTimeout(conversionTimeoutRef.current);
        conversionTimeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!siteKey) {
      setCaptchaError('reCAPTCHAキーの設定が見つかりません。管理者にお問い合わせください。');
      return;
    }

    let cancelled = false;
    let intervalId: number | undefined;

    const attemptReady = () => {
      const grecaptchaEnterprise = window.grecaptcha?.enterprise;
      if (!grecaptchaEnterprise || typeof grecaptchaEnterprise.ready !== 'function') {
        return false;
      }

      grecaptchaEnterprise.ready(() => {
        if (!cancelled) setCaptchaError(null);
      });
      return true;
    };

    if (!attemptReady()) {
      intervalId = window.setInterval(() => {
        if (attemptReady() && intervalId !== undefined) {
          window.clearInterval(intervalId);
          intervalId = undefined;
        }
      }, 300);
    }

    return () => {
      cancelled = true;
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, [siteKey]);

  const getFieldClasses = (field: FieldName) =>
    [
      'mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2',
      errors[field]
        ? 'border-[#C00000] focus:border-[#C00000] focus:ring-[#C00000]/30'
        : 'border-primary/20 focus:border-primary focus:ring-primary/30',
    ].join(' ');

  const validateField = (field: FieldName, value: string) => {
    const trimmed = value.trim();
    setErrors((prev) => {
      if (!trimmed) return { ...prev, [field]: generalErrorMessage };
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as FieldName;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) validateField(field, value);
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setErrors({});
    setTouched({});
    setCaptchaError(null);
    setPrivacyAccepted(false);
    setPrivacyError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formEl = e.currentTarget;

    // クライアント側必須チェック
    const nextTouched: Partial<Record<FieldName, boolean>> = {};
    const nextErrors: Partial<Record<FieldName, string>> = {};
    let hasError = false;
    requiredFields.forEach((f) => {
      nextTouched[f] = true;
      if (!formData[f].trim()) {
        nextErrors[f] = generalErrorMessage;
        hasError = true;
      }
    });

    const nextPrivacyError = privacyAccepted
      ? null
      : "プライバシーポリシーへの同意が必要です。";
    if (nextPrivacyError) hasError = true;

    setTouched(nextTouched);
    setErrors(nextErrors);
    setPrivacyError(nextPrivacyError);

    if (hasError) return;

    try {
      setSubmitting(true);
      const grecaptcha = typeof window !== 'undefined' ? window.grecaptcha?.enterprise : undefined;
      if (!siteKey) {
        setCaptchaError('reCAPTCHAキーの設定が見つかりません。管理者にお問い合わせください。');
        return;
      }
      if (!grecaptcha || typeof grecaptcha.execute !== 'function') {
        setCaptchaError('reCAPTCHAの読み込みに失敗しました。時間をおいて再度お試しください。');
        return;
      }

      await new Promise<void>((resolve) => {
        if (!grecaptcha || typeof grecaptcha.ready !== 'function') {
          resolve();
          return;
        }
        grecaptcha.ready(() => resolve());
      });

      const token = await grecaptcha.execute(siteKey, { action: recaptchaAction });
      if (!token) {
        setCaptchaError('reCAPTCHAの検証に失敗しました。時間をおいて再度お試しください。');
        return;
      }

      const verifyRes = await fetch('/api/recaptcha-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, action: recaptchaAction }),
      });

      const verifyJson: { success?: boolean; message?: string } = await verifyRes.json().catch(() => ({ success: false }));
      if (!verifyRes.ok || !verifyJson.success) {
        setCaptchaError(
          verifyJson.message || 'reCAPTCHAの検証に失敗しました。時間をおいて再度お試しください。'
        );
        return;
      }

      setCaptchaError(null);

      const fd = new FormData(formEl);
      fd.set('recaptcha_enterprise_token', token);

      if (!fd.has('form-name')) fd.append('form-name', 'contact');

      const body = new URLSearchParams();
      fd.forEach((value, key) => {
        body.append(key, typeof value === 'string' ? value : String(value));
      });

      const res = await fetch('/contact-netlify.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!res.ok) throw new Error(`Netlify submission failed: ${res.status}`);

      const completeSubmission = () => {
        if (!isMountedRef.current) return;
        if (conversionTimeoutRef.current !== null) {
          window.clearTimeout(conversionTimeoutRef.current);
          conversionTimeoutRef.current = null;
        }
        resetForm();
        setShowModal(true);
      };

      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          send_to: 'AW-17663914617/2eKMCJO02q8bEPnk5-ZB',
          value: 1.0,
          currency: 'JPY',
          event_callback: completeSubmission,
        });
        if (conversionTimeoutRef.current !== null) {
          window.clearTimeout(conversionTimeoutRef.current);
        }
        conversionTimeoutRef.current = window.setTimeout(() => {
          completeSubmission();
        }, 1500);
      } else {
        console.warn('Google Ads gtag function not found.');
        completeSubmission();
      }
    } catch (err) {
      alert('送信に失敗しました。時間をおいて再度お試しください。');
      // 必要に応じてログ送信など
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-base">
      <Script
        src={
          siteKey
            ? `https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`
            : 'https://www.google.com/recaptcha/enterprise.js'
        }
        strategy="afterInteractive"
      />
      <style jsx global>{`
        .grecaptcha-badge {
          display: none !important;
        }
      `}</style>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-8 lg:px-12">
        <h2 className="text-2xl font-bold text-primary md:text-3xl">まずはお気軽にお問合せください</h2>

        <form
          name="contact"
          method="POST"
          action="/contact-netlify.html"
          data-netlify="true"
          netlify-honeypot="bot-field"
          noValidate
          className="mt-10 space-y-6 mx-4 lg:mx-36"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          <div className="hidden" aria-hidden="true">
            <label><input name="bot-field" type="text" tabIndex={-1} autoComplete="off" /></label>
          </div>

          {/* 各フィールド（省略せずそのまま） */}
          {/* company */}
          <div>
            <label htmlFor="company-name" className="flex items-end justify-between text-sm font-semibold text-text">
              <span className="flex items-center gap-2">
                会社名
                <span className="rounded-sm bg-[#C00000] px-1.5 py-0.5 text-[0.7rem] font-semibold text-white">必須</span>
              </span>
              {touched.company && errors.company && (
                <span id="company-error" className="text-xs font-medium text-[#C00000]">{errors.company}</span>
              )}
            </label>
            <input
              id="company-name" name="company" type="text" required
              value={formData.company} onChange={handleChange}
              aria-invalid={errors.company ? 'true' : 'false'}
              aria-describedby={errors.company ? 'company-error' : undefined}
              className={getFieldClasses('company')}
            />
          </div>

          {/* name */}
          <div>
            <label htmlFor="name" className="flex items-end justify-between text-sm font-semibold text-text">
              <span className="flex items-center gap-2">
                お名前
                <span className="rounded-sm bg-[#C00000] px-1.5 py-0.5 text-[0.7rem] font-semibold text-white">必須</span>
              </span>
              {touched.name && errors.name && (
                <span id="name-error" className="text-xs font-medium text-[#C00000]">{errors.name}</span>
              )}
            </label>
            <input
              id="name" name="name" type="text" required
              value={formData.name} onChange={handleChange}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={getFieldClasses('name')}
            />
          </div>

          {/* email */}
          <div>
            <label htmlFor="email" className="flex items-end justify-between text-sm font-semibold text-text">
              <span className="flex items-center gap-2">
                メールアドレス
                <span className="rounded-sm bg-[#C00000] px-1.5 py-0.5 text-[0.7rem] font-semibold text-white">必須</span>
              </span>
              {touched.email && errors.email && (
                <span id="email-error" className="text-xs font-medium text-[#C00000]">{errors.email}</span>
              )}
            </label>
            <input
              id="email" name="email" type="email" required
              value={formData.email} onChange={handleChange}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={getFieldClasses('email')}
            />
          </div>

          {/* phone（任意にするなら required を削除） */}
          <div>
            <label htmlFor="phone" className="flex items-end justify-between text-sm font-semibold text-text">
              <span className="flex items-center gap-2">
                電話番号
                <span className="rounded-sm bg-[#C00000] px-1.5 py-0.5 text-[0.7rem] font-semibold text-white">必須</span>
              </span>
              {touched.phone && errors.phone && (
                <span id="phone-error" className="text-xs font-medium text-[#C00000]">{errors.phone}</span>
              )}
            </label>
            <input
              id="phone" name="phone" type="tel" required
              value={formData.phone} onChange={handleChange}
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              className={getFieldClasses('phone')}
            />
          </div>

          {/* message */}
          <div>
            <label htmlFor="message" className="flex items-end justify-between text-sm font-semibold text-text">
              <span className="flex items-center gap-2">
                ご相談内容
                <span className="rounded-sm bg-[#C00000] px-1.5 py-0.5 text-[0.7rem] font-semibold text-white">必須</span>
              </span>
              {touched.message && errors.message && (
                <span id="message-error" className="text-xs font-medium text-[#C00000]">{errors.message}</span>
              )}
            </label>
            <textarea
              id="message" name="message" rows={5} required
              value={formData.message} onChange={handleChange}
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className={getFieldClasses('message')}
            />
          </div>

          <p className="text-xs text-text/80">
            このサイトは reCAPTCHA によって保護されており、Google の{' '}
            <a
              href="https://policies.google.com/privacy"
              className="font-semibold text-primary underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              プライバシーポリシー
            </a>
            と
            <a
              href="https://policies.google.com/terms"
              className="font-semibold text-primary underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              利用規約
            </a>
            が適用されます。
          </p>

          {/* プライバシーポリシー同意 */}
          <div>
            <label className="flex items-center gap-3 text-sm text-text/80">
              <input
                type="checkbox"
                checked={privacyAccepted}
                onChange={(event) => {
                  setPrivacyAccepted(event.target.checked);
                  if (event.target.checked) setPrivacyError(null);
                }}
                className="size-5 rounded border border-primary/30 text-primary focus:ring-2 focus:ring-primary/30"
                aria-invalid={privacyError ? 'true' : 'false'}
              />
              <a
                href="/privacy"
                className="font-semibold text-primary underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                プライバシーポリシーに同意する
              </a>
            </label>
            {privacyError && (
              <p className="mt-2 text-xs font-medium text-[#C00000]">{privacyError}</p>
            )}
          </div>

          {captchaError && (
            <p className="text-center text-xs font-medium text-[#C00000]">{captchaError}</p>
          )}

          <div className="text-center">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-w-[12rem] items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow transition hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? '送信中…' : '送信する'}
            </button>
          </div>
        </form>

        {/* 成功モーダル */}
        {showModal && (
          <div
            role="dialog" aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={() => setShowModal(false)}
          >
            <div
              className="rounded-2xl bg-white p-6 shadow-xl"
              style={{ width: 'min(24rem, calc(100vw - 2rem))' }}
              onClick={(event) => event.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-primary">送信ありがとうございました</h3>
              <p className="mt-2 text-sm text-text/80">
                1営業日以内に、担当者よりメールにてご連絡いたします。
              </p>
              <div className="mt-6 text-right">
                <button
                  className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary/90"
                  onClick={() => setShowModal(false)}
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
