"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function HelpCenter() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const categories = [
    { id: "all", name: "همه موارد", icon: "📋" },
    { id: "booking", name: "رزرو و خرید", icon: "🎫" },
    { id: "payment", name: "پرداخت", icon: "💳" },
    { id: "cancel", name: "کنسلی و بازگشت", icon: "🔄" },
    { id: "account", name: "حساب کاربری", icon: "👤" },
  ];

  const faqs = [
    {
      category: "booking",
      question: "چگونه بلیط اتوبوس رزرو کنم؟",
      answer: "برای رزرو بلیط اتوبوس، ابتدا مبدا، مقصد و تاریخ سفر خود را در صفحه اصلی وارد کنید. سپس از بین اتوبوس‌های موجود، گزینه مورد نظر را انتخاب کنید. صندلی‌های دلخواه را انتخاب کرده و اطلاعات مسافران را وارد نمایید. در نهایت پرداخت را انجام دهید تا بلیط شما صادر شود."
    },
    {
      category: "booking",
      question: "آیا می‌توانم برای دیگران بلیط بخرم؟",
      answer: "بله، شما می‌توانید با استفاده از حساب کاربری خود برای دیگران نیز بلیط خریداری کنید. کافیست در مرحله ثبت اطلاعات مسافران، نام و مشخصات فرد مورد نظر را وارد نمایید."
    },
    {
      category: "payment",
      question: "روش‌های پرداخت چیست؟",
      answer: "شما می‌توانید از طریق کارت‌های بانکی، کیف پول الکترونیکی و یا پرداخت در محل (در صورت امکان) هزینه بلیط خود را پرداخت کنید. تمامی تراکنش‌ها از طریق درگاه‌های معتبر و امن انجام می‌شود."
    },
    {
      category: "payment",
      question: "آیا پرداخت امن است؟",
      answer: "بله، تمامی پرداخت‌ها از طریق درگاه‌های بانکی معتبر و با استاندارد امنیتی بالا انجام می‌شود. اطلاعات کارت بانکی شما ذخیره نمی‌شود و کاملاً محرمانه است."
    },
    {
      category: "cancel",
      question: "چگونه بلیط خود را کنسل کنم؟",
      answer: "برای کنسل کردن بلیط، به بخش 'رزروهای من' در پروفایل خود مراجعه کنید. بلیط مورد نظر را انتخاب کرده و روی گزینه 'درخواست کنسلی' کلیک کنید. توجه داشته باشید که کنسلی بلیط مشمول قوانین کنسلی هر شرکت می‌شود."
    },
    {
      category: "cancel",
      question: "چه مدت طول می‌کشد تا پول برگشت داده شود؟",
      answer: "پس از تایید درخواست کنسلی، مبلغ بازگشتی در مدت 3 تا 7 روز کاری به حساب شما واریز خواهد شد. در صورت تاخیر، با پشتیبانی تماس بگیرید."
    },
    {
      category: "account",
      question: "چگونه حساب کاربری بسازم؟",
      answer: "برای ساخت حساب کاربری، روی دکمه 'ورود/ثبت نام' در بالای صفحه کلیک کنید. شماره موبایل خود را وارد کرده و کد تایید ارسال شده را وارد نمایید. سپس اطلاعات شخصی خود را تکمیل کنید."
    },
    {
      category: "account",
      question: "رمز عبور خود را فراموش کرده‌ام",
      answer: "در صفحه ورود، روی گزینه 'فراموشی رمز عبور' کلیک کنید. شماره موبایل ثبت شده را وارد کنید تا کد بازیابی برای شما ارسال شود. با استفاده از این کد می‌توانید رمز عبور جدید تعیین کنید."
    },
  ];

  const filteredFaqs = activeCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    alert("پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.");
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-linear-to-r from-purple-600 to-purple-800 py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">مرکز پشتیبانی افغانی‌بابا</h1>
          <p className="text-lg text-white/90 mb-8">چطور می‌توانیم به شما کمک کنیم؟</p>
          
          {/* Search Box */}
          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="سوال خود را جستجو کنید..."
                className="w-full rounded-full border-0 px-6 py-4 text-right shadow-xl pr-14"
              />
              <svg className="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="mx-auto max-w-6xl px-4 -mt-8 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/help-center#booking" className="rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition text-center">
            <div className="text-3xl mb-3">🎫</div>
            <h3 className="font-semibold text-gray-900">راهنمای رزرو</h3>
          </Link>
          <Link href="/help-center#payment" className="rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition text-center">
            <div className="text-3xl mb-3">💳</div>
            <h3 className="font-semibold text-gray-900">پرداخت</h3>
          </Link>
          <Link href="/help-center#cancel" className="rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition text-center">
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="font-semibold text-gray-900">کنسلی و بازگشت</h3>
          </Link>
          <Link href="/help-center#contact" className="rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition text-center">
            <div className="text-3xl mb-3">📞</div>
            <h3 className="font-semibold text-gray-900">تماس با ما</h3>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">سوالات متداول</h2>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full px-6 py-2 font-medium transition ${
                activeCategory === category.id
                  ? "bg-[#FDB713] text-black"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="ml-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div key={index} className="rounded-lg bg-white shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="flex w-full items-center justify-between p-6 text-right hover:bg-gray-50 transition"
              >
                <h3 className="text-lg font-semibold text-gray-900 flex-1">{faq.question}</h3>
                <svg
                  className={`h-6 w-6 text-gray-600 transition-transform mr-4 ${
                    expandedFaq === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedFaq === index && (
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="bg-white py-12">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">تماس با پشتیبانی</h2>
          <p className="text-center text-gray-600 mb-8">
            سوال خود را پیدا نکردید؟ از طریق فرم زیر با ما در ارتباط باشید.
          </p>

          <form onSubmit={handleSubmitContact} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نام و نام خانوادگی</label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-right"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-right"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">موضوع</label>
              <select
                required
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-right"
              >
                <option value="">انتخاب کنید</option>
                <option value="booking">مشکل در رزرو</option>
                <option value="payment">مشکل در پرداخت</option>
                <option value="cancel">درخواست کنسلی</option>
                <option value="complaint">شکایت</option>
                <option value="other">سایر موارد</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">پیام شما</label>
              <textarea
                required
                rows={6}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-right"
                placeholder="توضیحات خود را بنویسید..."
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#FDB713] px-6 py-3 font-semibold text-black hover:bg-[#e6a512] transition"
            >
              ارسال پیام
            </button>
          </form>
        </div>
      </section>

      {/* Contact Info */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">تلفن تماس</h3>
            <p className="text-gray-600" dir="ltr">+93 700 123 456</p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">ایمیل</h3>
            <p className="text-gray-600" dir="ltr">support@afghanibaba.af</p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
              <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">ساعات کاری</h3>
            <p className="text-gray-600">همه روزه ۸ صبح تا ۱۲ شب</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
