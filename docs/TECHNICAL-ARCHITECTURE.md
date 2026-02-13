# Humsafar – Technical Architecture Document

## Version: 1.0  
## Date: February 13, 2026  
## Project: Travel Services Platform

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Technology Stack](#2-technology-stack)
3. [Architecture Patterns](#3-architecture-patterns)
4. [System Layers](#4-system-layers)
5. [Database Architecture](#5-database-architecture)
6. [API Architecture](#6-api-architecture)
7. [Security Architecture](#7-security-architecture)
8. [Scalability Strategy](#8-scalability-strategy)
9. [Integration Architecture](#9-integration-architecture)
10. [Deployment Architecture](#10-deployment-architecture)

---

## 1. System Overview

### 1.1 Purpose
Humsafar is a comprehensive travel booking platform enabling users to search, compare, and book flights, hotels, buses, and taxi services across Afghanistan with future global expansion capabilities.

### 1.2 Key Features
- Multi-service travel booking (Flights, Hotels, Buses, Taxis)
- User authentication & authorization
- Payment processing
- Discount & promotional system
- Review & rating system
- Notification system (Email/SMS)
- Admin panel & vendor dashboards
- Multilingual support (Persian, Pashto, English)

### 1.3 Architecture Goals
- **Modularity**: Each service module is independently maintainable
- **Scalability**: Horizontal scaling capability
- **Security**: Industry-standard authentication and encryption
- **Performance**: Sub-3-second page load times
- **Extensibility**: API-first design for future integrations

---

## 2. Technology Stack

### 2.1 Frontend
| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| Framework | Next.js | 16.1.6 | React-based full-stack framework |
| UI Library | React | 19.2.3 | Component-based UI |
| Styling | Tailwind CSS | 4.0 | Utility-first CSS framework |
| State Management | Zustand | Latest | Lightweight state management |
| Language | TypeScript | 5.7.2 | Type-safe development |
| Build Tool | Turbopack | Built-in | Next.js build optimizer |

### 2.2 Backend
| Component | Technology | Purpose |
|-----------|------------|---------|
| Runtime | Node.js 18+ | JavaScript runtime |
| Framework | Next.js API Routes | Serverless API endpoints |
| ORM | Mongoose | MongoDB object modeling |
| Authentication | JWT | Stateless authentication |
| Password Hashing | bcryptjs | Secure password storage |

### 2.3 Database
| Component | Technology | Purpose |
|-----------|------------|---------|
| Primary DB | MongoDB Atlas | NoSQL document database |
| Caching | (Future) Redis | Session & query caching |
| File Storage | (Future) AWS S3 | Image & document storage |

### 2.4 Infrastructure
| Component | Technology | Purpose |
|-----------|------------|---------|
| Hosting | Vercel / AWS | Application hosting |
| CDN | Cloudflare / Vercel Edge | Static asset delivery |
| SSL | Let's Encrypt / Cloudflare | HTTPS encryption |
| Monitoring | (Future) Sentry | Error tracking |

---

## 3. Architecture Patterns

### 3.1 Overall Architecture
**Pattern**: Monolithic with Modular Design (Future Microservices-Ready)

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                        │
│  (Next.js Frontend - React Components + Pages)          │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                   API GATEWAY LAYER                     │
│         (Next.js API Routes - RESTful Endpoints)        │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  BUSINESS LOGIC LAYER                   │
│    ┌──────────┬──────────┬──────────┬──────────┐      │
│    │ Flights  │  Hotels  │  Buses   │  Taxis   │      │
│    └──────────┴──────────┴──────────┴──────────┘      │
│    ┌──────────┬──────────┬──────────┬──────────┐      │
│    │Bookings  │ Payments │ Reviews  │Discounts │      │
│    └──────────┴──────────┴──────────┴──────────┘      │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    DATA ACCESS LAYER                    │
│            (Mongoose Models + MongoDB)                  │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    DATABASE LAYER                       │
│                  (MongoDB Atlas Cluster)                │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Design Patterns Used

#### 3.2.1 MVC Pattern
- **Models**: MongoDB schemas (`/models`)
- **Views**: React components (`/components`, `/app`)
- **Controllers**: API route handlers (`/app/api`)

#### 3.2.2 Repository Pattern
- Mongoose models act as repositories
- Centralized database access through models
- Abstraction layer for data operations

#### 3.2.3 Middleware Pattern
- Authentication middleware (JWT verification)
- Request validation middleware
- Error handling middleware

#### 3.2.4 Factory Pattern
- Notification factory (Email/SMS channel selection)
- Payment gateway factory (Multi-gateway support)

---

## 4. System Layers

### 4.1 Presentation Layer
**Location**: `/app`, `/components`

**Responsibilities**:
- User interface rendering
- Client-side routing (Next.js App Router)
- Form handling and validation
- State management (Zustand stores)

**Key Components**:
```
/app
  /flights      → Flight search & booking pages
  /hotels       → Hotel search & booking pages
  /bus          → Bus search & booking pages
  /taxi         → Taxi search & booking pages (NEW)
  /checkout     → Booking checkout flow
  /profile      → User dashboard
  /admin        → Admin panel pages
  /vendor       → Vendor dashboard pages
  
/components
  /layout       → Navbar, Footer, MobileMenu
  /auth         → Login, Register modals
  /search       → Search forms
```

### 4.2 Application Layer (API Layer)
**Location**: `/app/api`

**Responsibilities**:
- Request/response handling
- Authentication & authorization
- Business logic orchestration
- Data validation

**API Endpoints**:
```
/api
  /auth
    /register   → POST - User registration
    /login      → POST - User login
    /me         → GET - Get current user
  
  /flights
    /           → GET (search), POST (create)
    /[id]       → GET, PUT, DELETE
  
  /hotels
    /           → GET (search), POST (create)
    /[id]       → GET, PUT, DELETE
  
  /buses
    /           → GET (search), POST (create)
    /[id]       → GET, PUT, DELETE
  
  /taxis
    /           → GET (search), POST (create)
    /[id]       → GET, PUT, DELETE
  
  /bookings
    /           → GET (list user bookings), POST (create)
    /[id]       → GET, PUT (update status), DELETE
  
  /payments
    /           → POST - Process payment
    /verify     → POST - Verify payment
  
  /reviews
    /           → GET, POST
    /[id]       → PUT (approve), DELETE
  
  /discounts
    /           → GET (validate code), POST (create)
    /[id]       → PUT, DELETE
  
  /notifications
    /           → GET (user notifications), POST (send)
  
  /cities
    /           → GET (search cities), POST (add)
  
  /admin
    /dashboard  → GET - Admin analytics
    /vendors    → GET, POST
    /vendors/[id] → PUT (approve/reject), DELETE
  
  /vendor
    /dashboard  → GET - Vendor analytics
```

### 4.3 Domain Layer
**Location**: `/models`, `/lib`

**Responsibilities**:
- Business entities (models)
- Business rules & validation
- Helper functions
- Authentication logic

**Models**:
```typescript
User         → Authentication & authorization
Flight       → Flight inventory & scheduling
Hotel        → Hotel & room management
Bus          → Bus routes & capacity
Taxi         → Taxi service management
Booking      → Booking records
Payment      → Payment transactions
Review       → User reviews & ratings
Discount     → Promotional codes
Notification → Email/SMS notifications
City         → Cities & airports database
Route        → Travel routes
```

### 4.4 Data Layer
**Location**: MongoDB Atlas

**Responsibilities**:
- Data persistence
- Indexing for performance
- Data relationships
- Query optimization

---

## 5. Database Architecture

### 5.1 Database Schema

#### 5.1.1 Collections Overview
| Collection | Documents | Purpose |
|------------|-----------|---------|
| users | ~10K-1M | User accounts & authentication |
| flights | ~1K-100K | Flight inventory |
| hotels | ~500-50K | Hotel properties & rooms |
| buses | ~500-10K | Bus routes & schedules |
| taxis | ~1K-50K | Taxi services |
| bookings | ~10K-1M | All booking transactions |
| payments | ~10K-1M | Payment records |
| reviews | ~5K-500K | User reviews |
| discounts | ~50-1K | Promo codes |
| notifications | ~50K-5M | User notifications |
| cities | ~100-1K | Cities & airports |
| routes | ~500-10K | Travel routes |

### 5.2 Key Indexes

**Performance Optimization Indexes**:

```javascript
// Users Collection
users: { email: 1 } UNIQUE
users: { role: 1, isApproved: 1 }

// Flights Collection
flights: { flightNumber: 1 } UNIQUE
flights: { origin: 1, destination: 1, departureTime: 1 }
flights: { type: 1, status: 1 }

// Hotels Collection
hotels: { city: 1, stars: 1, isActive: 1 }
hotels: { rating: -1 }

// Buses Collection
buses: { from: 1, to: 1, date: 1 }
buses: { vendorId: 1, status: 1 }

// Taxis Collection
taxis: { from: 1, to: 1, departureDate: 1, isApproved: 1 }
taxis: { driverId: 1, status: 1 }

// Bookings Collection
bookings: { userId: 1, status: 1 }
bookings: { serviceType: 1, serviceId: 1 }
bookings: { paymentStatus: 1, createdAt: -1 }

// Reviews Collection
reviews: { serviceType: 1, serviceId: 1, isApproved: 1 }
reviews: { rating: -1 }

// Discounts Collection
discounts: { code: 1, isActive: 1 }
discounts: { validFrom: 1, validUntil: 1 }

// Cities Collection
cities: { name: 1, isActive: 1 }
cities: { type: 1, isActive: 1 }
```

### 5.3 Data Relationships

```
User (1) ─────────── (M) Booking
User (1) ─────────── (M) Review
User (1) ─────────── (M) Notification
User (vendor) (1) ── (M) Flight
User (vendor) (1) ── (M) Hotel
User (vendor/driver) (1) ── (M) Taxi

Booking (M) ─────────(1) Flight/Hotel/Bus/Taxi (polymorphic)
Booking (1) ─────────(1) Payment

Review (M) ──────────(1) Flight/Hotel/Bus/Taxi (polymorphic)

Discount (M) ────────(M) Booking (applied codes)
```

### 5.4 Data Integrity Rules

**Booking Constraints**:
- Cannot book more seats than available
- Auto-decrement `availableSeats` on booking
- Auto-increment on cancellation
- Prevent overbooking through atomic operations

**Payment Constraints**:
- Payment must exist before booking confirmation
- Booking status auto-updates on payment verification
- Refund percentage based on cancellation time

**Review Constraints**:
- Users can only review services they've booked
- One review per user per service
- Admin approval required before display

---

## 6. API Architecture

### 6.1 RESTful API Design

**Naming Convention**:
```
Resource-based URLs
GET    /api/flights       → List/search flights
POST   /api/flights       → Create flight
GET    /api/flights/:id   → Get single flight
PUT    /api/flights/:id   → Update flight
DELETE /api/flights/:id   → Delete flight
```

**Query Parameters**:
```
/api/flights?origin=Kabul&destination=Dubai&date=2026-03-01
/api/hotels?city=Kabul&stars=5&minPrice=50&maxPrice=200
/api/discounts?code=SUMMER2026&serviceType=flight
```

### 6.2 Request/Response Format

**Standard Success Response**:
```json
{
  "success": true,
  "message": "عملیات با موفقیت انجام شد",
  "data": { },
  "count": 10
}
```

**Standard Error Response**:
```json
{
  "success": false,
  "error": "خطا در انجام عملیات",
  "code": "VALIDATION_ERROR"
}
```

### 6.3 Authentication Flow

```
1. User Login
   POST /api/auth/login
   { email, password }
   ↓
2. Server validates credentials
   ↓
3. Generate JWT token
   payload: { userId, email, role }
   ↓
4. Return token to client
   { success: true, token, user }
   ↓
5. Client stores token (localStorage/cookie)
   ↓
6. Subsequent requests include header:
   Authorization: Bearer <token>
   ↓
7. Server verifies token middleware
   verifyToken(token) → decoded payload
   ↓
8. Grant/deny access based on role
```

### 6.4 Authorization Matrix

| Endpoint | User | Vendor | Admin |
|----------|------|--------|-------|
| POST /api/flights | ❌ | ✅ | ✅ |
| POST /api/hotels | ❌ | ✅ | ✅ |
| POST /api/buses | ❌ | ✅ | ✅ |
| POST /api/taxis | ✅ | ✅ | ✅ |
| POST /api/bookings | ✅ | ✅ | ✅ |
| POST /api/reviews | ✅ | ✅ | ✅ |
| POST /api/discounts | ❌ | ❌ | ✅ |
| PUT /api/reviews/:id | ❌ | ❌ | ✅ |
| DELETE /api/flights/:id | ❌ | ❌ | ✅ |
| GET /api/admin/dashboard | ❌ | ❌ | ✅ |

---

## 7. Security Architecture

### 7.1 Authentication Security

**Password Security**:
- bcryptjs hashing (salt rounds: 10)
- Passwords never stored in plain text
- Password complexity requirements enforced

**JWT Security**:
```javascript
// Token Generation
jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })

// Token Structure
Header:  { alg: 'HS256', typ: 'JWT' }
Payload: { userId, email, role, iat, exp }
Signature: HMACSHA256(header + payload + secret)
```

**Token Storage**:
- Client: localStorage (with XSS protection)
- Future: HttpOnly cookies for enhanced security

### 7.2 API Security

**Protection Measures**:
1. **CORS**: Configured allowed origins
2. **Rate Limiting**: (Future) Prevent API abuse
3. **Input Validation**: All inputs sanitized
4. **SQL Injection**: MongoDB parameterized queries
5. **XSS Protection**: React auto-escaping + Content Security Policy
6. **CSRF Protection**: SameSite cookie attribute

### 7.3 Data Security

**Encryption**:
- HTTPS/TLS for data in transit
- Password hashing for data at rest
- Database connection encryption (MongoDB SSL)

**Access Control**:
- Role-based access control (RBAC)
- Resource-based authorization
- Vendor isolation (can only access own resources)

### 7.4 Sensitive Data Handling

**PII Protection**:
- Passport/ID numbers encrypted
- Email verification required
- Phone number verification (OTP)
- Payment card data never stored (use payment gateway tokens)

---

## 8. Scalability Strategy

### 8.1 Horizontal Scaling

**Application Layer**:
- Stateless API design (JWT-based)
- Load balancer distribution (Vercel/AWS ALB)
- No server-side session dependency

**Database Layer**:
- MongoDB Atlas auto-scaling
- Read replicas for analytics queries
- Sharding for high-volume collections

### 8.2 Caching Strategy

**Client-Side**:
- Next.js static generation (SSG)
- Client-side caching (React Query / SWR)

**Server-Side** (Future):
```
Redis Cache
├─ Session cache (TTL: 24h)
├─ Search results cache (TTL: 5m)
├─ City/airport data (TTL: 7d)
└─ Popular routes cache (TTL: 1h)
```

### 8.3 CDN Strategy

**Static Assets**:
- Images: Vercel Edge Network / Cloudflare CDN
- CSS/JS bundles: Edge caching
- API routes: Edge functions (future)

### 8.4 Database Optimization

**Query Optimization**:
- Proper indexing (see section 5.2)
- Lean queries (return plain objects)
- Pagination for large result sets
- Aggregation pipeline for complex queries

**Connection Pooling**:
```javascript
// MongoDB connection with singleton pattern
let cachedConnection = null;

async function connectDB() {
  if (cachedConnection) return cachedConnection;
  
  cachedConnection = await mongoose.connect(MONGODB_URI, {
    maxPoolSize: 10,
    minPoolSize: 2,
  });
  
  return cachedConnection;
}
```

---

## 9. Integration Architecture

### 9.1 Third-Party Integrations (Future-Ready)

```
┌───────────────────────────────────────────────────────┐
│                  HUMSAFAR PLATFORM                    │
└───────────────────────────────────────────────────────┘
              ↓             ↓             ↓
    ┌─────────────┐  ┌──────────┐  ┌──────────────┐
    │   Payment   │  │   SMS    │  │    Email     │
    │  Gateways   │  │ Gateway  │  │   Service    │
    └─────────────┘  └──────────┘  └──────────────┘
    ┌─────────────┐  ┌──────────┐  ┌──────────────┐
    │  Flight API │  │ Hotel API│  │ Google Maps  │
    │ (Amadeus)   │  │(Booking) │  │     API      │
    └─────────────┘  └──────────┘  └──────────────┘
```

### 9.2 Payment Gateway Integration

**Architecture**:
```javascript
// Factory pattern for multiple gateways
interface PaymentGateway {
  processPayment(amount, metadata): Promise<PaymentResult>
  verifyPayment(transactionId): Promise<VerificationResult>
  refund(transactionId, amount): Promise<RefundResult>
}

class MPayFactory implements PaymentGateway { ... }
class AziziBankFactory implements PaymentGateway { ... }
class InternationalGateway implements PaymentGateway { ... }

// Usage
const gateway = PaymentGatewayFactory.create(gatewayType);
const result = await gateway.processPayment(amount, metadata);
```

### 9.3 Notification Integration

**Email Service** (Future):
- SendGrid / AWS SES
- Transactional templates
- Bounce handling

**SMS Service** (Future):
- Twilio / Afghan SMS providers
- OTP delivery
- Booking confirmations

### 9.4 External API Integration

**Flight APIs** (Future):
- Amadeus / Sabre
- Real-time availability
- Price updates

**Hotel APIs** (Future):
- Booking.com / Expedia
- Inventory sync
- Rate parity

---

## 10. Deployment Architecture

### 10.1 Deployment Environments

```
Development  →  Staging  →  Production
(Local)         (Vercel Preview)  (Vercel Production)
```

### 10.2 CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml (Example)
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup Node.js
      - Install dependencies (npm install)
      - Run tests (npm test)
      - Build application (npm run build)
      - Deploy to Vercel
```

### 10.3 Environment Configuration

```
Development:
  MONGODB_URI=mongodb://localhost:27017/humsafar
  JWT_SECRET=dev_secret_key
  NODE_ENV=development

Staging:
  MONGODB_URI=mongodb+srv://staging.cluster.mongodb.net/humsafar
  JWT_SECRET=staging_secret
  NODE_ENV=staging

Production:
  MONGODB_URI=mongodb+srv://prod.cluster.mongodb.net/humsafar
  JWT_SECRET=<strong-random-secret>
  NODE_ENV=production
  NEXT_PUBLIC_APP_URL=https://humsafar.af
```

### 10.4 Infrastructure Diagram

```
                    Internet
                       │
                       ↓
          ┌────────────────────────┐
          │   Cloudflare CDN       │
          │   (SSL, DDoS, Cache)   │
          └────────────────────────┘
                       │
                       ↓
          ┌────────────────────────┐
          │   Vercel Platform      │
          │   (Next.js Hosting)    │
          └────────────────────────┘
                       │
          ┌────────────┴────────────┐
          │                         │
          ↓                         ↓
┌──────────────────┐    ┌──────────────────┐
│  Edge Functions  │    │  Serverless API  │
│  (Static Pages)  │    │   (API Routes)   │
└──────────────────┘    └──────────────────┘
                               │
                               ↓
                    ┌───────────────────┐
                    │   MongoDB Atlas   │
                    │  (Primary Cluster)│
                    └───────────────────┘
```

### 10.5 Monitoring & Logging

**Application Monitoring** (Future):
- Sentry for error tracking
- Vercel Analytics for performance
- Google Analytics for user behavior

**Database Monitoring**:
- MongoDB Atlas monitoring
- Query performance insights
- Alert configuration

**Logging Strategy**:
```javascript
// Structured logging
console.log({
  level: 'info',
  message: 'Booking created',
  userId: 'xxx',
  bookingId: 'xxx',
  timestamp: new Date().toISOString()
});
```

---

## 11. Performance Optimization

### 11.1 Frontend Optimization

- **Code Splitting**: Next.js automatic code splitting
- **Image Optimization**: Next.js Image component (future)
- **Lazy Loading**: React.lazy for non-critical components
- **Bundle Size**: Analyzed with Next.js bundle analyzer

### 11.2 Backend Optimization

- **Database Queries**: Indexed fields, lean queries
- **Connection Pooling**: MongoDB connection reuse
- **Response Caching**: Cache frequently accessed data
- **Compression**: gzip compression for API responses

### 11.3 Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| Page Load Time | < 3s | TBD |
| API Response Time | < 500ms | TBD |
| Time to Interactive | < 5s | TBD |
| Database Query Time | < 100ms | TBD |

---

## 12. Disaster Recovery & Backup

### 12.1 Backup Strategy

**Database Backups**:
- MongoDB Atlas automated daily backups
- Point-in-time recovery (24-hour window)
- Manual backup before major deployments

**Code Backups**:
- Git repository (GitHub)
- Docker images (future)

### 12.2 Recovery Procedures

**Database Recovery**:
1. Identify backup snapshot
2. Create new cluster from snapshot
3. Update connection string
4. Verify data integrity
5. Switch DNS/traffic

**Application Recovery**:
1. Rollback to previous Vercel deployment
2. Git revert to last stable commit
3. Redeploy application

---

## 13. Future Enhancements

### Phase 2 (Q2 2026)
- Redis caching layer
- Advanced search with Elasticsearch
- Real-time notifications (WebSocket)

### Phase 3 (Q3 2026)
- Mobile apps (React Native)
- Microservices migration
- Kubernetes deployment

### Phase 4 (Q4 2026)
- AI-powered recommendations
- Dynamic pricing engine
- Multi-currency support

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-13 | Technical Team | Initial document |

---

**End of Document**
