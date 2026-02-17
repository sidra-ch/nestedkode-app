"use client";

import Image from "next/image";

export default function MobileHero() {
  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/banner-1.jpg"
          alt="Afghanistan Travel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="text-3xl font-extrabold mb-3 drop-shadow-lg">
          سفر به سراسر افغانستان
        </h1>
        <p className="text-lg font-medium drop-shadow-md">
          با افغانی‌بابا، آسان، سریع و مطمئن
        </p>
      </div>
    </div>
  );
}
