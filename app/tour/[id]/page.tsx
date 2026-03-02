"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
    Star,
    Clock,
    Users,
    CheckCircle2,
    XCircle,
    Calendar,
    MapPin,
    ShieldCheck,
    ChevronRight,
    ChevronDown,
    Share2,
    Heart,
    Info,
    ArrowRight
} from "lucide-react";

// Existing tours data (simplified for direct use or as lookup)
const toursData = [
    {
        id: 1,
        title: "تور بامیان ۳ روزه",
        description: "بامیان با بیش از ۲۵۰۰ سال تاریخ، مهد تمدن کوشانیان و بودیسم در آسیای میانه بوده است. در این تور استثنایی، ما شما را به سفری در اعماق تاریخ می‌بریم؛ جایی که مجسمه‌های عظیم بودا (صلصال و شهمامه) در دل صخره‌های مرتفع تراشیده شده‌اند.",
        duration: "۳ روز - هتل ۴ ستاره",
        price: 250,
        priceUSD: 180,
        image: "/assets/bamyan-tour.jpg",
        category: "domestic",
        rating: 4.8,
        reviews: 124,
        city: "بامیان",
        itinerary: [
            { day: 1, title: "حرکت از کابل و بازدید از تندیس‌های بودا", desc: "صبح زود از کابل حرکت میکنیم. پس از رسیدن به بامیان و صرف ناهار محلی، به بازدید از محوطه باستانی بت‌های بامیان (صلصال و شهمامه) می‌رویم." },
            { day: 2, title: "پارک ملی بند امیر", desc: "سفر به اولین پارک ملی افغانستان. قایق‌سواری در آب‌های نیلگون بند پنیر و بند ذوالفقار و تماشای طبیعت بکر." },
            { day: 3, title: "شهر ضحاک و شهر غلغله", desc: "بازدید از قلعه‌های باستانی و شهرهای تاریخی و سپس بازگشت به سمت کابل در هنگام عصر." }
        ],
        included: ["اقامت در هتل ۴ ستاره بامیان", "صبحانه، ناهار و شام کامل", "ترانسفر با موترهای 4x4", "راهنمای مجرب محلی", "تکیت ورودی مناطق باستانی"],
        excluded: ["هزینه‌های شخصی و سوغات", "بیمه مسافرتی", "عکاسی حرفه‌ای اختصاصی"]
    },
    {
        id: 2,
        title: "تور هرات ۴ روزه",
        description: "هرات، نگین خراسان و میراث‌دار تمدن تیموریان، با معماری خیره‌کننده و مساجد کاشی‌کاری شده آماده میزبانی از شماست. این شهر تاریخی با بازارهای سنتی و صوفیان دل‌سوخته، تجربه‌ای متفاوت از سفر را برای شما رقم می‌زند.",
        duration: "۴ روز - هتل ۴ ستاره",
        price: 320,
        priceUSD: 230,
        image: "/assets/heart-tour.jpg",
        category: "domestic",
        rating: 4.6,
        reviews: 89,
        city: "هرات",
        itinerary: [
            { day: 1, title: "ورود به هرات و قلعه اختیارالدین", desc: "استقبال در میدان هوایی و انتقال به هتل. عصر هنگام بازدید از قلعه باستانی اختیارالدین (ارگ هرات)." },
            { day: 2, title: "مسجد جامع بزرگ و مقبره خواجه عبدالله انصاری", desc: "تماشای هنر کاشی‌کاری در یکی از قدیمی‌ترین مساجد جهان و زیارتگاه پیر هرات." },
            { day: 3, title: "مناره‌های هرات و پل مالان", desc: "بازدید از مناره‌های تاریخی مصلی و پل قدیمی مالان بر روی رودخانه هریرود." },
            { day: 4, title: "بازار قدیم و صنایع دستی", desc: "خرید سوغات (زعفران، ابریشم و شیشه هراتی) و حرکت به سمت میدان هوایی." }
        ],
        included: ["تکیت رفت و برگشت طیاره", "۳ شب اقامت در بهترین هتل هرات", "ترانسفر ویژه شهری", "بازدید از موزه‌های هرات"],
        excluded: ["ناهار و شام (اختیاری طی گشت‌ها)", "هزینه لیدر اختصاصی"]
    },
    {
        id: 3,
        title: "تور مزار شریف ۲ روزه",
        description: "زیارت آرامگاه Imam علی (ع) و بازار شهر با تجربه طعم‌های محلی و معنویت خاص شمال افغانستان.",
        duration: "۲ روز - هتل ۳ ستاره",
        price: 180,
        priceUSD: 130,
        image: "/assets/mazar-tour.jpg",
        category: "domestic",
        rating: 4.7,
        reviews: 198,
        city: "مزار شریف",
        itinerary: [
            { day: 1, title: "زیارت روضه سخی", desc: "بازدید از آرامگاه منسوب به حضرت علی (ع) و تماشای کبوترهای سفید." },
            { day: 2, title: "آتشکده نوبهار و بازار", desc: "بازدید از بقایای تاریخی و خرید صنایع دستی شمال." }
        ],
        included: ["اقامت هتل در مرکز شهر", "صبحانه و راهنما", "ترانسفر فرودگاهی"],
        excluded: ["وعده‌های غذایی غیر صبحانه"]
    },
    {
        id: 4,
        title: "تور قندهار ۳ روزه",
        description: "سفر به قلب تاریخ در جنوب افغانستان، بازدید از مقبره احمد شاه بابا و مناطق سرسبز ارغنداب.",
        duration: "۳ روز - هتل ۳ ستاره",
        price: 200,
        priceUSD: 145,
        image: "/assets/kandahar-tour.jpg",
        category: "domestic",
        rating: 4.4,
        reviews: 52,
        city: "قندهار",
        itinerary: [
            { day: 1, title: "ورود و بازدید از خرقه مبارک", desc: "استقرار در هتل و بازدید از اماکن مذهبی و تاریخی مرکز شهر." },
            { day: 2, title: "باغ‌های ارغنداب", desc: "گشت و گذار در طبیعت زیبا و انارستان‌های مشهور قندهار." },
            { day: 3, title: "خرید سوغات و بازگشت", desc: "بازدید از بازار میوه خشک و آمادگی برای پرواز بازگشت." }
        ],
        included: ["اقامت و صبحانه", "ترانسفر اختصاصی", "مجوزهای لازم ورود"],
        excluded: ["تکیت طیاره"]
    },
    {
        id: 5,
        title: "تور یک روزه کابل",
        description: "تجربه تپش قلب پایتخت در یک روز پرشور؛ از قله‌های مرتفع تا بازارهای قدیمی و موزه‌های غنی.",
        duration: "۱ روز - بدون پرواز",
        price: 80,
        priceUSD: 55,
        image: "/assets/kabul-tour.jpg",
        category: "oneday",
        rating: 4.5,
        reviews: 67,
        city: "کابل",
        itinerary: [
            { day: 1, title: "موزه ملی و باغ بابر", desc: "صبح بازدید از گنجینه‌های تاریخی و عصر استراحت در باغ‌های باستانی بابر." }
        ],
        included: ["ناهار محلی", "وسیله نقلیه در اختیار", "راهنما"],
        excluded: ["هزینه ورودیه موزه‌ها"]
    },
    {
        id: 10,
        title: "تاکسی بامیان",
        description: "راحت‌ترین راه برای گشت و گذار در بامیان؛ تاکسی اختصاصی با راننده آشنا به تمام نقاط توریستی و بکر منطقه.",
        duration: "۱ روز - تاکسی اختصاصی",
        price: 80,
        priceUSD: 55,
        image: "/assets/bamyan-tour.jpg",
        category: "taxi",
        rating: 4.8,
        reviews: 124,
        city: "بامیان",
        itinerary: [
            { day: 1, title: "گشت اختصاصی بامیان", desc: "در اختیار بودن موتر برای بازدید از هر نقطه‌ای که شما مایل باشید." }
        ],
        included: ["موتر اختصاصی", "سوخت", "راننده مجرب"],
        excluded: ["ناهار و تکیت‌ها"]
    },
    // Adding more tours as needed for other IDs
];

export default function TourDetailsPage() {
    const params = useParams();
    const id = params?.id;
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("overview");
    const [tour, setTour] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        // Find tour by ID
        const tourId = Array.isArray(id) ? id[0] : id;
        const foundTour = toursData.find(t => t.id === Number(tourId));
        if (foundTour) {
            setTour(foundTour);
        } else {
            // Fallback for demo or if not found (using index or default)
            setTour(toursData[0]);
        }
        setLoading(false);
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!tour) return <div className="p-20 text-center">Tour not found</div>;

    return (
        <div className="min-h-screen bg-white" dir="rtl">
            <Navbar />

            {/* HERO SECTION */}
            <div className="relative h-[60vh] md:h-[70vh] profile-header-gradient overflow-hidden">
                <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white container mx-auto">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-lg">
                            {tour.category === 'domestic' ? 'تور داخلی' : 'خارجی'}
                        </span>
                        <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium">
                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                            <span>{tour.rating} ({tour.reviews} نظر)</span>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight drop-shadow-2xl">{tour.title}</h1>
                    <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <Clock size={20} className="text-orange-400" />
                            <span>{tour.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={20} className="text-orange-400" />
                            <span>{tour.city}، افغانستان</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <main className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-12 gap-12">

                    {/* LEFT COLUMN: DETAILS */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* QUICK STATS */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                            <div className="text-center md:border-l border-gray-200 last:border-0 py-2">
                                <p className="text-xs text-gray-400 font-bold mb-1">ظرفیت</p>
                                <p className="font-black text-gray-900">۱۵ نفر</p>
                            </div>
                            <div className="text-center md:border-l border-gray-200 last:border-0 py-2">
                                <p className="text-xs text-gray-400 font-bold mb-1">نوع تور</p>
                                <p className="font-black text-gray-900">گروهی</p>
                            </div>
                            <div className="text-center md:border-l border-gray-200 last:border-0 py-2">
                                <p className="text-xs text-gray-400 font-bold mb-1">زبان</p>
                                <p className="font-black text-gray-900">دری / پشتو</p>
                            </div>
                            <div className="text-center py-2">
                                <p className="text-xs text-gray-400 font-bold mb-1">درجه سختی</p>
                                <p className="font-black text-gray-900">متوسط</p>
                            </div>
                        </div>

                        {/* TABBED CONTENT */}
                        <div className="space-y-8">
                            <div className="flex border-b border-gray-100 gap-8 overflow-x-auto no-scrollbar">
                                {['overview', 'itinerary', 'reviews'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-4 text-sm font-black transition-all relative ${activeTab === tab ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        {tab === 'overview' ? 'بررسی کلی' : tab === 'itinerary' ? 'برنامه سفر' : 'نظرات کاربران'}
                                        {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 rounded-full" />}
                                    </button>
                                ))}
                            </div>

                            {activeTab === 'overview' && (
                                <div className="space-y-8 animate-in fade-in duration-500">
                                    <section>
                                        <h3 className="text-2xl font-black text-gray-900 mb-4">درباره این تور</h3>
                                        <p className="text-gray-500 leading-loose text-lg font-medium">{tour.description}</p>
                                    </section>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <section className="bg-emerald-50/50 p-8 rounded-[2rem] border border-emerald-100">
                                            <h4 className="font-black text-emerald-800 mb-6 flex items-center gap-2">
                                                <CheckCircle2 className="text-emerald-500" /> خدمات شامل
                                            </h4>
                                            <ul className="space-y-4">
                                                {tour.included.map((item: string, i: number) => (
                                                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                        <section className="bg-rose-50/50 p-8 rounded-[2rem] border border-rose-100">
                                            <h4 className="font-black text-rose-800 mb-6 flex items-center gap-2">
                                                <XCircle className="text-rose-500" /> موارد خارج از تور
                                            </h4>
                                            <ul className="space-y-4">
                                                {tour.excluded.map((item: string, i: number) => (
                                                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                                        <div className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'itinerary' && (
                                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                                    {tour.itinerary.map((item: any, i: number) => (
                                        <div key={i} className="relative pr-8 border-r-2 border-orange-100 pb-10 last:pb-0">
                                            <div className="absolute top-0 -right-2.5 w-5 h-5 bg-orange-500 rounded-full border-4 border-white shadow-md ring-4 ring-orange-100" />
                                            <div className="bg-gray-50 p-6 rounded-3xl hover:bg-orange-50/50 transition-colors border border-transparent hover:border-orange-100">
                                                <h4 className="font-black text-gray-900 mb-2 flex items-center gap-3">
                                                    <span className="bg-orange-500 text-white text-[10px] px-2 py-1 rounded-lg uppercase">روز {item.day}</span>
                                                    {item.title}
                                                </h4>
                                                <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* ADVISORY SECTION */}
                        <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex items-start gap-4">
                            <Info className="text-amber-500 shrink-0" size={24} />
                            <div>
                                <h4 className="font-black text-gray-900 mb-1">نکته مهم قبل از رزرو</h4>
                                <p className="text-sm text-gray-600 font-medium leading-relaxed">لطفاً توجه داشته باشید که با توجه به شرایط آب و هوایی، احتمال تغییر جزئی در زمان‌بندی برنامه‌ها وجود دارد. کارت شناسایی معتبر همراه داشته باشید.</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: BOOKING SIDEBAR */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-6">

                            {/* BOOKING CARD */}
                            <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 border border-gray-100 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-bl-full -z-0" />

                                <div className="relative z-10">
                                    <p className="text-gray-400 text-xs font-black mb-1 italic">قیمت شروع از:</p>
                                    <div className="flex items-baseline gap-2 mb-8">
                                        <span className="text-5xl font-black text-gray-900">{(tour.price).toLocaleString()}</span>
                                        <span className="text-sm font-black text-gray-400">افغانی / هر نفر</span>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-orange-50 transition-colors cursor-pointer border border-transparent hover:border-orange-100">
                                            <div className="flex items-center gap-3">
                                                <Calendar className="text-orange-500" size={20} />
                                                <div className="text-right">
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase">تاریخ حرکت</p>
                                                    <p className="text-sm font-black text-gray-900">۱۵ حمل، ۱۴۰۴</p>
                                                </div>
                                            </div>
                                            <ChevronDown size={14} className="text-gray-400" />
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-orange-50 transition-colors cursor-pointer border border-transparent hover:border-orange-100">
                                            <div className="flex items-center gap-3">
                                                <Users className="text-orange-500" size={20} />
                                                <div className="text-right">
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase">تعداد مسافران</p>
                                                    <p className="text-sm font-black text-gray-900">۲ بزرگسال</p>
                                                </div>
                                            </div>
                                            <ChevronDown size={14} className="text-gray-400" />
                                        </div>
                                    </div>

                                    <button
                                        className="w-full py-5 bg-gray-900 text-white rounded-3xl font-black text-lg hover:bg-orange-500 transition-all hover:shadow-orange-500/30 hover:shadow-2xl active:scale-[0.98] mb-4"
                                        onClick={() => alert('Booking system integration coming soon!')}
                                    >
                                        رزرو این تور
                                    </button>

                                    <p className="text-center text-[10px] text-gray-400 font-black">ظرفیت محدود است! همین حالا رزرو کنید.</p>
                                </div>
                            </div>

                            {/* TRUST BADGE */}
                            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 flex items-center gap-4">
                                <ShieldCheck className="text-emerald-500" size={32} />
                                <p className="text-gray-900 font-black text-xs leading-relaxed">تضمین پایین‌ترین قیمت و امنیت کامل سفر توسط افغانی‌بابا</p>
                            </div>

                            {/* SOCIAL ACTIONS */}
                            <div className="flex gap-4">
                                <button className="flex-1 py-4 bg-gray-50 rounded-2xl flex items-center justify-center gap-2 font-black text-xs text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition-colors border border-gray-100 hover:border-orange-100">
                                    <Share2 size={16} /> اشتراک گذاری
                                </button>
                                <button className="flex-1 py-4 bg-gray-50 rounded-2xl flex items-center justify-center gap-2 font-black text-xs text-gray-600 hover:bg-rose-50 hover:text-rose-500 transition-colors border border-gray-100 hover:border-rose-100">
                                    <Heart size={16} /> ذخیره در لیست
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            {/* STICKY BOTTOM BAR FOR MOBILE */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 p-4 z-50 flex items-center justify-between">
                <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-black italic">قیمت تکت:</p>
                    <p className="text-xl font-black text-gray-900">{(tour.price).toLocaleString()} <span className="text-[10px]">افغانی</span></p>
                </div>
                <button className="px-10 py-4 bg-orange-500 text-white rounded-2xl font-black text-sm shadow-xl shadow-orange-500/20 active:scale-95 transition-transform">
                    رزرو کنید
                </button>
            </div>
        </div>
    );
}
