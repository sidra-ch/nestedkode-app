# AfghaniBaba - All Pages Documentation

## 📄 Complete Page List

This document lists all pages that have been migrated from the afghanibaba project to Nestedkode-app.

---

## 🏠 Main Pages

### Home Page
- **Path**: `/`
- **File**: `app/page.tsx`
- **Description**: Main landing page with search functionality for flights, buses, hotels, tours
- **Features**: 
  - Multi-tab search (Flights, Bus, Hotels, Tours)
  - Popular routes section
  - FAQ section
  - Service highlights

---

## 🔐 Authentication Pages

### Login Page
- **Path**: `/login`
- **File**: `app/login/page.tsx`
- **Description**: User login page for customers, vendors, and admins

### Register Page
- **Path**: `/register`
- **File**: `app/register/page.tsx`
- **Description**: New user registration

---

## 🛫 Service Pages

### Flights
- **Path**: `/flights`
- **File**: `app/flights/page.tsx`
- **Description**: Flight search and booking

### Bus Services
- **Path**: `/bus`
- **File**: `app/bus/page.tsx`
- **Description**: Bus ticket search and listing

- **Path**: `/bus-info`
- **File**: `app/bus-info/page.tsx`
- **Description**: Detailed bus information and schedules

- **Path**: `/bus-booking/[id]`
- **File**: `app/bus-booking/[id]/page.tsx`
- **Description**: Bus booking page for specific route (dynamic route)

### Hotels
- **Path**: `/hotels`
- **File**: `app/hotels/page.tsx`
- **Description**: Hotel search and accommodation booking

### Tours
- **Path**: `/tour`
- **File**: `app/tour/page.tsx`
- **Description**: Tour packages and travel packages

### Travel Insurance
- **Path**: `/insurance`
- **File**: `app/insurance/page.tsx`
- **Description**: Travel insurance purchase

---

## 👤 User Pages

### My Bookings
- **Path**: `/my-bookings`
- **File**: `app/my-bookings/page.tsx`
- **Description**: View all user bookings
- **Access**: Authenticated users only

### Booking Confirmation
- **Path**: `/booking-confirm/[id]`
- **File**: `app/booking-confirm/[id]/page.tsx`
- **Description**: Booking confirmation page (dynamic route)

---

## 💳 Payment Pages

### Payment
- **Path**: `/payment`
- **File**: `app/payment/page.tsx`
- **Description**: Payment processing page

### Payment Confirmation
- **Path**: `/payment-confirm`
- **File**: `app/payment-confirm/page.tsx`
- **Description**: Payment confirmation and receipt

---

## 👑 Admin Pages

All admin pages require admin role authentication.

### Admin Dashboard
- **Path**: `/admin/dashboard`
- **File**: `app/admin/dashboard/page.tsx`
- **Description**: Main admin dashboard with overview

### Admin Payments
- **Path**: `/admin/payments`
- **File**: `app/admin/payments/page.tsx`
- **Description**: Payment management and transactions

### Admin Routes
- **Path**: `/admin/routes`
- **File**: `app/admin/routes/page.tsx`
- **Description**: Bus route management

### Admin Vendors
- **Path**: `/admin/vendors`
- **File**: `app/admin/vendors/page.tsx`
- **Description**: Vendor management and approval

---

## 🚌 Vendor Pages

All vendor pages require vendor role authentication.

### Vendor Dashboard
- **Path**: `/vendor/dashboard`
- **File**: `app/vendor/dashboard/page.tsx`
- **Description**: Vendor overview and statistics

### Vendor Buses
- **Path**: `/vendor/buses`
- **File**: `app/vendor/buses/page.tsx`
- **Description**: List of vendor's buses

### Add Bus
- **Path**: `/vendor/add-bus`
- **File**: `app/vendor/add-bus/page.tsx`
- **Description**: Add new bus to the system

### Edit Bus
- **Path**: `/vendor/buses/[id]/edit`
- **File**: `app/vendor/buses/[id]/edit/page.tsx`
- **Description**: Edit existing bus details (dynamic route)

### Vendor Bookings
- **Path**: `/vendor/bookings`
- **File**: `app/vendor/bookings/page.tsx`
- **Description**: View all bookings for vendor's buses

### Vendor Revenue
- **Path**: `/vendor/revenue`
- **File**: `app/vendor/revenue/page.tsx`
- **Description**: Revenue and financial reports

---

## 🗺️ Utility Pages

### Site Map
- **Path**: `/sitemap`
- **File**: `app/sitemap/page.tsx`
- **Description**: Visual sitemap showing all available pages

### Not Found
- **Path**: `/not-found`
- **File**: `app/not-found.tsx`
- **Description**: 404 error page

---

## 🧩 Components

### Layout Components
- `components/layout/Navbar.tsx` - Main navigation bar
- `components/layout/Footer.tsx` - Site footer
- `components/layout/MobileMenu.tsx` - Mobile navigation menu
- `components/layout/BusNavbar.tsx` - Bus-specific navigation

### Auth Components
- `components/auth/ProtectedRoute.tsx` - Route protection wrapper

### Search Components
- `components/search/SearchTabs.tsx` - Multi-service search tabs

---

## 📦 State Management

### Zustand Stores
- `store/useAuthStore.ts` - Authentication state
- `store/useBookingStore.ts` - Booking state management

---

## 🛠️ Utilities

### Libraries
- `lib/routes.ts` - Centralized route configuration
- `lib/assetPath.ts` - Asset path helpers
- `lib/utils.ts` - General utilities

---

## 📊 Statistics

- **Total Pages**: 26+
- **Service Pages**: 6 (Flights, Bus, Bus Info, Hotels, Tours, Insurance)
- **User Pages**: 4 (My Bookings, Booking Confirm, Payment, Payment Confirm)
- **Admin Pages**: 4 (Dashboard, Payments, Routes, Vendors)
- **Vendor Pages**: 6 (Dashboard, Buses, Add Bus, Edit Bus, Bookings, Revenue)
- **Auth Pages**: 2 (Login, Register)
- **Utility Pages**: 3 (Home, Sitemap, 404)

---

## 🎨 Styling

- **Framework**: Tailwind CSS v4
- **Direction**: RTL (Right-to-Left)
- **Primary Color**: #FDB713 (Gold/Yellow)
- **Fonts**: Noto Sans Arabic, Plus Jakarta Sans

---

## 🚀 Navigation Access

All pages are accessible through:
1. **Main Navigation** - Top navbar for service pages
2. **User Menu** - Dropdown menu for authenticated users
3. **Admin Panel** - Dedicated admin menu (admins only)
4. **Vendor Panel** - Dedicated vendor menu (vendors only)
5. **Footer Links** - Additional navigation in footer
6. **Sitemap** - Visual overview at `/sitemap`

---

## 🔒 Protected Routes

Routes requiring authentication:
- All `/admin/*` routes (admin role)
- All `/vendor/*` routes (vendor role)
- `/my-bookings` (authenticated users)
- `/payment` (authenticated users)

---

## 📱 Responsive Design

All pages are fully responsive with:
- Desktop layouts (>768px)
- Tablet layouts (768px-1024px)
- Mobile layouts (<768px)
- RTL support throughout

---

Last Updated: February 13, 2026
