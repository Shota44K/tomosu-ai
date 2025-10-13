'use client';

import { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';

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

  const getFieldClasses = (field: FieldName) =>
    [
      'mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2',
      errors[field]
        ? 'border-[#C00000] focus:border-[#C00000] focus:ring-[#C00000]/30'
        : 'border-primary/20 focus:border-primary focus:ring-primary/30',
    ].join(' ');

  const updateTouched = (field: FieldName) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

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

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as FieldName;
    updateTouched(field);
    validateField(field, e.target.value);
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setErrors({});
    setTouched({});
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // クライアント側必須チェック
    const nextTouched: Partial<Record<FieldName, boolean>> = {};
    const nextErrors: Partial<Record<FieldName, string>> = {};
    requiredFields.forEach((f) => {
      nextTouched[f] = true;
      if (!formData[f].trim()) nextErrors[f] = generalErrorMessage;
    });
    setTouched(nextTouched);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setSubmitting(true);
      const formEl = e.currentTarget;
      const fd = new FormData(formEl);

      if (!fd.has('form-name')) fd.append('form-name', 'contact');

      const body = new URLSearchParams();
      fd.forEach((value, key) => {
        body.append(key, typeof value === 'string' ? value : String(value));
      });

      const res = await fetch(formEl.action || '/form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!res.ok) throw new Error(`Netlify submission failed: ${res.status}`);

      // 送信成功：モーダル表示＋フォームリセット
      resetForm();
      setShowModal(true);
    } catch (err) {
      alert('送信に失敗しました。時間をおいて再度お試しください。');
      // 必要に応じてログ送信など
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-base">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-8 lg:px-12">
        <h2 className="text-2xl font-bold text-primary md:text-3xl">まずはお気軽にお問合せください</h2>

        <form
          name="contact"
          method="POST"
          action="/form.html"
          data-netlify="true"
          netlify-honeypot="bot-field"
          data-netlify-recaptcha="true"
          noValidate
          className="mt-10 space-y-6"
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
              <span>会社名 <span className="text-[#C00000]">*</span></span>
              {touched.company && errors.company && (
                <span id="company-error" className="text-xs font-medium text-[#C00000]">{errors.company}</span>
              )}
            </label>
            <input
              id="company-name" name="company" type="text" required
              value={formData.company} onChange={handleChange} onBlur={handleBlur}
              aria-invalid={errors.company ? 'true' : 'false'}
              aria-describedby={errors.company ? 'company-error' : undefined}
              className={getFieldClasses('company')}
            />
          </div>

          {/* name */}
          <div>
            <label htmlFor="name" className="flex items-end justify-between text-sm font-semibold text-text">
              <span>お名前 <span className="text-[#C00000]">*</span></span>
              {touched.name && errors.name && (
                <span id="name-error" className="text-xs font-medium text-[#C00000]">{errors.name}</span>
              )}
            </label>
            <input
              id="name" name="name" type="text" required
              value={formData.name} onChange={handleChange} onBlur={handleBlur}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={getFieldClasses('name')}
            />
          </div>

          {/* email */}
          <div>
            <label htmlFor="email" className="flex items-end justify-between text-sm font-semibold text-text">
              <span>メールアドレス <span className="text-[#C00000]">*</span></span>
              {touched.email && errors.email && (
                <span id="email-error" className="text-xs font-medium text-[#C00000]">{errors.email}</span>
              )}
            </label>
            <input
              id="email" name="email" type="email" required
              value={formData.email} onChange={handleChange} onBlur={handleBlur}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={getFieldClasses('email')}
            />
          </div>

          {/* phone（任意にするなら required を削除） */}
          <div>
            <label htmlFor="phone" className="flex items-end justify-between text-sm font-semibold text-text">
              <span>電話番号 <span className="text-[#C00000]">*</span></span>
              {touched.phone && errors.phone && (
                <span id="phone-error" className="text-xs font-medium text-[#C00000]">{errors.phone}</span>
              )}
            </label>
            <input
              id="phone" name="phone" type="tel" required
              value={formData.phone} onChange={handleChange} onBlur={handleBlur}
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              className={getFieldClasses('phone')}
            />
          </div>

          {/* message */}
          <div>
            <label htmlFor="message" className="flex items-end justify-between text-sm font-semibold text-text">
              <span>ご相談内容 <span className="text-[#C00000]">*</span></span>
              {touched.message && errors.message && (
                <span id="message-error" className="text-xs font-medium text-[#C00000]">{errors.message}</span>
              )}
            </label>
            <textarea
              id="message" name="message" rows={5} required
              value={formData.message} onChange={handleChange} onBlur={handleBlur}
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className={getFieldClasses('message')}
            />
          </div>

          {/* Netlify reCAPTCHA v2 placeholder（公開時にスクリプトが挿入されます） */}
          <div data-netlify-recaptcha="true" className="rounded-xl border border-primary/10 bg-white p-4"></div>

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
          >
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
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
