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
// 仕様に基づき、電話番号を任意項目とするため 'phone' を必須リストから除外
const requiredFields: FieldName[] = ['company','name','email','message'];

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFields>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // useEffectによるスクリプト読み込みは不要なため削除しました。
  // Netlifyが data-netlify-recaptcha="true" を検出して自動でスクリプトを注入します。

  // 環境変数からのサイトキー取得も不要なため削除しました。

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
    // 必須項目でない場合はバリデーションをスキップ
    if (!requiredFields.includes(field)) {
        setErrors((prev) => {
            const next = { ...prev };
            delete next[field];
            return next;
        });
        return;
    }

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

  const encode = (data: Record<string, string>) =>
    new URLSearchParams(data).toString();

  const resetForm = () => {
    setFormData(initialFormState);
    setErrors({});
    setTouched({});
    // reCAPTCHAをリセット (windowオブジェクトが存在することを確認)
    if (typeof window !== 'undefined' && (window as any).grecaptcha) {
      (window as any).grecaptcha.reset();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    // AJAX送信の場合、Netlifyはフォームデータ内の g-recaptcha-response を検証します。
    // そのため、このトークンを取得して送信するロジックは引き続き必要です。
    const recaptchaResponse = (form.elements.namedItem('g-recaptcha-response') as HTMLInputElement)?.value;

    if (!recaptchaResponse) {
      // NetlifyがレンダリングするreCAPTCHAはデフォルトで必須項目のため、
      // 基本的にこのアラートは表示されませんが、念のため残しておきます。
      alert('reCAPTCHAを完了してください。');
      return;
    }

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
      const res = await fetch('/form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'contact',
          ...formData,
          'g-recaptcha-response': recaptchaResponse,
          'bot-field': '', // honeypot（空）
        }),
      });

      if (!res.ok) throw new Error(`Netlify submission failed: ${res.status}`);

      // 送信成功：モーダル表示＋フォームリセット
      resetForm();
      setShowModal(true);
    } catch (err) {
      console.error(err);
      alert('送信に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-base">
      {/* reCAPTCHAのスクリプト読み込みはuseEffectに移動したため、<Script>コンポーネントは削除 */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-8 lg:px-12">
        <h2 className="text-2xl font-bold text-primary md:text-3xl">まずはお気軽にお問合せください</h2>

        <form
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          // reCAPTCHAを有効化する属性を追加
          data-netlify-recaptcha="true"
          noValidate
          className="mt-10 space-y-6"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          <div className="hidden" aria-hidden="true">
            <label><input name="bot-field" type="text" tabIndex={-1} autoComplete="off" /></label>
          </div>

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

          {/* phone (任意項目) */}
          <div>
            <label htmlFor="phone" className="flex items-end justify-between text-sm font-semibold text-text">
              <span>電話番号</span>
              {/* 任意項目のためエラー表示は削除 */}
            </label>
            <input
              id="phone" name="phone" type="tel"
              value={formData.phone} onChange={handleChange} onBlur={handleBlur}
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

          {/* Netlify提供のキー不要reCAPTCHAウィジェットを表示する場所 */}
          <div data-netlify-recaptcha="true"></div>

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


