const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env.local') });

let MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in .env.local');
    process.exit(1);
}

// FIX FOR WINDOWS NODE.JS DNS BUG (MATCHING lib/db.ts):
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

// Minimal User Schema for seeding
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'vendor', 'admin'], default: 'user' },
    phone: String,
    isApproved: { type: Boolean, default: true },
    lastLogin: Date,
    loginCount: { type: Number, default: 0 }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

const demoUsers = [
    {
        name: 'Admin Demo',
        email: 'admin@demo.com',
        password: 'password123',
        role: 'admin',
        phone: '09120000001'
    },
    {
        name: 'Vendor Demo',
        email: 'vendor@demo.com',
        password: 'password123',
        role: 'vendor',
        phone: '09120000002'
    },
    {
        name: 'User Demo',
        email: 'user@demo.com',
        password: 'password123',
        role: 'user',
        phone: '09120000003'
    }
];

async function seed() {
    try {
        console.log('Connecting to MongoDB (with Windows DNS fix)...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected.');

        for (const userData of demoUsers) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);

            await User.findOneAndUpdate(
                { email: userData.email.toLowerCase() },
                { ...userData, password: hashedPassword, email: userData.email.toLowerCase() },
                { upsert: true, new: true }
            );
            console.log(`Seeded/Updated user: ${userData.email} (${userData.role})`);
        }

        console.log('✅ Seeding completed successfully.');
    } catch (error) {
        console.error('❌ Seeding failed:', error);
    } finally {
        await mongoose.connection.close();
    }
}

seed();
