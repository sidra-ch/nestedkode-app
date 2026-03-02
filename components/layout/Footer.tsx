import Link from "next/link";
import { useState, useEffect } from "react";
import { t, getCurrentLanguage } from "@/lib/i18n";

interface FooterProps {
  showBusLinks?: boolean;
}

export default function Footer({ showBusLinks = false }: FooterProps) {
  const [lang, setLang] = useState<any>('fa');

  useEffect(() => {
    setLang(getCurrentLanguage());
  }, []);

  return (
    <footer className="border-t border-black/5 bg-white overflow-x-hidden">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-right">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-black">{t('nav.home', lang) === 'Home' ? 'Afghan Baba' : 'افغانی‌بابا'}</h3>
            <p className="mt-2 sm:mt-3 text-sm text-slate-600 leading-relaxed">
              {t('footer.description', lang)}
            </p>
            <div className="mt-4 flex gap-3">
              <Link href="#" className="text-slate-500 hover:text-slate-700">{t('footer.social.telegram', lang)}</Link>
              <Link href="#" className="text-slate-500 hover:text-slate-700">{t('footer.social.instagram', lang)}</Link>
              <Link href="#" className="text-slate-500 hover:text-slate-700">{t('footer.social.twitter', lang)}</Link>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{t('nav.home', lang) === 'Home' ? 'Afghan Baba' : 'افغانی‌بابا'}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><Link href="/" className="hover:text-[#FDB713]">{t('footer.about', lang)}</Link></li>
              <li><Link href="/help-center" className="hover:text-[#FDB713]">{t('footer.contact', lang)}</Link></li>
              <li><Link href="#" className="hover:text-[#FDB713]">{t('footer.why_us', lang)}</Link></li>
              <li><Link href="#" className="hover:text-[#FDB713]">{t('footer.plus', lang)}</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{t('footer.customer_service', lang)}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><Link href="/help-center" className="hover:text-[#FDB713]">{t('footer.online_support', lang)}</Link></li>
              <li><Link href="#" className="hover:text-[#FDB713]">{t('footer.purchase_guide', lang)}</Link></li>
              <li><Link href="#" className="hover:text-[#FDB713]">{t('footer.refund_guide', lang)}</Link></li>
              <li><Link href="#" className="hover:text-[#FDB713]">{t('footer.terms', lang)}</Link></li>
              <li><Link href="/help-center" className="hover:text-[#FDB713]">{t('footer.faq', lang)}</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{t('footer.information', lang) || 'Information'}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><Link href="#" className="hover:text-[#FDB713]">{t('footer.corp_sales', lang)}</Link></li>
              <li><Link href="#" className="hover:text-[#FDB713]">{t('footer.agency_panel', lang)}</Link></li>
              <li><Link href="#" className="hover:text-[#FDB713]">{t('footer.careers', lang)}</Link></li>
              <li><Link href="/sitemap" className="hover:text-[#FDB713]">{t('footer.sitemap', lang)}</Link></li>
            </ul>
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-slate-400">{t('footer.contact_title', lang)}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>۰۲۰ - ۲۵۰۰۰۰۰</li>
              <li>info@afghanibaba.com</li>
              <li>{t('footer.address', lang)}</li>
            </ul>
          </div>
        </div>

        {/* City Links Section - Only on Bus page */}
        {showBusLinks && (
          <div className="mt-6 sm:mt-8 border-t border-black/5 pt-6 sm:pt-8">
            <h4 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">{t('footer.bus_search_title', lang)}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <Link href="/bus-info?from=کابل&to=هرات" className="text-slate-600 hover:text-[#FDB713] transition text-sm">{t('footer.bus_route', lang).replace('{from}', 'کابل').replace('{to}', 'هرات')}</Link>
              <Link href="/bus-info?from=هرات&to=کابل" className="text-slate-600 hover:text-[#FDB713] transition text-sm">{t('footer.bus_route', lang).replace('{from}', 'هرات').replace('{to}', 'کابل')}</Link>
              <Link href="/bus-info?from=کابل&to=مزار شریف" className="text-slate-600 hover:text-[#FDB713] transition text-sm">{t('footer.bus_route', lang).replace('{from}', 'کابل').replace('{to}', 'مزار شریف')}</Link>
              <Link href="/bus-info?from=مزار شریف&to=کابل" className="text-slate-600 hover:text-[#FDB713] transition text-sm">{t('footer.bus_route', lang).replace('{from}', 'مزار شریف').replace('{to}', 'کابل')}</Link>
              <Link href="/bus-info?from=کابل&to=قندهار" className="text-slate-600 hover:text-[#FDB713] transition text-sm">{t('footer.bus_route', lang).replace('{from}', 'کابل').replace('{to}', 'قندهار')}</Link>
              <Link href="/bus-info?from=کابل&to=بامیان" className="text-slate-600 hover:text-[#FDB713] transition text-sm">{t('footer.bus_route', lang).replace('{from}', 'کابل').replace('{to}', 'بامیان')}</Link>
              <Link href="/bus-info?from=کابل&to=جلال‌آباد" className="text-slate-600 hover:text-[#FDB713] transition text-sm">{t('footer.bus_route', lang).replace('{from}', 'کابل').replace('{to}', 'جلال‌آباد')}</Link>
            </div>
          </div>
        )}

        <div className="mt-6 sm:mt-8 border-t border-black/5 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-slate-500">
              <Link href="#" className="hover:text-orange-500 transition">{t('footer.terms', lang)}</Link>
              <Link href="#" className="hover:text-orange-500 transition">{t('footer.privacy', lang)}</Link>
              <Link href="/help-center" className="hover:text-orange-500 transition">{t('footer.faq', lang)}</Link>
              <Link href="/sitemap" className="hover:text-[#FDB713] transition">{t('footer.sitemap', lang)}</Link>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 text-right sm:text-left">
              {t('footer.copyright', lang)}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
