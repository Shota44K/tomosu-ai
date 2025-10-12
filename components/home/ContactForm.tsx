export default function ContactForm() {
  return (
    <section id="contact" className="bg-white/90">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-2xl font-bold text-primary md:text-3xl">
          まずはお気軽にお問合せください
        </h2>
        <p className="mt-4 text-sm text-text/80">
          まだ具体的なプランが決まっていなくても構いません。「こんなことはできる？」といった漠然としたご相談も可能です。まずはお気軽にお問合せください。
        </p>
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          className="mt-10 space-y-6"
        >
          <input type="hidden" name="form-name" value="contact" />
          <div>
            <label
              htmlFor="company-name"
              className="block text-sm font-semibold text-text"
            >
              会社名 <span className="text-accent">*</span>
            </label>
            <input
              id="company-name"
              name="company"
              type="text"
              required
              className="mt-2 w-full rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-text">
              お名前 <span className="text-accent">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-2 w-full rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-text"
            >
              メールアドレス <span className="text-accent">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-text">
              電話番号（任意）
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="mt-2 w-full rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-text"
            >
              ご相談内容（任意）
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="mt-2 w-full rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white shadow transition hover:bg-primary/90"
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

