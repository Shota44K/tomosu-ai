export default function CTA() {
  return (
    <section id="cta" className="bg-primary text-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 px-4 py-16 text-center md:flex-row md:text-left">
        <div>
          <h2 className="text-2xl font-bold md:text-3xl">
          AIシステム開発のリスクをゼロに<br />
          効果が見えるまで費用負担なし
          </h2>
          <p className="mt-3 text-base text-white/90">
            「AIで経営課題を解決できるかもしれない」その可能性を形にします。
          </p>
        </div>
        <a
          href="#contact"
          className="inline-flex min-w-[12rem] items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-primary shadow transition hover:bg-white/90"
        >
          相談する
        </a>
      </div>
    </section>
  );
}
