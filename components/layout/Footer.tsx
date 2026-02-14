import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 text-right md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-black">افغانی‌بابا</h3>
            <p className="mt-3 text-sm text-slate-600">
              افغانی‌بابا، رتبه یک خرید اینترنتی بلیط سفر در افغانستان. با بهترین قیمت و پشتیبانی ۲۴ ساعته.
            </p>
            <div className="mt-4 flex gap-3">
              <Link href="#" className="text-slate-500 hover:text-slate-700">تلگرام</Link>
              <Link href="#" className="text-slate-500 hover:text-slate-700">اینستاگرام</Link>
              <Link href="#" className="text-slate-500 hover:text-slate-700">توییتر</Link>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">افغانی‌بابا</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><Link href="#" className="hover:text-[#FDB713]">درباره ما</Link></li>
              <li><Link href="/help-center" className="hover:text-[#FDB713]">تماس با ما</Link></li>
              <li><Link href="#" className="hover:text-[#FDB713]">چرا افغانی‌بابا</Link></li>
              <li><Link href="#" className="hover:text-[#FDB713]">افغانی‌بابا پلاس</Link></li>
              <li><Link href="/insurance" className="hover:text-[#FDB713]">بیمه مسافرتی</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">خدمات مشتریان</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><Link href="/help-center" className="hover:text-[#FDB713]">مرکز پشتیبانی آنلاین</Link></li>
              <li><Link href="#" className="hover:text-[#FDB713]">راهنمای خرید</Link></li>
              <li><Link href="#" className="hover:text-[#FDB713]">راهنمای استرداد</Link></li>
              <li><Link href="#" className="hover:text-[#FDB713]">قوانین و مقررات</Link></li>
              <li><Link href="/help-center" className="hover:text-[#FDB713]">سوالات متداول</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">اطلاعات تکمیلی</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><Link href="#" className="hover:text-[#FDB713]">فروش سازمانی</Link></li>
              <li><Link href="#" className="hover:text-[#FDB713]">پنل آژانسی</Link></li>
              <li><Link href="#" className="hover:text-[#FDB713]">فرصت‌های شغلی</Link></li>
              <li><Link href="/sitemap" className="hover:text-[#FDB713]">نقشه سایت</Link></li>
            </ul>
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-slate-400">تماس</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>۰۲۰ - ۲۵۰۰۰۰۰</li>
              <li>info@afghanibaba.com</li>
              <li>کابل، افغانستان</li>
            </ul>
          </div>
        </div>

        {/* City Links Section */}
        <div className="mt-8 border-t border-black/5 pt-8">
          <h4 className="text-lg font-semibold text-slate-900 mb-4">جستجوی بلیط اتوبوس سراسر افغانستان</h4>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/bus-info?from=کابل&to=هرات" className="text-slate-600 hover:text-[#FDB713] transition text-sm">بلیط اتوبوس کابل به هرات</Link>
            <Link href="/bus-info?from=هرات&to=کابل" className="text-slate-600 hover:text-[#FDB713] transition text-sm">بلیط اتوبوس هرات به کابل</Link>
            <Link href="/bus-info?from=کابل&to=مزار شریف" className="text-slate-600 hover:text-[#FDB713] transition text-sm">بلیط اتوبوس کابل به مزار شریف</Link>
            <Link href="/bus-info?from=مزار شریف&to=کابل" className="text-slate-600 hover:text-[#FDB713] transition text-sm">بلیط اتوبوس مزار به کابل</Link>
            <Link href="/bus-info?from=کابل&to=قندهار" className="text-slate-600 hover:text-[#FDB713] transition text-sm">بلیط اتوبوس کابل به قندهار</Link>
            <Link href="/bus-info?from=کابل&to=بامیان" className="text-slate-600 hover:text-[#FDB713] transition text-sm">بلیط اتوبوس کابل به بامیان</Link>
            <Link href="/bus-info?from=کابل&to=جلال‌آباد" className="text-slate-600 hover:text-[#FDB713] transition text-sm">بلیط اتوبوس کابل به جلال‌آباد</Link>
          </div>
        </div>
        
        <div className="mt-8 border-t border-black/5 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
              <Link href="#">قوانین و مقررات</Link>
              <Link href="#">حریم خصوصی</Link>
              <Link href="/help-center">سوالات متداول</Link>
              <Link href="/sitemap" className="hover:text-[#FDB713]">نقشه سایت</Link>
            </div>
            <p className="text-sm text-slate-500">
              © ۱۴۰۵ - شرکت خدمات گردشگری افغانی‌بابا - تمامی حقوق محفوظ است
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
