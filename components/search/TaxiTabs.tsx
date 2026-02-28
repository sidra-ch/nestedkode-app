import React from "react";

export default function TaxiTabs() {
  return (
    <div className="w-full h-[250px] md:h-[350px] lg:h-[400px] relative overflow-hidden my-8">
      <img
        src="https://res.cloudinary.com/demo/image/upload/v1700000000/taxi-hero.jpg"
        alt="تاکسی ها"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">رزرو تاکسی</h1>
        <p className="text-lg md:text-2xl">سفر راحت با تاکسی های ویژه</p>
      </div>
    </div>
  );
}
