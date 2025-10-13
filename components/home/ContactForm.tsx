'use client';

import { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';
import Script from 'next/script';

type ContactFields = {
  company: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FieldName = keyof ContactFields;

const initialFormState: ContactFields = {
  company: '',
  name: '',
  email: '',
  phone: '',
  message: '',
};

const generalErrorMessage = '必須項目です。';
const requiredFields: FieldName[] = ['company', 'name', 'email', 'phone', 'message'];

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFields>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});

  const getFieldClasses = (field: FieldName) =>
    [
      'mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2',
      errors[field]
        ? 'border-[#C00000] focus:border-[#C00000] focus:ring-[#C00000]/30'
        : 'border-primary/20 focus:border-primary focus:ring-primary/30',
    ].join(' ');

  const updateTouched = (field: FieldName) =>
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

  const validateField = (field: FieldName, value: string) => {
    const trimmedValue = value.trim();
    setErrors((prev) => {
      if (!trimmedValue) {
        return {
          ...prev,
          [field]: generalErrorMessage,
        };
      }

      if (!prev[field]) {
        return prev;
      }

      const nextErrors = { ...prev };
      delete nextErrors[field];
      return nextErrors;
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const field = name as FieldName;

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const field = name as FieldName;
    updateTouched(field);
    validateField(field, value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const nextTouched: Partial<Record<FieldName, boolean>> = {};
    const nextErrors: Partial<Record<FieldName, string>> = {};

    requiredFields.forEach((field) => {
      nextTouched[field] = true;
      if (!formData[field].trim()) {
        nextErrors[field] = generalErrorMessage;
      }
    });

    setTouched(nextTouched);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      event.preventDefault();
    }
  };

  return (
    <section id="contact" className="bg-base">
      <Script src="https://www.google.com/recaptcha/api.js" strategy="afterInteractive" />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-8 lg:px-12">
        <h2 className="text-2xl font-bold text-primary md:text-3xl">
          まずはお気軽にお問合せください
        </h2>
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          noValidate
          className="mt-10 space-y-6"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          <div className="hidden" aria-hidden="true">
            <label>
              <input name="bot-field" type="text" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <div>
            <label
              htmlFor="company-name"
              className="flex items-end justify-between text-sm font-semibold text-text"
            >
              <span>
                会社名 <span className="text-[#C00000]">*</span>
              </span>
              {touched.company && errors.company ? (
                <span id="company-error" className="text-xs font-medium text-[#C00000]">
                  {errors.company}
                </span>
              ) : null}
            </label>
            <input
              id="company-name"
              name="company"
              type="text"
              required
              value={formData.company}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={errors.company ? 'true' : 'false'}
              aria-describedby={errors.company ? 'company-error' : undefined}
              className={getFieldClasses('company')}
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="flex items-end justify-between text-sm font-semibold text-text"
            >
              <span>
                お名前 <span className="text-[#C00000]">*</span>
              </span>
              {touched.name && errors.name ? (
                <span id="name-error" className="text-xs font-medium text-[#C00000]">
                  {errors.name}
                </span>
              ) : null}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={getFieldClasses('name')}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="flex items-end justify-between text-sm font-semibold text-text"
            >
              <span>
                メールアドレス <span className="text-[#C00000]">*</span>
              </span>
              {touched.email && errors.email ? (
                <span id="email-error" className="text-xs font-medium text-[#C00000]">
                  {errors.email}
                </span>
              ) : null}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={getFieldClasses('email')}
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="flex items-end justify-between text-sm font-semibold text-text"
            >
              <span>
                電話番号 <span className="text-[#C00000]">*</span>
              </span>
              {touched.phone && errors.phone ? (
                <span id="phone-error" className="text-xs font-medium text-[#C00000]">
                  {errors.phone}
                </span>
              ) : null}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              className={getFieldClasses('phone')}
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="flex items-end justify-between text-sm font-semibold text-text"
            >
              <span>
                ご相談内容 <span className="text-[#C00000]">*</span>
              </span>
              {touched.message && errors.message ? (
                <span id="message-error" className="text-xs font-medium text-[#C00000]">
                  {errors.message}
                </span>
              ) : null}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className={getFieldClasses('message')}
            />
          </div>
          <div data-netlify-recaptcha="true" className="rounded-xl border border-primary/10 bg-white p-4"></div>
          <div className="text-center">
            <button
              type="submit"
              className="inline-flex min-w-[12rem] items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow transition hover:bg-primary/90"
            >
              送信する
            </button>
          </div>
        </form>
        <div className="mt-8 rounded-2xl border border-primary/10 bg-primary/5 p-6 text-sm text-text/80">
          <p className="font-semibold text-primary">送信後メッセージ</p>
          <p className="mt-2 text-text/80">
            お問い合わせいただき、誠にありがとうございます。1営業日以内に、担当者よりメールにてご連絡いたします。
          </p>
        </div>
      </div>
    </section>
  );
}
