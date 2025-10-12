import Link from "next/link";

const NAV_LINKS = [
  { href: "/#services", label: "サービス" },
  { href: "/#pricing", label: "料金" },
  { href: "/company", label: "会社概要" },
  { href: "/#contact", label: "お問い合わせ" },
  { href: "/#faq", label: "FAQ" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-base/90 backdrop-blur border-b border-primary/10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src="https://via.placeholder.com/48x48"
            alt="tomosu-AI ロゴ"
            className="h-12 w-12 rounded-full border border-primary/20 bg-white"
          />
          <span className="text-lg font-semibold tracking-tight">tomosu-AI</span>
        </div>
        <div className="hidden items-center gap-6 text-sm font-medium md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-primary/90"
          >
            相談する
          </Link>
        </div>
        <button
          className="md:hidden inline-flex items-center justify-center rounded-full border border-primary/40 p-2 text-primary"
          aria-label="メニュー"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>
    </header>
  );
}

