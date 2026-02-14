# Humsafar – Visual Architecture Diagrams

## Version: 1.0  
## Date: February 14, 2026

---

## Table of Contents

1. [System Architecture Overview](#1-system-architecture-overview)
2. [Database Entity Relationship Diagram](#2-database-entity-relationship-diagram)
3. [User Journey & Booking Flow](#3-user-journey--booking-flow)
4. [API Gateway & Routing](#4-api-gateway--routing)
5. [Deployment Architecture](#5-deployment-architecture)
6. [Microservices Future State](#6-microservices-future-state)

---

## 1. System Architecture Overview

```mermaid
graph TB
    subgraph "Client Layer"
        WEB["🌐 Web Browser<br/>Next.js Frontend<br/>React 19"]
        MOBILE["📱 Mobile App<br/>React Native<br/>Future"]
    end

    subgraph "CDN & Cache"
        CDN["🔄 CDN<br/>Static Assets"]
        CACHE["⚡ Redis Cache<br/>Session/Data Cache"]
    end

    subgraph "API Gateway"
        NEXTJS["🔗 Next.js API Routes<br/>TypeScript<br/>34 Endpoints"]
    end

    subgraph "Business Logic Layer"
        AUTH["🔐 Authentication<br/>JWT + bcrypt"]
        FLIGHTS["✈️ Flights Service<br/>Search, Book, Manage"]
        HOTELS["🏨 Hotels Service<br/>Rooms, Availability"]
        BUSES["🚌 Bus Service<br/>Routes, Scheduling"]
        TAXIS["🚕 Taxi Service<br/>Drivers, Pricing"]
        BOOKING["📦 Booking Engine<br/>Capacity, Status"]
        PAYMENT["💳 Payment Service<br/>Gateways, Refunds"]
    end

    subgraph "Data Layer"
        MONGODB["🗄️ MongoDB<br/>12 Collections<br/>Users, Bookings, etc"]
    end

    subgraph "External Integrations"
        PAYGATE["💰 Payment Gateways<br/>Stripe, Zarinpal"]
        SMS["📲 SMS Gateway<br/>Twilio / SNS"]
        EMAIL["📧 Email Service<br/>SendGrid / AWS SES"]
    end

    subgraph "Admin & Monitoring"
        ADMIN["👨‍💼 Admin Panel<br/>Dashboard, Analytics"]
        LOGS["📊 Logs & Monitoring<br/>Sentry, Prometheus"]
    end

    WEB --> CDN
    WEB --> NEXTJS
    MOBILE --> NEXTJS
    CDN --> CACHE
    NEXTJS --> AUTH
    NEXTJS --> FLIGHTS
    NEXTJS --> HOTELS
    NEXTJS --> BUSES
    NEXTJS --> TAXIS
    NEXTJS --> BOOKING
    NEXTJS --> PAYMENT
    FLIGHTS --> MONGODB
    HOTELS --> MONGODB
    BUSES --> MONGODB
    TAXIS --> MONGODB
    BOOKING --> MONGODB
    PAYMENT --> MONGODB
    AUTH --> MONGODB
    PAYMENT --> PAYGATE
    NODEJS["Node.js"] -.->|sends| SMS
    NODEJS -.->|sends| EMAIL
    ADMIN --> NEXTJS
    NEXTJS --> LOGS

    style WEB fill:#4F46E5
    style NEXTJS fill:#000000,color:#fff
    style MONGODB fill:#13AA52,color:#fff
    style FLIGHTS fill:#2563EB
    style HOTELS fill:#2563EB
    style BUSES fill:#2563EB
    style TAXIS fill:#2563EB
```

---

## 2. Database Entity Relationship Diagram

```mermaid
erDiagram
    USERS ||--o{ BOOKINGS : creates
    USERS ||--o{ REVIEWS : writes
    USERS ||--o{ PAYMENTS : makes
    USERS ||--o{ NOTIFICATIONS : receives
    
    FLIGHTS ||--o{ BOOKINGS : "booked-in"
    HOTELS ||--o{ BOOKINGS : "booked-in"
    BUSES ||--o{ BOOKINGS : "booked-in"
    TAXIS ||--o{ BOOKINGS : "booked-in"
    RESTAURANTS ||--o{ BOOKINGS : "booked-in"
    
    BOOKINGS ||--|| PAYMENTS : "has-one"
    BOOKINGS ||--o{ REVIEWS : "receives"
    BOOKINGS ||--o{ REFUNDS : "can-request"
    
    DISCOUNTS ||--o{ BOOKINGS : "applies-to"
    DISCOUNTS ||--o{ PAYMENTS : "affects"
    
    CITIES ||--o{ FLIGHTS : "departure/arrival"
    CITIES ||--o{ HOTELS : "located-in"
    CITIES ||--o{ ROUTES : "contains"
    CITIES ||--o{ BUSES : "serves"
    CITIES ||--o{ TAXIS : "serves"
    
    ROUTES ||--o{ BUSES : "follows"
    ROUTES ||--o{ TAXIS : "follows"
    ROUTES ||--o{ FLIGHTS : "connects"
    
    PAYMENTGATEWAY ||--o{ PAYMENTS : "processes"
    NOTIFICATIONSETTINGS ||--o{ NOTIFICATIONS : "configures"
    CANCELLATIONPOLICY ||--|| REFUNDS : "determines"
    PAYMENTGATEWAY ||--o{ BOOKINGS : "validates"

    USERS {
        ObjectId _id
        string email
        string password
        string phone
        string firstName
        string lastName
        string role
        boolean verified
        date createdAt
    }

    BOOKINGS {
        ObjectId _id
        ObjectId userId
        string serviceType
        ObjectId serviceId
        string status
        string paymentStatus
        array passengerDetails
        decimal totalPrice
        decimal discount
        decimal finalPrice
        date createdAt
    }

    FLIGHTS {
        ObjectId _id
        string airline
        string departure
        string arrival
        date date
        string departureTime
        string arrivalTime
        decimal price
        integer capacity
        integer bookedSeats
        array amenities
    }

    HOTELS {
        ObjectId _id
        string name
        string type
        ObjectId cityId
        decimal price
        integer totalRooms
        integer availableRooms
        integer rating
        array amenities
    }

    BUSES {
        ObjectId _id
        string company
        ObjectId routeId
        date date
        string departureTime
        string arrivalTime
        decimal price
        integer capacity
        integer bookedSeats
        string busType
    }

    TAXIS {
        ObjectId _id
        string driverId
        ObjectId routeId
        decimal price
        integer capacity
        integer bookedSeats
        string status
    }

    PAYMENTS {
        ObjectId _id
        ObjectId bookingId
        decimal amount
        string status
        string gateway
        string transactionId
        date createdAt
    }

    REVIEWS {
        ObjectId _id
        ObjectId userId
        ObjectId serviceId
        integer rating
        string reviewText
        string status
        date createdAt
    }

    REFUNDS {
        ObjectId _id
        ObjectId bookingId
        decimal refundAmount
        string status
        ObjectId policyId
        date createdAt
    }

    DISCOUNTS {
        ObjectId _id
        string code
        string type
        decimal value
        date expiryDate
        integer maxUses
        integer currentUses
        array serviceTypes
    }

    NOTIFICATIONS {
        ObjectId _id
        ObjectId userId
        string type
        string status
        string content
        date createdAt
    }

    CITIES {
        ObjectId _id
        string name
        string country
        string timezone
        object coordinates
    }

    ROUTES {
        ObjectId _id
        ObjectId originId
        ObjectId destinationId
        integer distance
        string estimatedTime
    }

    RESTAURANTS {
        ObjectId _id
        string name
        ObjectId cityId
        string cuisine
        decimal price
        integer rating
    }

    PAYMENTGATEWAY {
        ObjectId _id
        string name
        string provider
        string apiKey
        boolean isActive
    }

    NOTIFICATIONSETTINGS {
        ObjectId _id
        boolean emailEnabled
        boolean smsEnabled
        array notificationTypes
    }

    CANCELLATIONPOLICY {
        ObjectId _id
        string serviceType
        integer hoursBeforeRefund
        integer refundPercentage
        date effectiveDate
    }
```

---

## 3. User Journey & Booking Flow

### 3.1 New User Registration and First Booking

```mermaid
graph LR
    A["🏠 Visit Homepage"] --> B["📝 Create Account"]
    B --> C["✉️ Verify Email<br/>or OTP"]
    C --> D["✈️ Search Flight"]
    D --> E["🔍 View Results<br/>& Filter"]
    E --> F["🎫 Select Flight"]
    F --> G["👤 Enter Passenger<br/>Details"]
    G --> H["💳 Review & Payment"]
    H --> I["✅ Confirmation"]
    I --> J["📧 Receive Receipt<br/>& Booking Reference"]
    J --> K["📱 Manage Booking<br/>in My Bookings"]

    style A fill:#4F46E5,color:#fff
    style B fill:#7C3AED,color:#fff
    style C fill:#A855F7,color:#fff
    style D fill:#2563EB,color:#fff
    style E fill:#3B82F6,color:#fff
    style F fill:#06B6D4,color:#fff
    style G fill:#10B981,color:#fff
    style H fill:#F59E0B,color:#fff
    style I fill:#10B981,color:#fff
    style J fill:#06B6D4,color:#fff
    style K fill:#2563EB,color:#fff
```

### 3.2 Payment & Refund Flow

```mermaid
graph LR
    A["💳 Payment Initiated"] --> B{Payment<br/>Status?}
    B -->|Pending| C["⏳ Processing"]
    B -->|Approved| D["✅ Booking Confirmed"]
    B -->|Rejected| E["❌ Payment Failed"]
    
    E --> F["🔄 Retry Payment"]
    F --> C
    C --> D
    
    D --> G["🎫 Active Booking"]
    G --> H{User<br/>Cancels?}
    H -->|Yes| I["📋 Check Refund<br/>Policy"]
    I --> J{Eligible<br/>for Refund?}
    J -->|Yes| K["💰 Process Refund"]
    J -->|No| L["❌ No Refund"]
    K --> M["✅ Refund Completed<br/>Notify User"]
    L --> N["ℹ️ Inform User"]

    H -->|No| O["✈️ Service Date"]
    O --> P["✅ Booking Complete"]

    style A fill:#F59E0B,color:#fff
    style D fill:#10B981,color:#fff
    style E fill:#EF4444,color:#fff
    style K fill:#06B6D4,color:#fff
    style M fill:#10B981,color:#fff
    style P fill:#10B981,color:#fff
```

---

## 4. API Gateway & Routing

### 4.1 API Endpoint Architecture

```mermaid
graph TB
    CLIENT["Client Requests"]
    
    CLIENT --> GATEWAY["🔗 API Gateway<br/>Next.js App Router"]
    
    GATEWAY --> AUTH["🔐 Auth Routes<br/>/api/auth/*"]
    GATEWAY --> SERVICES["🛫 Service Routes<br/>/api/flights<br/>/api/hotels<br/>/api/buses<br/>/api/taxis"]
    GATEWAY --> BOOKING["📦 Booking Routes<br/>/api/bookings<br/>/api/checkout"]
    GATEWAY --> PAYMENT["💳 Payment Routes<br/>/api/payments"]
    GATEWAY --> DISCOUNT["🏷️ Discount Routes<br/>/api/discounts"]
    GATEWAY --> REVIEW["⭐ Review Routes<br/>/api/reviews"]
    GATEWAY --> REFUND["💰 Refund Routes<br/>/api/refunds"]
    GATEWAY --> ADMIN["👨‍💼 Admin Routes<br/>/api/admin/*"]
    GATEWAY --> VENDOR["🏢 Vendor Routes<br/>/api/vendor/*"]
    
    AUTH --> AUTHDB["Users Collection"]
    SERVICES --> DB["Flights/Hotels/Buses<br/>Taxis Collections"]
    BOOKING --> DB
    BOOKING --> BOOKDB["Bookings Collection"]
    PAYMENT --> PAYDB["Payments Collection"]
    DISCOUNT --> DISCDB["Discounts Collection"]
    REVIEW --> REVDB["Reviews Collection"]
    REFUND --> REFDB["Refunds Collection"]
    ADMIN --> DB
    VENDOR --> DB
    
    PAYMENT -->|External| PAYGATE["Payment Gateways"]
    
    style GATEWAY fill:#000000,color:#fff,stroke:#4F46E5,stroke-width:3px
    style AUTH fill:#7C3AED,color:#fff
    style SERVICES fill:#2563EB,color:#fff
    style BOOKING fill:#06B6D4,color:#fff
    style PAYMENT fill:#F59E0B,color:#fff
    style ADMIN fill:#EF4444,color:#fff
```

### 4.2 Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant App as Web App
    participant API as API Routes
    participant DB as MongoDB
    participant JWT as JWT Token

    User->>App: Enter Email & Password
    App->>API: POST /api/auth/login
    API->>DB: Find user by email
    DB-->>API: User document
    API->>API: Verify password with bcrypt
    
    alt Password Valid
        API->>JWT: Create JWT token
        JWT-->>API: token + refreshToken
        API-->>App: { token, user }
        App->>App: Store token in localStorage
        App-->>User: ✅ Login successful
    else Password Invalid
        API-->>App: { error: "Invalid credentials" }
        App-->>User: ❌ Login failed
    end

    Note over User,JWT: User makes authenticated request
    User->>App: Browse bookings
    App->>API: GET /api/my-bookings<br/>Header: Authorization: Bearer {token}
    API->>API: Verify JWT token
    API->>DB: Get bookings for user
    DB-->>API: Bookings array
    API-->>App: { bookings: [...] }
    App-->>User: Display bookings
```

---

## 5. Deployment Architecture

### 5.1 Current Production Setup

```mermaid
graph TB
    subgraph "Client Devices"
        WEB["🌐 Web Browser"]
        MOBILE["📱 Mobile Browser"]
    end

    subgraph "Edge Layer"
        VERCEL["⚡ Vercel CDN<br/>Global Edge Network<br/>Auto-scaling"]
    end

    subgraph "Compute"
        NEXTJS["Next.js 16<br/>Turbopack<br/>Auto-scaling<br/>Serverless Functions"]
    end

    subgraph "Cache"
        REDIS["Redis Cache<br/>Session Storage<br/>Rate Limiting"]
    end

    subgraph "Database"
        MONGODB["MongoDB Atlas<br/>Replicated<br/>Auto-backup<br/>Sharding Ready"]
    end

    subgraph "External Services"
        PAYGATE["Payment Gateways<br/>Stripe, Zarinpal"]
        SMS["SMS Gateway<br/>Twilio"]
        EMAIL["Email Service<br/>SendGrid"]
    end

    subgraph "Monitoring"
        SENTRY["🔍 Sentry<br/>Error Tracking"]
        ANALYTICS["📊 Google Analytics<br/>User Metrics"]
    end

    WEB --> VERCEL
    MOBILE --> VERCEL
    VERCEL --> NEXTJS
    NEXTJS --> REDIS
    NEXTJS --> MONGODB
    NEXTJS --> PAYGATE
    NEXTJS --> SMS
    NEXTJS --> EMAIL
    NEXTJS --> SENTRY
    WEB --> ANALYTICS

    style VERCEL fill:#000000,color:#fff
    style NEXTJS fill:#000000,color:#fff
    style MONGODB fill:#13AA52,color:#fff
    style REDIS fill:#DC2626,color:#fff
```

### 5.2 Future Kubernetes Setup (Year 2+)

```mermaid
graph TB
    subgraph "AWS Region (Multi-AZ)"
        CLOUDFRONT["CloudFront CDN"]
        
        subgraph "Kubernetes Cluster (EKS)"
            INGRESS["Ingress Controller"]
            
            subgraph "Microservices"
                AUTHSVC["Auth Service<br/>3 Replicas"]
                FLIGHTSVC["Flights Service<br/>5 Replicas"]
                HOTELSVC["Hotels Service<br/>5 Replicas"]
                BUSSVC["Bus Service<br/>3 Replicas"]
                TAXISVC["Taxi Service<br/>3 Replicas"]
                BOOKINGSVC["Booking Service<br/>5 Replicas"]
                PAYMENTSVC["Payment Service<br/>5 Replicas"]
                NOTIFICATIONSVC["Notification Service<br/>3 Replicas"]
            end
            
            subgraph "Data Layer"
                MONGODBK["MongoDB StatefulSet<br/>Sharded Cluster<br/>Auto-scaling"]
                REDISK["Redis Cluster<br/>HA Setup<br/>Persistent"]
            end
            
            subgraph "Observability"
                PROMETHEUS["Prometheus<br/>Metrics"]
                GRAFANA["Grafana<br/>Dashboards"]
                LOKI["Loki<br/>Log Aggregation"]
            end
        end
    end

    subgraph "Secondary Region (Standby)"
        DR["Disaster Recovery<br/>Hot Standby"]
    end

    CLOUDFRONT --> INGRESS
    INGRESS --> AUTHSVC
    INGRESS --> FLIGHTSVC
    INGRESS --> HOTELSVC
    INGRESS --> BUSSVC
    INGRESS --> TAXISVC
    INGRESS --> BOOKINGSVC
    INGRESS --> PAYMENTSVC
    INGRESS --> NOTIFICATIONSVC
    
    AUTHSVC --> MONGODBK
    FLIGHTSVC --> MONGODBK
    HOTELSVC --> MONGODBK
    BUSSVC --> MONGODBK
    TAXISVC --> MONGODBK
    BOOKINGSVC --> MONGODBK
    PAYMENTSVC --> MONGODBK
    NOTIFICATIONSVC --> MONGODBK
    
    FLIGHTSVC --> REDISK
    HOTELSVC --> REDISK
    BUSSVC --> REDISK
    TAXISVC --> REDISK
    
    AUTHSVC --> PROMETHEUS
    FLIGHTSVC --> PROMETHEUS
    MONGODBK --> PROMETHEUS
    PROMETHEUS --> GRAFANA
    
    AUTHSVC --> LOKI
    FLIGHTSVC --> LOKI
    HOTELSVC --> LOKI
    
    INGRESS -->|sync| DR

    style AWS fill:#FF9900,color:#000
    style INGRESS fill:#FF9900,color:#000
    style MONGODBK fill:#13AA52,color:#fff
    style REDISK fill:#DC2626,color:#fff
    style PROMETHEUS fill:#E34C26,color:#fff
    style GRAFANA fill:#F6522D,color:#fff
```

---

## 6. Microservices Future State

### 6.1 Service Decomposition (Year 2)

```mermaid
graph TB
    subgraph "API Gateway"
        APIGW["API Gateway<br/>Kong / AWS API Gateway<br/>Rate Limiting<br/>Authentication"]
    end

    subgraph "Core Services"
        AUTHSVC["🔐 Auth Service<br/>Login | Register | JWT<br/>Port: 3001"]
        USERSVC["👥 User Service<br/>Profile | Settings<br/>Port: 3002"]
    end

    subgraph "Travel Services"
        FLIGHTSVC["✈️ Flight Service<br/>Search | Book | Manage<br/>Port: 3010"]
        HOTELSVC["🏨 Hotel Service<br/>Rooms | Availability<br/>Port: 3011"]
        BUSSVC["🚌 Bus Service<br/>Routes | Schedules<br/>Port: 3012"]
        TAXISVC["🚕 Taxi Service<br/>Drivers | Pricing<br/>Port: 3013"]
    end

    subgraph "Business Services"
        BOOKINGSVC["📦 Booking Service<br/>Create | Manage | Cancel<br/>Port: 3020"]
        PAYMENTSVC["💳 Payment Service<br/>Process | Refund<br/>Port: 3021"]
        NOTIFICATIONSVC["📧 Notification Service<br/>Email | SMS | Push<br/>Port: 3022"]
    end

    subgraph "Admin Services"
        REPORTSVC["📊 Reports Service<br/>Analytics | Dashboards<br/>Port: 3030"]
        VENDORSVC["🏢 Vendor Service<br/>Onboarding | Management<br/>Port: 3031"]
    end

    subgraph "Shared Services"
        CONFIGSVC["⚙️ Config Service<br/>Settings | Features<br/>Port: 3040"]
        SEARCHSVC["🔍 Search Service<br/>Elasticsearch<br/>Port: 3041"]
    end

    subgraph "Data Layer"
        MONGODB["MongoDB<br/>Multi-DB Setup"]
        REDIS["Redis<br/>Cache & Session"]
        ELASTICSEARCH["Elasticsearch<br/>Full-text Search"]
    end

    subgraph "Message Bus"
        KAFKA["Apache Kafka<br/>Event Streaming<br/>order.created<br/>booking.confirmed"]
    end

    APIGW --> AUTHSVC
    APIGW --> USERSVC
    APIGW --> FLIGHTSVC
    APIGW --> HOTELSVC
    APIGW --> BUSSVC
    APIGW --> TAXISVC
    APIGW --> BOOKINGSVC
    APIGW --> PAYMENTSVC
    APIGW --> NOTIFICATIONSVC
    APIGW --> REPORTSVC
    APIGW --> VENDORSVC

    AUTHSVC --> MONGODB
    USERSVC --> MONGODB
    FLIGHTSVC --> MONGODB
    HOTELSVC --> MONGODB
    BUSSVC --> MONGODB
    TAXISVC --> MONGODB
    BOOKINGSVC --> MONGODB
    PAYMENTSVC --> MONGODB
    NOTIFICATIONSVC --> MONGODB

    FLIGHTSVC --> REDIS
    HOTELSVC --> REDIS
    BUSSVC --> REDIS
    TAXISVC --> REDIS

    FLIGHTSVC --> ELASTICSEARCH
    HOTELSVC --> ELASTICSEARCH
    SEARCHSVC --> ELASTICSEARCH

    BOOKINGSVC -->|emit| KAFKA
    PAYMENTSVC -->|emit| KAFKA
    NOTIFICATIONSVC -->|consume| KAFKA
    REPORTSVC -->|consume| KAFKA

    CONFIGSVC --> REDIS

    style APIGW fill:#9333EA,color:#fff
    style MONGODB fill:#13AA52,color:#fff
    style REDIS fill:#DC2626,color:#fff
    style ELASTICSEARCH fill:#F6522D,color:#fff
    style KAFKA fill:#231F20,color:#fff
```

### 6.2 Event-Driven Architecture

```mermaid
graph LR
    BOOKINGSVC["Booking Service"]
    PAYMENTSVC["Payment Service"]
    NOTIFICATIONSVC["Notification Service"]
    REPORTSVC["Reports Service"]
    WAREHOUSINGVC["Warehousing Service"]
    RECOMMENDATIONSVC["Recommendations Service"]
    
    KAFKA["Apache Kafka<br/>Message Bus"]
    
    BOOKINGSVC -->|booking.created| KAFKA
    BOOKINGSVC -->|booking.confirmed| KAFKA
    BOOKINGSVC -->|booking.cancelled| KAFKA
    
    PAYMENTSVC -->|payment.initiated| KAFKA
    PAYMENTSVC -->|payment.successful| KAFKA
    PAYMENTSVC -->|payment.failed| KAFKA
    
    KAFKA -->|booking.confirmed| NOTIFICATIONSVC
    KAFKA -->|payment.successful| NOTIFICATIONSVC
    KAFKA -->|booking.cancelled| NOTIFICATIONSVC
    
    KAFKA -->|booking.confirmed| REPORTSVC
    KAFKA -->|payment.successful| REPORTSVC
    
    KAFKA -->|booking.confirmed| WAREHOUSINGVC
    KAFKA -->|payment.successful| WAREHOUSINGVC
    
    KAFKA -->|booking.confirmed| RECOMMENDATIONSVC
    
    NOTIFICATIONSVC -->|Send Email|EMAIL["📧 Email Service"]
    NOTIFICATIONSVC -->|Send SMS|SMS["📲 SMS Service"]
    NOTIFICATIONSVC -->|Send Push|PUSH["🔔 Push Notifications"]
    
    style KAFKA fill:#231F20,color:#fff,stroke:#FFD700,stroke-width:3px
    style NOTIFICATIONSVC fill:#06B6D4,color:#fff
    style REPORTSVC fill:#F59E0B,color:#fff
    style RECOMMENDATIONSVC fill:#10B981,color:#fff
```

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-14 | Architecture Team | Initial visual diagrams |

---

**End of Document**
