/**
 * Hotels Seed Script
 * 
 * Run: npx ts-node scripts/seed-hotels.ts
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

let MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in .env.local');
    process.exit(1);
}

// FIX FOR WINDOWS NODE.JS DNS BUG (matching lib/db.ts)
if (MONGODB_URI.includes("mongodb+srv://") && MONGODB_URI.includes("cluster0.3m6zgzj.mongodb.net")) {
    const baseUri = "mongodb+srv://mssidrachaudhary_db_user:HUMSAFAR@cluster0.3m6zgzj.mongodb.net";
    const replacement = "mongodb://mssidrachaudhary_db_user:HUMSAFAR@ac-xc4u4z8-shard-00-00.3m6zgzj.mongodb.net:27017,ac-xc4u4z8-shard-00-01.3m6zgzj.mongodb.net:27017,ac-xc4u4z8-shard-00-02.3m6zgzj.mongodb.net:27017/Humsafardb";

    if (MONGODB_URI.startsWith(baseUri + "/")) {
        MONGODB_URI = MONGODB_URI.replace(baseUri + "/", replacement);
    } else {
        MONGODB_URI = MONGODB_URI.replace(baseUri, replacement);
    }

    if (!MONGODB_URI.includes("ssl=true")) {
        const joiner = MONGODB_URI.includes("?") ? "&" : "?";
        MONGODB_URI += `${joiner}ssl=true&authSource=admin&retryWrites=true&w=majority`;
    }
}


// Hotel Schema (matching models/Hotel.ts)
const RoomSchema = new mongoose.Schema({
    roomType: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    totalRooms: { type: Number, required: true, min: 1 },
    availableRooms: { type: Number, required: true, min: 0 },
    capacity: { type: Number, required: true, min: 1 },
    amenities: { type: [String], default: [] },
});

const HotelSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true },
    description: { type: String, required: true },
    city: { type: String, required: true, index: true },
    address: { type: String, required: true },
    location: { latitude: Number, longitude: Number },
    stars: { type: Number, required: true, min: 1, max: 5, index: true },
    type: { type: String, enum: ["hotel", "guesthouse", "apartment", "rental"], required: true, index: true },
    rooms: { type: [RoomSchema], required: true },
    amenities: { type: [String], default: [] },
    images: { type: [String], default: [] },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    checkInTime: { type: String, default: "14:00" },
    checkOutTime: { type: String, default: "12:00" },
    policies: { cancellation: String, children: String, pets: { type: Boolean, default: false } },
    contact: { phone: String, email: String },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Hotel = mongoose.models.Hotel || mongoose.model('Hotel', HotelSchema);

const hotels = [
    {
        name: "هتل کابل استار (Kabul Star)",
        description: "یکی از مجلل‌ترین هتل‌های کابل با نمای زیبا از شهر و امکانات رفاهی کامل.",
        city: "کابل",
        address: "خیابان دهم، صدارت، کابل، افغانستان",
        stars: 5,
        type: "hotel",
        rating: 4.5,
        reviewCount: 120,
        amenities: ["وای فای رایگان", "استخر", "رستوران", "باشگاه ورزشی", "پارکینگ"],
        images: ["/assets/hotel booking/hotel 1.webp", "/assets/hotel booking/hotel 2.webp"],
        rooms: [
            { roomType: "اتاق یک‌تخته", price: 50, totalRooms: 20, availableRooms: 15, capacity: 1, amenities: ["کولر", "تلویزیون"] },
            { roomType: "اتاق دوتخته (دبل)", price: 80, totalRooms: 30, availableRooms: 10, capacity: 2, amenities: ["کولر", "تلویزیون", "مینی‌بار"] },
        ],
        policies: { cancellation: "کنسلی تا ۲۴ ساعت قبل رایگان", children: "کودکان زیر ۵ سال رایگان", pets: false },
        contact: { phone: "+93 700 123 456", email: "info@kabulstar.af" }
    },
    {
        name: "سرای کابل (Kabul Serena)",
        description: "هتلی لوکس و با امنیت بسیار بالا در مرکز شهر کابل.",
        city: "کابل",
        address: "خیابان رود، کابل، افغانستان",
        stars: 5,
        type: "hotel",
        rating: 4.8,
        reviewCount: 250,
        amenities: ["وای فای رایگان", "استخر رو باز", "رستوران افغانی", "سالن کنفرانس"],
        images: ["/assets/hotel booking/hotel 3.webp", "/assets/hotel booking/hotel 4.webp"],
        rooms: [
            { roomType: "اتاق لوکس", price: 120, totalRooms: 15, availableRooms: 5, capacity: 2, amenities: ["اینترنت پرسرعت", "صندوق امانات"] },
            { roomType: "سوئیت رویال", price: 250, totalRooms: 5, availableRooms: 2, capacity: 2, amenities: ["جکوزی", "صبحانه رایگان"] },
        ],
        policies: { cancellation: "کنسلی غیرقابل استرداد", children: "کودکان با هزینه اضافه", pets: false },
        contact: { phone: "+93 799 555 666", email: "booking@kabulserena.af" }
    },
    {
        name: "هتل ارگ هرات (Arg Herat)",
        description: "هتل ارگ هرات با معماری سنتی و مدرن، اقامتی خوش را برای شما فراهم می‌کند.",
        city: "هرات",
        address: "جاده اصلی، هرات، افغانستان",
        stars: 4,
        type: "hotel",
        rating: 4.2,
        reviewCount: 85,
        amenities: ["وای فای رایگان", "کافی شاپ", "رستوران سنتی"],
        images: ["/assets/hotel booking/hotel 5.webp", "/assets/hotel booking/hotel 6.webp"],
        rooms: [
            { roomType: "اتاق معمولی", price: 40, totalRooms: 25, availableRooms: 20, capacity: 2, amenities: ["کولر آبی"] },
            { roomType: "سوئیت خانوادگی", price: 90, totalRooms: 10, availableRooms: 8, capacity: 4, amenities: ["آشپزخانه کوچک"] },
        ],
        policies: { cancellation: "۴۸ ساعت قبل", children: "کودکان زیر ۳ سال رایگان", pets: false },
        contact: { phone: "+93 700 888 999", email: "contact@argherat.af" }
    },
    {
        name: "هتل الماس ۲ مشهد",
        description: "یکی از بهترین هتل‌های ۵ ستاره مشهد در نزدیکی حرم مطهر رضوی.",
        city: "مشهد",
        address: "خیابان امام رضا، مشهد، ایران",
        stars: 5,
        type: "hotel",
        rating: 4.7,
        reviewCount: 1500,
        amenities: ["وای فای رایگان", "رستوران گردان", "مجموعه آبی", "ترانسفر رایگان"],
        images: ["/assets/hotel booking/hotel 7.webp", "/assets/hotel booking/hotel 8.webp"],
        rooms: [
            { roomType: "اتاق دوتخته الماس", price: 150, totalRooms: 50, availableRooms: 30, capacity: 2, amenities: ["سرویس چای", "هوشمند"] },
            { roomType: "سوئیت پرزیدنت", price: 400, totalRooms: 5, availableRooms: 1, capacity: 2, amenities: ["ویو حرم"] },
        ],
        policies: { cancellation: "طبق قوانین اتحادیه هتل‌داران", children: "زیر ۲ سال رایگان", pets: false },
        contact: { phone: "+98 513 8555555", email: "info@almas2.com" }
    },
    {
        name: "مهمانسرای آریا کابل",
        description: "محیطی صمیمی و اقتصادی برای مسافران و توریست‌ها.",
        city: "کابل",
        address: "کوچه مرغ‌ها، کابل، افغانستان",
        stars: 3,
        type: "guesthouse",
        rating: 4.0,
        reviewCount: 45,
        amenities: ["وای فای رایگان", "صبحانه گرم", "چای‌خانه"],
        images: ["/assets/hotel booking/hotel 9.webp", "/assets/hotel booking/hotel 10.webp", "/assets/hotel booking/hotel 11.webp"],
        rooms: [
            { roomType: "اتاق ساده", price: 20, totalRooms: 15, availableRooms: 10, capacity: 1, amenities: ["پنکه"] },
            { roomType: "اتاق سه تخته", price: 45, totalRooms: 5, availableRooms: 3, capacity: 3, amenities: ["تلویزیون مشترک"] },
        ],
        policies: { cancellation: "کنسلی همان روز ۲۰٪ جریمه", children: "بله", pets: true },
        contact: { phone: "+93 788 111 222", email: "arya@gmail.af" }
    }
];

async function seedHotels() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI!);
        console.log('✅ Connected to MongoDB');

        console.log('\n🧹 Clearing existing hotels...');
        await Hotel.deleteMany({});
        console.log('✅ Cleared Hotel collection');

        console.log('\n🌱 Seeding hotels...');
        const createdHotels = await Hotel.insertMany(hotels);
        console.log(`✅ Seeded ${createdHotels.length} hotels successfully!`);

    } catch (error) {
        console.error('❌ Error seeding hotels:', error);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('\n🔌 Disconnected from MongoDB');
    }
}

seedHotels();
