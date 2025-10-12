"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/#services", label: "サービス" },
  { href: "/#pricing", label: "開発費用" },
  { href: "/company", label: "会社概要" },
  { href: "/#contact", label: "お問い合わせ" },
  { href: "/#faq", label: "FAQ" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-primary/10 ${isMenuOpen ? "bg-base" : "bg-base/90"} backdrop-blur`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 md:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            {/* <img
              src="https://via.placeholder.com/48x48"
              alt="tomosu-AI ロゴ"
              className="h-12 w-12 rounded-full border border-primary/20 bg-white"
            /> */}
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
            className="inline-flex items-center justify-center rounded-full border border-primary/40 p-2 text-primary md:hidden"
            aria-label="メニュー"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            onClick={handleToggle}
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
        {isMenuOpen && (
          <div
            id="mobile-nav"
            className="md:hidden border-t border-primary/10 bg-base/95 shadow-lg"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6 md:px-8 lg:px-12">
              <div className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleClose}
                    className="group flex items-center justify-between rounded-2xl border border-primary/10 bg-white/80 px-4 py-3 text-sm font-semibold text-text/90 shadow-sm transition hover:border-primary/20 hover:bg-primary/5"
                  >
                    <span>{link.label}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="h-4 w-4 text-primary transition group-hover:translate-x-1"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m9 5 7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>

              <Link
                href="/#contact"
                onClick={handleClose}
                className="inline-flex min-h-[3rem] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-primary/90"
              >
                相談する
              </Link>
            </div>
          </div>
        )}
      </header>
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/30 md:hidden"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}
    </>
  );
}
