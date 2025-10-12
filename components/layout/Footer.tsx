export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img
              src="https://via.placeholder.com/48x48"
              alt="tomosu-AI ロゴ"
              className="h-10 w-10 rounded-full border border-white/20 bg-white"
            />
            <span className="text-lg font-semibold">tomosu-AI</span>
          </div>
          <p className="text-sm text-white/70">
            中堅・中小企業の経営課題をAIで解決する、身近なパートナー。
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm text-white/80 md:grid-cols-4">
          <div>
            <p className="font-semibold text-white">サービス</p>
            <ul className="mt-2 space-y-1">
              <li>
                <a href="/#services" className="transition hover:text-white">
                  サービス概要
                </a>
              </li>
              <li>
                <a href="/#usecases" className="transition hover:text-white">
                  ユースケース
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">リソース</p>
            <ul className="mt-2 space-y-1">
              <li>
                <a href="/#faq" className="transition hover:text-white">
                  よくあるご質問
                </a>
              </li>
              <li>
                <a href="/#pricing" className="transition hover:text-white">
                  料金について
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">会社情報</p>
            <ul className="mt-2 space-y-1">
              <li>
                <a href="/company" className="transition hover:text-white">
                  会社概要
                </a>
              </li>
              <li>
                <a
                  href="mailto:shota.koura@tomosu-ai.com"
                  className="transition hover:text-white"
                >
                  メールで問い合わせ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">CTA</p>
            <ul className="mt-2 space-y-1">
              <li>
                <a href="/#contact" className="transition hover:text-white">
                  30分相談フォーム
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
          <a
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-primary shadow transition hover:bg-white/90"
          >
            相談する
          </a>
          <p className="text-xs text-white/60">© 2025 tomosu-AI. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

