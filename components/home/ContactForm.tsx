'use client';

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { sendAdsConversion, track, trackOnce } from '@/lib/analytics';

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
  }
}

type ContactFields = {
  company: string;
  name: string;
  email: string;
  consultationType: string;
  message: string;
};
type FieldName = keyof ContactFields;

const initialFormState: ContactFields = { company: '', name: '', email: '', consultationType: '', message: '' };
const generalErrorMessage = '必須項目です。';
const requiredFields: FieldName[] = ['company','name','email','consultationType'];

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
  const formStartedRef = useRef(false);

  useEffect(() => {
    trackOnce('contact_form_visible', 'form_visible', { id: 'contact' });
  }, []);

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

  const onFirstFocus = () => {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    track('form_start', { section: 'contact' });
  };

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
      if (!trimmed && requiredFields.includes(field)) return { ...prev, [field]: generalErrorMessage };
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as FieldName;
    const value = e.target.value;
    setFormData((prev) => {
      if (field === 'consultationType' && value !== 'other') {
        return { ...prev, consultationType: value, message: '' };
      }
      return { ...prev, [field]: value };
    });
    if (field === 'consultationType') {
      track('consultation_type_select', { value });
    }
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
    track('form_submit_start', { section: 'contact' });

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

    if (hasError) {
      const errorFields = Object.keys(nextErrors);
      if (nextPrivacyError) {
        errorFields.push('privacy');
      }
      if (errorFields.length > 0) {
        track('form_validation_error', { fields: errorFields });
      }
      return;
    }

    try {
      setSubmitting(true);
      const grecaptcha = typeof window !== 'undefined' ? window.grecaptcha?.enterprise : undefined;
      if (!siteKey) {
        setCaptchaError('reCAPTCHAキーの設定が見つかりません。管理者にお問い合わせください。');
        track('recaptcha_error', { message: 'missing_site_key', action: recaptchaAction });
        return;
      }
      if (!grecaptcha || typeof grecaptcha.execute !== 'function') {
        setCaptchaError('reCAPTCHAの読み込みに失敗しました。時間をおいて再度お試しください。');
        track('recaptcha_error', { message: 'not_loaded', action: recaptchaAction });
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
        track('recaptcha_error', { message: 'execute_failed', action: recaptchaAction });
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
        track('recaptcha_error', { message: 'verify_failed', action: recaptchaAction });
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

      sendAdsConversion('2eKMCJO02q8bEPnk5-ZB', {
        value: 1.0,
        currency: 'JPY',
        event_callback: completeSubmission,
      });
      track('form_submit_success', { section: 'contact' });

      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
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
      track('form_submit_fail', { section: 'contact' });
      // 必要に応じてログ送信など
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-white/90">
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
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-8 lg:px-12">
        <header className="text-center md:text-left mb-9">
          <span className="inline-flex w-full max-w-[16rem] items-center justify-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-9">
            お問い合わせ
          </span>
          <h2 className="text-2xl font-bold text-primary md:text-3xl">まずはお気軽にお問合せください</h2>
        </header>
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
              onFocus={onFirstFocus}
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
              onFocus={onFirstFocus}
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
              onFocus={onFirstFocus}
              className={getFieldClasses('email')}
            />
          </div>

          {/* consultation type */}
          <div>
            <fieldset>
              <legend className="flex items-end justify-between text-sm font-semibold text-text">
                <span className="flex items-center gap-2">
                  ご相談種
                  <span className="rounded-sm bg-[#C00000] px-1.5 py-0.5 text-[0.7rem] font-semibold text-white">必須</span>
                </span>

                {touched.consultationType && errors.consultationType && (
                  <span id="consultationType-error" className="text-xs font-medium text-[#C00000]">
                    {errors.consultationType}
                  </span>
                )}
              </legend>
              <span className='text-xs text-text/80'>ご相談種別をお選びください</span>
              <div className="mt-4 flex flex-col gap-3">
                {[
                  { value: 'proposal', label: 'AI活用案の相談' },
                  { value: 'trial', label: '無料試作AIシステム開発の相談' },
                  { value: 'other', label: 'その他' },
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-3 text-sm text-text/90">
                    <input
                      type="radio"
                      name="consultationType"
                      value={option.value}
                      checked={formData.consultationType === option.value}
                      onChange={handleChange}
                      onFocus={onFirstFocus}
                      className="size-5 text-primary focus:ring-2 focus:ring-primary/30"
                      aria-invalid={errors.consultationType ? 'true' : 'false'}
                      aria-describedby={
                        errors.consultationType && touched.consultationType
                          ? 'consultationType-error'
                          : undefined
                      }
                      required
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          {formData.consultationType === 'other' && (
            <div>
               <div className="text-sm font-semibold text-text">
                 <label htmlFor="message" className="flex items-center gap-x-2">
                   ご相談内容
                   <span className="rounded-sm bg-gray-500 px-1.5 py-0.5 text-[0.7rem] font-semibold text-white">任意</span>
                 </label>
               </div>
               <textarea
                 id="message"
                 name="message"
                 rows={5}
                 value={formData.message}
                 onChange={handleChange}
                 onFocus={onFirstFocus}
                 className={`${getFieldClasses('message')} mt-2`}
                 placeholder="未記入でも構いません。面談にてご相談内容をお伝えください。"
               />
            </div>
          )}


          <div>
            <label className="flex items-center gap-3 text-sm text-text/80">
              <input
                type="checkbox"
                checked={privacyAccepted}
                onChange={(event) => {
                  setPrivacyAccepted(event.target.checked);
                  if (event.target.checked) setPrivacyError(null);
                }}
                onFocus={onFirstFocus}
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

          <p className="text-xs text-text/80">
            このサイトは reCAPTCHA によって保護されており、Google の{' '}
            <a
              href="https://policies.google.com/privacy"
              className="font-semibold underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              プライバシーポリシー
            </a>
            と
            <a
              href="https://policies.google.com/terms"
              className="font-semibold underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              利用規約
            </a>
            が適用されます。
          </p>

          {captchaError && (
            <p className="text-center text-xs font-medium text-[#C00000]">{captchaError}</p>
          )}

          <div className="text-center">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-w-[12rem] items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {!submitting && (
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.2}
                  viewBox="0 0 24 24"
                  style={{ transform: 'scaleX(-1)' }}
                >
                  <path d="M4 12 20 6l-6 6 6 6L4 12Z" />
                  <path d="M4 12h8" />
                </svg>
              )}
              <span>{submitting ? '送信中…' : '送信する'}</span>
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
