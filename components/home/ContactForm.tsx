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
      'w-full rounded-xl border px-4 py-3 text-sm shadow-sm transition-all duration-200 focus:outline-none focus:ring-4',
      errors[field]
        ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100'
        : 'border-slate-200 bg-white focus:border-primary focus:ring-primary/10 hover:border-primary/50',
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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-slate-50 py-24">
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
      
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl shadow-primary/5 border border-primary/5 p-8 md:p-12">
          <header className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              まずは無料相談から
            </h2>
            <p className="text-text/70 text-sm md:text-base">
              AI活用の可能性診断、試作開発のご相談など、<br className="hidden md:block"/>
              お気軽にお問い合わせください。
            </p>
          </header>

          <form 
            name="contact"
            method="POST"
            action="/contact-netlify.html"
            data-netlify="true"
            netlify-honeypot="bot-field"
            noValidate
            onSubmit={handleSubmit} 
            className="space-y-6"
          >
             <input type="hidden" name="form-name" value="contact" />
             <div className="hidden" aria-hidden="true">
               <label><input name="bot-field" type="text" tabIndex={-1} autoComplete="off" /></label>
             </div>

             {/* Company & Name Row */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label htmlFor="company-name" className="block text-sm font-bold text-primary">
                   会社名 <span className="text-red-500 text-xs ml-1">*</span>
                 </label>
                 <input
                   id="company-name" name="company" type="text" required
                   value={formData.company} onChange={handleChange}
                   onFocus={onFirstFocus}
                   className={getFieldClasses('company')}
                   placeholder="例: 株式会社〇〇"
                 />
                 {touched.company && errors.company && (
                    <p className="text-xs text-red-500 font-medium ml-1">{errors.company}</p>
                 )}
               </div>
               <div className="space-y-2">
                 <label htmlFor="name" className="block text-sm font-bold text-primary">
                   お名前 <span className="text-red-500 text-xs ml-1">*</span>
                 </label>
                 <input
                   id="name" name="name" type="text" required
                   value={formData.name} onChange={handleChange}
                   onFocus={onFirstFocus}
                   className={getFieldClasses('name')}
                   placeholder="例: 山田 太郎"
                 />
                 {touched.name && errors.name && (
                    <p className="text-xs text-red-500 font-medium ml-1">{errors.name}</p>
                 )}
               </div>
             </div>

             {/* Email */}
             <div className="space-y-2">
               <label htmlFor="email" className="block text-sm font-bold text-primary">
                 メールアドレス <span className="text-red-500 text-xs ml-1">*</span>
               </label>
               <input
                 id="email" name="email" type="email" required
                 value={formData.email} onChange={handleChange}
                 onFocus={onFirstFocus}
                 className={getFieldClasses('email')}
                 placeholder="example@company.co.jp"
               />
               {touched.email && errors.email && (
                  <p className="text-xs text-red-500 font-medium ml-1">{errors.email}</p>
               )}
             </div>

             {/* Consultation Type */}
             <div className="space-y-3 pt-2">
               <span className="block text-sm font-bold text-primary">
                 ご相談種別 <span className="text-red-500 text-xs ml-1">*</span>
               </span>
               <div className="grid grid-cols-1 gap-3">
                 {[
                    { value: 'proposal', label: 'AI活用案の相談' },
                    { value: 'trial', label: '無料試作AIシステム開発の相談' },
                    { value: 'other', label: 'その他' },
                 ].map((option) => (
                   <label key={option.value} className={`
                      flex items-center p-3 rounded-xl border cursor-pointer transition-all
                      ${formData.consultationType === option.value 
                        ? 'border-accent bg-accent/5 ring-1 ring-accent/20' 
                        : 'border-slate-200 hover:bg-slate-50'}
                   `}>
                     <input
                       type="radio" name="consultationType" value={option.value}
                       checked={formData.consultationType === option.value}
                       onChange={handleChange}
                       onFocus={onFirstFocus}
                       className="w-4 h-4 text-accent border-slate-300 focus:ring-accent"
                     />
                     <span className="ml-3 text-sm font-medium text-primary">{option.label}</span>
                   </label>
                 ))}
               </div>
               {touched.consultationType && errors.consultationType && (
                  <p className="text-xs text-red-500 font-medium ml-1">{errors.consultationType}</p>
               )}
             </div>

             {/* Message */}
             {formData.consultationType === 'other' && (
                <div className="space-y-2 animate-fade-in">
                  <label htmlFor="message" className="block text-sm font-bold text-primary">
                    ご相談内容
                  </label>
                  <textarea
                    id="message" name="message" rows={4}
                    value={formData.message} onChange={handleChange}
                    onFocus={onFirstFocus}
                    className={getFieldClasses('message')}
                    placeholder="詳細をご記入ください"
                  />
                </div>
             )}

             {/* Privacy */}
             <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 text-accent border-slate-300 rounded focus:ring-accent"
                    checked={privacyAccepted}
                    onChange={(e) => {
                      setPrivacyAccepted(e.target.checked);
                      if(e.target.checked) setPrivacyError(null);
                    }}
                    onFocus={onFirstFocus}
                  />
                  <span className="text-sm text-text/70">
                    <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline decoration-slate-300 underline-offset-4 hover:decoration-primary transition-all">プライバシーポリシー</a>
                    に同意する
                  </span>
                </label>
                {privacyError && <p className="text-red-500 text-xs mt-1 ml-7">{privacyError}</p>}
             </div>

             {/* Captcha Error */}
             {captchaError && (
                <p className="text-center text-xs font-medium text-red-500">{captchaError}</p>
             )}

             {/* Submit */}
             <div className="pt-4">
               <button
                 type="submit"
                 disabled={submitting}
                 className="w-full rounded-full bg-primary py-4 text-white font-bold text-lg shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
               >
                 {submitting && (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                 )}
                 {submitting ? '送信中...' : '無料で相談する'}
               </button>
               <p className="text-center text-xs text-slate-400 mt-4">
                 ※ 営業目的のお問い合わせはお断りしております。
               </p>
               <p className="text-center text-[10px] text-slate-300 mt-2">
                 This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline">Terms of Service</a> apply.
               </p>
             </div>
          </form>
        </div>
      </div>

      {/* 成功モーダル */}
      {showModal && (
        <div
          role="dialog" aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="rounded-3xl bg-white p-8 shadow-2xl max-w-md w-full transform transition-all"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">送信完了しました</h3>
            <p className="text-text/80 text-sm leading-relaxed mb-8">
              お問い合わせありがとうございます。<br/>
              内容を確認の上、1営業日以内に担当者よりご連絡させていただきます。
            </p>
            <button
              className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors"
              onClick={() => setShowModal(false)}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
