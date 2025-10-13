import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col gap-10 md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-start md:gap-16">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3" aria-label="tomosu-AI ホームへ移動">
              <Image
                src="/logo.svg"
                alt="tomosu-AI ロゴ"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border border-white/20 bg-white p-1"
                priority
              />
              <span className="text-lg font-semibold">tomosu-AI</span>
            </Link>
            <p className="text-sm text-white/70">
              <span className="hidden md:inline">AIシステム開発のリスクをゼロに、効果が見えるまで費用負担なし</span>
              <span className="block md:hidden">AIシステム開発のリスクをゼロに、</span>
              <span className="block md:hidden">効果が見えるまで費用負担なし</span>
              <span className="block md:hidden">中堅・中小企業の経営課題をAIで解決</span>
            </p>
          </div>
          <nav
            aria-label="フッターナビゲーション"
            className="grid gap-8 text-sm text-white/80 sm:grid-cols-2"
          >
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                サービス
              </h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/#services" className="transition hover:text-white">
                    サービス概要
                  </Link>
                </li>
                <li>
                  <Link href="/#usecases" className="transition hover:text-white">
                    AIシステム開発事例
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" className="transition hover:text-white">
                    価格体系
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                サポート他
              </h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/#faq" className="transition hover:text-white">
                    よくあるご質問
                  </Link>
                </li>
                <li>
                  <Link href="/company" className="transition hover:text-white">
                    会社概要
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/60">
          <p className="text-center md:text-left">
            © 2025 tomosu-AI. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
