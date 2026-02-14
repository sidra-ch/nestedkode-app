/**
 * Demo Users Seed Script
 * 
 * This script creates demo users for testing:
 * - Admin user
 * - Vendor user
 * - Regular user
 * 
 * Run: npx ts-node scripts/seedDemoUsers.ts
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// MongoDB connection string from environment
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

console.log('🌐 Using MongoDB:', MONGODB_URI.includes('mongodb.net') ? 'MongoDB Atlas' : 'Local MongoDB');

// User Schema (matching models/User.ts)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ['user', 'vendor', 'admin'], default: 'user' },
  isApproved: { type: Boolean, default: false },
  vendorDetails: {
    companyName: String,
    companyAddress: String,
    taxId: String,
    bankAccount: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

// Demo users data
const demoUsers = [
  {
    name: 'Admin User',
    email: 'admin@humsafar.com',
    password: 'Admin123456',
    phone: '+93700111111',
    role: 'admin',
    isApproved: true,
  },
  {
    name: 'فروشنده تست',
    email: 'vendor@humsafar.com',
    password: 'Vendor123456',
    phone: '+93700222222',
    role: 'vendor',
    isApproved: true,
    vendorDetails: {
      companyName: 'شرکت سفر افغانستان',
      companyAddress: 'کابل، افغانستان',
      taxId: 'TAX-12345',
      bankAccount: 'ACC-67890',
    },
  },
  {
    name: 'احمد رحمانی',
    email: 'user@humsafar.com',
    password: 'User123456',
    phone: '+93700333333',
    role: 'user',
    isApproved: true,
  },
];

async function seedDemoUsers() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI!);
    console.log('✅ Connected to MongoDB');

    console.log('\n🌱 Seeding demo users...\n');

    for (const userData of demoUsers) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      
      if (existingUser) {
        console.log(`⚠️  User already exists: ${userData.email} (${userData.role})`);
        console.log(`   Password: ${userData.password}`);
        continue;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Create user
      await User.create({
        ...userData,
        password: hashedPassword,
      });

      console.log(`✅ Created ${userData.role} user: ${userData.email}`);
      console.log(`   Name: ${userData.name}`);
      console.log(`   Password: ${userData.password}`);
      console.log(`   Phone: ${userData.phone}`);
      console.log('');
    }

    console.log('\n🎉 Demo users seeded successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('─'.repeat(50));
    demoUsers.forEach(user => {
      console.log(`\n${user.role.toUpperCase()}:`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Password: ${user.password}`);
    });
    console.log('\n' + '─'.repeat(50));

  } catch (error) {
    console.error('❌ Error seeding demo users:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

// Run the seed function
seedDemoUsers();
