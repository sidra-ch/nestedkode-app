
import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_Arabic, Plus_Jakarta_Sans } from "next/font/google";

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-noto-sans-arabic",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "افغانی‌بابا | خرید آنلاین بلیط هواپیما، اتوبوس، هتل و تور",
  description: "خرید بلیط هواپیما، اتوبوس، رزرو هتل، تور و تاکسی بین‌شهری با بهترین قیمت | افغانی‌بابا",
  keywords: "بلیط هواپیما, رزرو هتل, تور, اتوبوس, تاکسی, بیمه مسافرتی, ویزا",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`antialiased min-h-screen overflow-x-hidden ${notoSansArabic.variable} ${plusJakartaSans.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
