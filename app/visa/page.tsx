import React from "react";

export default function VisaPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">درخواست ویزای سفر</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="mb-4 text-gray-700 text-center">
            برای درخواست ویزا، لطفاً اطلاعات زیر را تکمیل کنید. کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.
          </p>
          {/* فرم درخواست ویزا اینجا قرار می‌گیرد */}
          <form className="space-y-4 max-w-lg mx-auto">
            <div>
              <label className="block mb-1 font-medium">نام کامل</label>
              <input type="text" className="w-full border rounded px-3 py-2" placeholder="نام و نام خانوادگی" required />
            </div>
            <div>
              <label className="block mb-1 font-medium">شماره تماس</label>
              <input type="tel" className="w-full border rounded px-3 py-2" placeholder="مثال: 0935xxxxxxx" required />
            </div>
            <div>
              <label className="block mb-1 font-medium">کشور مقصد</label>
              <input type="text" className="w-full border rounded px-3 py-2" placeholder="مثال: ترکیه" required />
            </div>
            <div>
              <label className="block mb-1 font-medium">توضیحات</label>
              <textarea className="w-full border rounded px-3 py-2" placeholder="توضیحات بیشتر (اختیاری)" rows={3}></textarea>
            </div>
            <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded font-semibold hover:bg-orange-700 transition">ثبت درخواست</button>
          </form>
        </div>
      </div>
    </main>
  );
}
