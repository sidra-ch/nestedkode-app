/**
 * Application Routes Configuration
 * All available routes in the AfghaniBaba application
 */

export const routes = {
  // Public Routes
  home: "/",
  
  // Auth Routes
  auth: {
    login: "/login",
    register: "/register",
  },

  // Main Service Routes
  services: {
    flights: "/flights",
    bus: "/bus",
    busInfo: "/bus-info",
    hotels: "/hotels",
    tour: "/tour",
    insurance: "/insurance",
    taxi: "/taxi",
    restaurant: "/restaurant",
  },

  // Booking Routes
  booking: {
    busBooking: (id: string) => `/bus-booking/${id}`,
    bookingConfirm: (id: string) => `/booking-confirm/${id}`,
    myBookings: "/my-bookings",
  },

  // Payment Routes
  payment: {
    payment: "/payment",
    paymentConfirm: "/payment-confirm",
  },

  // Admin Routes
  admin: {
    dashboard: "/admin/dashboard",
    payments: "/admin/payments",
    routes: "/admin/routes",
    vendors: "/admin/vendors",
  },

  // Vendor Routes
  vendor: {
    dashboard: "/vendor/dashboard",
    buses: "/vendor/buses",
    addBus: "/vendor/add-bus",
    editBus: (id: string) => `/vendor/buses/${id}/edit`,
    bookings: "/vendor/bookings",
    revenue: "/vendor/revenue",
  },
} as const;

/**
 * Navigation Menu Items
 */
export const navItems = [
  { label: "پرواز", href: "/flights" },
  { label: "اتوبوس", href: "/bus-info" },
  { label: "اقامت", href: "/hotels" },
  { label: "تور", href: "/tour" },
  { label: "ویزا", href: "#" },
  { label: "تاکسی", href: "/taxi" },
];

export const userMenuItems = [
  { label: "سفرهای من", href: routes.booking.myBookings, icon: "📋" },
  { label: "پرداخت", href: routes.payment.payment, icon: "💳" },
];

export const adminMenuItems = [
  { label: "داشبورد مدیریت", href: routes.admin.dashboard, icon: "👑" },
  { label: "پرداخت‌ها", href: routes.admin.payments, icon: "💰" },
  { label: "مسیرها", href: routes.admin.routes, icon: "🗺️" },
  { label: "فروشندگان", href: routes.admin.vendors, icon: "🏢" },
];

export const vendorMenuItems = [
  { label: "داشبورد فروشنده", href: routes.vendor.dashboard, icon: "📊" },
  { label: "اتوبوس‌های من", href: routes.vendor.buses, icon: "🚌" },
  { label: "افزودن اتوبوس", href: routes.vendor.addBus, icon: "➕" },
  { label: "رزروها", href: routes.vendor.bookings, icon: "📝" },
  { label: "درآمد", href: routes.vendor.revenue, icon: "💵" },
];

/**
 * All Pages List
 */
export const allPages = [
  // Main Pages
  { path: "/", name: "Home", category: "Main" },
  { path: "/flights", name: "Flights", category: "Services" },
  { path: "/bus", name: "Bus", category: "Services" },
  { path: "/bus-info", name: "Bus Information", category: "Services" },
  { path: "/hotels", name: "Hotels", category: "Services" },
  { path: "/tour", name: "Tour", category: "Services" },
  { path: "/insurance", name: "Travel Insurance", category: "Services" },
  
  // Auth Pages
  { path: "/login", name: "Login", category: "Auth" },
  { path: "/register", name: "Register", category: "Auth" },
  
  // User Pages
  { path: "/my-bookings", name: "My Bookings", category: "User" },
  { path: "/booking-confirm/[id]", name: "Booking Confirmation", category: "User" },
  { path: "/payment", name: "Payment", category: "User" },
  { path: "/payment-confirm", name: "Payment Confirmation", category: "User" },
  
  // Booking Pages
  { path: "/bus-booking/[id]", name: "Bus Booking", category: "Booking" },
  
  // Admin Pages
  { path: "/admin/dashboard", name: "Admin Dashboard", category: "Admin" },
  { path: "/admin/payments", name: "Admin Payments", category: "Admin" },
  { path: "/admin/routes", name: "Admin Routes", category: "Admin" },
  { path: "/admin/vendors", name: "Admin Vendors", category: "Admin" },
  
  // Vendor Pages
  { path: "/vendor/dashboard", name: "Vendor Dashboard", category: "Vendor" },
  { path: "/vendor/buses", name: "Vendor Buses", category: "Vendor" },
  { path: "/vendor/add-bus", name: "Add Bus", category: "Vendor" },
  { path: "/vendor/buses/[id]/edit", name: "Edit Bus", category: "Vendor" },
  { path: "/vendor/bookings", name: "Vendor Bookings", category: "Vendor" },
  { path: "/vendor/revenue", name: "Vendor Revenue", category: "Vendor" },
] as const;

/**
 * Get pages by category
 */
export function getPagesByCategory(category: string) {
  return allPages.filter(page => page.category === category);
}

/**
 * Get all categories
 */
export function getCategories() {
  return [...new Set(allPages.map(page => page.category))];
}
