export default function CTA() {
  return (
    <section id="cta" className="bg-primary text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-4 py-16 text-center md:flex-row md:text-left">
        <div>
          <h2 className="text-2xl font-bold md:text-3xl">
            まずは、AI活用の第一歩をリスクゼロで踏み出してみませんか？
          </h2>
          <p className="mt-3 text-base text-white/90">
            「AIで経営課題を解決できるかもしれない」その可能性を、私たちが形にします。
          </p>
        </div>
        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-primary shadow transition hover:bg-white/90"
        >
          相談する
        </a>
      </div>
    </section>
  );
}

