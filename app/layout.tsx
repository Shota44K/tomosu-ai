import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const notoSans = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "tomosu-AI | 無償でのAI試作品システム開発_中堅・中小企業のためのAI開発パートナー",
  description:
    "tomosu-AIは中堅・中小企業の経営課題をAIで解決するパートナーとして、試作品AIシステムの無償開発から本開発・運用までを支援します。",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSans.variable} bg-white text-text antialiased`}>
        <Header />
        <div className="bg-white">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
