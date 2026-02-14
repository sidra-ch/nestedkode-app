import type { Metadata } from "next";
import "./globals.css";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&family=Vazirmatn:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
