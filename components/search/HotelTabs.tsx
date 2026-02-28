import React from "react";

export default function HotelTabs() {
  return (
    <div className="w-full h-[250px] md:h-[350px] lg:h-[400px] relative overflow-hidden my-8">
      <img
        src="https://res.cloudinary.com/demo/image/upload/v1700000000/hotel-hero.jpg"
        alt="هتل ها"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">رزرو هتل</h1>
        <p className="text-lg md:text-2xl">بهترین قیمت هتل های ایران و جهان</p>
      </div>
    </div>
  );
}
