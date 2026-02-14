# 🔐 Demo Login Credentials

This document contains demo login credentials for testing the Afghanistan Travel Booking Platform.

---

## 🚀 Quick Start

### Option 1: Seed Demo Users (Recommended)

Run the seed script to create demo users in your database:

**IMPORTANT:** The seed script will use the `MONGODB_URI` from your `.env.local` file.

```bash
# Make sure .env.local exists with your MONGODB_URI
# Then run the seed script
npx ts-node scripts/seedDemoUsers.ts
```

The script will automatically:
- Connect to your MongoDB database (Atlas or local)
- Create 3 demo users (Admin, Vendor, User)
- Hash passwords securely with bcrypt
- Display the credentials

### Option 2: Manual Registration

Create accounts manually through the registration page:
- Go to: http://localhost:3000/register
- Register with the credentials below

---

## 👥 Demo User Credentials

### 🔴 Admin Account
**Role:** System Administrator  
**Email:** `admin@humsafar.com`  
**Password:** `Admin123456`  
**Phone:** `+93700111111`

**Access:**
- ✅ Admin Dashboard at `/admin/dashboard`
- ✅ Manage all vendors
- ✅ View all bookings
- ✅ System settings
- ✅ Route management
- ✅ Payment oversight

---

### 🟢 Vendor Account
**Role:** Travel Service Provider  
**Email:** `vendor@humsafar.com`  
**Password:** `Vendor123456`  
**Phone:** `+93700222222`  
**Name:** فروشنده تست

**Company Details:**
- Company Name: شرکت سفر افغانستان
- Address: کابل، افغانستان
- Tax ID: TAX-12345
- Bank Account: ACC-67890

**Access:**
- ✅ Vendor Dashboard at `/vendor/dashboard`
- ✅ Add tours at `/vendor/add-tour`
- ✅ Add buses at `/vendor/add-bus`
- ✅ Manage buses at `/vendor/buses`
- ✅ View bookings at `/vendor/bookings`
- ✅ Revenue tracking at `/vendor/revenue`

---

### 🔵 Regular User Account
**Role:** Customer  
**Email:** `user@humsafar.com`  
**Password:** `User123456`  
**Phone:** `+93700333333`  
**Name:** احمد رحمانی

**Access:**
- ✅ Browse all tours, buses, flights, hotels, taxis
- ✅ Make bookings
- ✅ View booking history at `/my-bookings`
- ✅ Manage profile at `/profile`
- ✅ Write reviews

---

## 📝 How to Use

### 1. First Time Setup

```bash
# 1. Make sure MongoDB is running
# If using MongoDB Atlas, update MONGODB_URI in .env

# 2. Run the seed script
npx ts-node scripts/seedDemoUsers.ts

# 3. Start the development server
npm run dev

# 4. Go to http://localhost:3000/login
```

### 2. Testing Different Roles

#### Test Admin Features:
1. Login with `admin@humsafar.com` / `Admin123456`
2. Visit `/admin/dashboard`
3. Test vendor approval, route management

#### Test Vendor Features:
1. Login with `vendor@humsafar.com` / `Vendor123456`
2. Visit `/vendor/add-tour`
3. Upload images and create a tour
4. Visit `/vendor/add-bus` to add buses

#### Test User Features:
1. Login with `user@humsafar.com` / `User123456`
2. Browse tours at `/tour`
3. Make a booking
4. Check `/my-bookings`

---

## 🔒 Security Notes

### ⚠️ IMPORTANT - Production Deployment

**Before deploying to production:**

1. **Delete these demo users** from the database
2. **Change the seed script** or remove it
3. **Never commit `.env` files** with real credentials
4. **Use strong passwords** for production admin accounts
5. **Enable 2FA** for admin accounts

### Password Requirements

All demo passwords follow these rules:
- ✅ Minimum 8 characters
- ✅ Contains uppercase letters
- ✅ Contains numbers
- ✅ Meets bcrypt hashing standards

---

## 🛠️ Troubleshooting

### "User already exists" Error

If you see this when running the seed script:
```bash
⚠️  User already exists: admin@humsafar.com (admin)
```

**Solution 1: Use Existing Credentials**  
The users are already in the database. Just login with the credentials above.

**Solution 2: Delete and Recreate**  
```bash
# Connect to MongoDB and delete existing demo users
# Then run the seed script again
```

### "Cannot connect to MongoDB" Error

**Check:**
1. MongoDB is running: `mongod --version`
2. Connection string in `.env` is correct
3. Network access (if using MongoDB Atlas)

### Forgot Password

Since this is a demo, you can:
1. **Re-run the seed script** - it will show passwords for existing users
2. **Delete the user** from MongoDB and re-create
3. **Manually update password** in MongoDB with bcrypt hash

---

## 📊 Database Schema

Demo users are stored in the `users` collection with this structure:

```json
{
  "_id": "ObjectId",
  "name": "Admin User",
  "email": "admin@humsafar.com",
  "password": "$2a$10$hashedPassword...",
  "phone": "+93700111111",
  "role": "admin",
  "isApproved": true,
  "createdAt": "2026-02-15T...",
  "updatedAt": "2026-02-15T..."
}
```

---

## 🎯 Testing Checklist

After seeding demo users, test these scenarios:

### Authentication Flow
- [ ] Login with admin account
- [ ] Login with vendor account
- [ ] Login with user account
- [ ] Logout and re-login
- [ ] OTP verification (if enabled)

### Admin Panel
- [ ] View dashboard analytics
- [ ] Approve/reject vendors
- [ ] Manage routes
- [ ] View all bookings
- [ ] Access payment reports

### Vendor Panel
- [ ] Add new tour with images
- [ ] Add new bus with routes
- [ ] View vendor bookings
- [ ] Check revenue dashboard
- [ ] Update vendor profile

### User Features
- [ ] Browse tours/buses/flights
- [ ] Make a booking
- [ ] View booking history
- [ ] Write a review
- [ ] Update profile information

---

## 📞 Support

If you encounter issues with demo credentials:

1. Check [PROJECT_COMPLETION_REPORT.md](PROJECT_COMPLETION_REPORT.md) for system status
2. Review [docs/DATABASE-ERD.md](docs/DATABASE-ERD.md) for schema details
3. Check MongoDB connection in `lib/db.ts`
4. Verify authentication logic in `store/useAuthStore.ts`

---

**Last Updated:** February 15, 2026  
**Version:** 1.0  
**Project:** Afghanistan Travel Booking Platform (Humsafar)
