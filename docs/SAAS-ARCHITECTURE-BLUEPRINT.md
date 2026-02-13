# Humsafar – SaaS-Level Scalable Architecture Blueprint

## Version: 1.0
## Date: February 13, 2026
## Target: Funded Startup → Enterprise Scale

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Current Architecture (MVP)](#2-current-architecture-mvp)
3. [Growth Phases](#3-growth-phases)
4. [Microservices Architecture](#4-microservices-architecture)
5. [Cloud Infrastructure](#5-cloud-infrastructure)
6. [Data Architecture](#6-data-architecture)
7. [Security & Compliance](#7-security--compliance)
8. [DevOps & CI/CD](#8-devops--cicd)
9. [Monitoring & Observability](#9-monitoring--observability)
10. [Cost Optimization](#10-cost-optimization)
11. [Disaster Recovery](#11-disaster-recovery)
12. [International Expansion](#12-international-expansion)

---

## 1. Executive Summary

### 1.1 Vision
Transform Humsafar from an MVP into a world-class SaaS travel platform capable of handling:
- **10M+ monthly active users**
- **100K+ concurrent bookings**
- **99.99% uptime SLA**
- **Global multi-region deployment**

### 1.2 Scaling Milestones

| Phase | Timeline | Users | Revenue | Infrastructure |
|-------|----------|-------|---------|----------------|
| MVP | Month 1-3 | 1K | $10K/mo | Vercel + MongoDB Atlas |
| Seed | Month 4-12 | 50K | $500K/mo | AWS Multi-AZ |
| Series A | Year 2 | 500K | $5M/mo | Multi-Region + CDN |
| Series B | Year 3 | 5M | $50M/mo | Microservices + K8s |
| Scale | Year 4+ | 10M+ | $100M+/mo | Global Edge Network |

### 1.3 Key Architecture Principles

1. **Modularity**: Independent service deployment
2. **Scalability**: Horizontal scaling at any layer
3. **Reliability**: No single point of failure
4. **Performance**: Sub-second API response times
5. **Security**: Enterprise-grade encryption & compliance
6. **Cost-Efficiency**: Auto-scaling & resource optimization

---

## 2. Current Architecture (MVP)

### 2.1 Current Stack (Month 1-3)

```
┌─────────────────────────────────────────────────────┐
│                   USERS (1K-10K)                    │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│              Cloudflare DNS + CDN                   │
│              (Free Tier - Basic DDoS)               │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│               Vercel Platform ($20/mo)              │
│         ┌───────────────────────────────┐          │
│         │   Next.js Monolith (SSR)      │          │
│         │   - Frontend (React)          │          │
│         │   - API Routes (Serverless)   │          │
│         └───────────────────────────────┘          │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│        MongoDB Atlas (M10 Cluster - $57/mo)         │
│        - Primary DB (Single Region)                 │
│        - Auto Backups                               │
└─────────────────────────────────────────────────────┘

Total Cost: ~$100/month
Capacity: 1K-10K users, 100 req/s
```

**Pros**:
- Fast deployment
- Low cost
- Simple architecture
- Built-in CDN

**Cons**:
- Limited scalability
- No redundancy
- Vendor lock-in (Vercel)
- Single region only

---

## 3. Growth Phases

### 3.1 Phase 1: MVP (Month 1-3) ✅ Current

**Metrics**:
- Users: 1K-10K
- Requests: 100/sec
- Database: 10GB
- Cost: $100/month

**Stack**:
- Vercel (Serverless)
- MongoDB Atlas M10
- Cloudflare Free

**Focus**:
- Product-market fit
- Core features
- User feedback

---

### 3.2 Phase 2: Seed Funding (Month 4-12)

**Metrics**:
- Users: 10K-50K
- Requests: 1K/sec
- Database: 100GB
- Cost: $2K/month

**Migration Plan**:

```
┌─────────────────────────────────────────────────────┐
│              AWS Application Load Balancer          │
│              (Auto-scaling, Multi-AZ)               │
└─────────────────────────────────────────────────────┘
                         ↓
         ┌───────────────┴───────────────┐
         ↓                               ↓
┌─────────────────┐            ┌─────────────────┐
│   EC2 Instance  │            │   EC2 Instance  │
│   (Next.js)     │            │   (Next.js)     │
│   AZ-1          │            │   AZ-2          │
└─────────────────┘            └─────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│        MongoDB Atlas M30 (Replica Set)              │
│        - Primary (AZ-1)                             │
│        - Secondary (AZ-2)                           │
│        - Hidden (Backup)                            │
└─────────────────────────────────────────────────────┘
         ↓                               ↓
┌─────────────────┐            ┌─────────────────┐
│  Redis Cache    │            │  S3 Storage     │
│  (Session/Data) │            │  (Images/Files) │
└─────────────────┘            └─────────────────┘
```

**New Components**:
- **AWS EC2**: Application servers (t3.medium x2)
- **MongoDB Atlas M30**: Replica set for HA
- **Redis ElastiCache**: Session & query caching
- **AWS S3**: File storage (images, PDFs)
- **CloudFront CDN**: Global content delivery
- **RDS MySQL** (future): Analytics database

**Cost Breakdown**:
| Service | Monthly Cost |
|---------|--------------|
| EC2 (2x t3.medium) | $70 |
| ALB | $25 |
| MongoDB Atlas M30 | $380 |
| Redis (t3.micro) | $15 |
| S3 + CloudFront | $50 |
| **Total** | **~$540** |

*(Plus traffic costs: ~$1.5K for 50K users)*

---

### 3.3 Phase 3: Series A (Year 2)

**Metrics**:
- Users: 50K-500K
- Requests: 10K/sec
- Database: 1TB
- Cost: $20K/month

**Architecture Evolution**:

```
┌─────────────────────────────────────────────────────┐
│         Global DNS (Route 53 / CloudFlare)          │
│         - Geo-routing                               │
│         - Health checks                             │
└─────────────────────────────────────────────────────┘
                         ↓
         ┌───────────────┴───────────────┐
         ↓                               ↓
┌─────────────────┐            ┌─────────────────┐
│   US-EAST-1     │            │   EU-CENTRAL-1  │
│   (Primary)     │            │   (Secondary)   │
└─────────────────┘            └─────────────────┘
         ↓                               ↓
┌─────────────────────────────────────────────────────┐
│              API Gateway (Kong/AWS API GW)          │
│              - Rate limiting                        │
│              - Authentication                       │
│              - Request routing                      │
└─────────────────────────────────────────────────────┘
                         ↓
    ┌────────────────────┴────────────────────┐
    ↓                    ↓                     ↓
┌─────────┐      ┌─────────────┐      ┌─────────────┐
│   Web   │      │   Mobile    │      │    Admin    │
│  Tier   │      │   App API   │      │   Portal    │
│ (EC2/ECS)│      │   (Lambda)  │      │   (EC2)     │
└─────────┘      └─────────────┘      └─────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│        MongoDB Atlas M60 (Sharded Cluster)          │
│        - 3 Shards (Primary + 2 Replicas each)       │
│        - Config Servers (3)                         │
│        - Query Router (mongos)                      │
└─────────────────────────────────────────────────────┘
         ↓                               ↓
┌─────────────────┐            ┌─────────────────┐
│ Redis Cluster   │            │  RDS Postgres   │
│ (3 Masters +    │            │  (Analytics)    │
│  3 Replicas)    │            │  Read Replicas  │
└─────────────────┘            └─────────────────┘
```

**New Components**:
- **API Gateway**: Kong / AWS API Gateway
- **Multi-Region**: US-EAST-1 + EU-CENTRAL-1
- **MongoDB Sharding**: Horizontal database scaling
- **Redis Cluster**: High-availability caching
- **RDS Analytics**: Separate analytics database
- **ElasticSearch**: Full-text search engine
- **SQS/SNS**: Message queuing for async tasks

**Cost Breakdown**:
| Service | Monthly Cost |
|---------|--------------|
| EC2/ECS (10 instances) | $1,500 |
| MongoDB Atlas M60 (sharded) | $8,000 |
| Redis Cluster (6 nodes) | $600 |
| RDS Postgres (Multi-AZ) | $500 |
| ElasticSearch (3 nodes) | $800 |
| API Gateway | $200 |
| S3 + CloudFront | $500 |
| Data Transfer | $3,000 |
| SQS/SNS/SES | $200 |
| **Total** | **~$15,300** |

*(Plus $5K for DevOps tools, monitoring, etc.)*

---

### 3.4 Phase 4: Series B (Year 3) - Microservices

**Metrics**:
- Users: 500K-5M
- Requests: 100K/sec
- Database: 10TB
- Cost: $100K/month

**Microservices Architecture**:

```
┌─────────────────────────────────────────────────────┐
│         Multi-Region Load Balancer (Global)         │
│         - US, EU, ASIA, ME regions                  │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│              API Gateway (Kong Enterprise)          │
│              - OAuth 2.0 / JWT                      │
│              - Rate Limiting (10K req/s per service)│
│              - Circuit Breaker                      │
└─────────────────────────────────────────────────────┘
                         ↓
    ┌────────┬─────────┬─────────┬─────────┬─────────┐
    ↓        ↓         ↓         ↓         ↓         ↓
┌────────┐┌─────┐┌────────┐┌────────┐┌────────┐┌────────┐
│ User   ││Flight││ Hotel  ││  Bus   ││ Taxi   ││Booking │
│Service ││Svc   ││Service ││Service ││Service ││Service │
└────────┘└─────┘└────────┘└────────┘└────────┘└────────┘
    ↓        ↓         ↓         ↓         ↓         ↓
┌────────┐┌─────┐┌────────┐┌────────┐┌────────┐┌────────┐
│Payment ││Review││Discount││Notif   ││Search  ││Analytics│
│Service ││Svc   ││Service ││Service ││Service ││Service │
└────────┘└─────┘└────────┘└────────┘└────────┘└────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│              Service Mesh (Istio / Linkerd)         │
│              - Service discovery                    │
│              - Load balancing                       │
│              - Encryption (mTLS)                    │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│         Kubernetes Cluster (EKS / GKE / AKS)        │
│         - Auto-scaling (HPA + VPA)                  │
│         - Self-healing                              │
│         - Rolling updates                           │
└─────────────────────────────────────────────────────┘
                         ↓
    ┌─────────────────┬─────────────┬─────────────┐
    ↓                 ↓             ↓             ↓
┌─────────┐    ┌─────────┐  ┌─────────┐  ┌─────────┐
│ MongoDB │    │ Postgres│  │  Redis  │  │ElasticSearch│
│ (Sharded)│    │(Analytics)│  │ Cluster │  │  Cluster│
└─────────┘    └─────────┘  └─────────┘  └─────────┘
```

**Microservices Breakdown**:

| Service | Responsibility | Tech Stack | Scaling |
|---------|---------------|------------|---------|
| **User Service** | Auth, profiles, sessions | Node.js + MongoDB | 10 pods |
| **Flight Service** | Flight search, inventory | Go + MongoDB | 20 pods |
| **Hotel Service** | Hotel search, rooms | Node.js + MongoDB | 15 pods |
| **Bus Service** | Bus routes, scheduling | Node.js + MongoDB | 10 pods |
| **Taxi Service** | Taxi listings, drivers | Node.js + MongoDB | 10 pods |
| **Booking Service** | Booking orchestration | Node.js + MongoDB | 25 pods |
| **Payment Service** | Payment processing | Java + PostgreSQL | 15 pods |
| **Review Service** | Ratings, comments | Python + MongoDB | 8 pods |
| **Discount Service** | Promo codes, campaigns | Node.js + Redis | 5 pods |
| **Notification Service** | Email, SMS, push | Python + SQS | 10 pods |
| **Search Service** | Full-text search | Go + ElasticSearch | 15 pods |
| **Analytics Service** | Reports, dashboards | Python + PostgreSQL | 5 pods |

**Inter-Service Communication**:
- **Synchronous**: gRPC / REST
- **Asynchronous**: RabbitMQ / Kafka
- **Service Mesh**: Istio for mTLS & observability

**Cost Breakdown**:
| Service | Monthly Cost |
|---------|--------------|
| Kubernetes (EKS 100 nodes) | $30,000 |
| MongoDB Atlas (M200 cluster) | $35,000 |
| PostgreSQL (Multi-region) | $5,000 |
| Redis Enterprise | $8,000 |
| ElasticSearch (10 nodes) | $5,000 |
| Kafka Cluster (Confluent) | $3,000 |
| API Gateway (Kong Enterprise) | $2,000 |
| CDN + Storage (S3, CloudFront) | $4,000 |
| Data Transfer (Multi-region) | $10,000 |
| Monitoring (Datadog/New Relic) | $2,000 |
| **Total** | **~$104,000** |

---

## 4. Microservices Architecture

### 4.1 Service Design Principles

**1. Single Responsibility**
Each service owns ONE business capability:
- User Service: Authentication & user management
- Flight Service: Flight inventory & availability

**2. Database per Service**
Each service has its own database:
```
User Service → users_db (MongoDB)
Flight Service → flights_db (MongoDB)
Payment Service → payments_db (PostgreSQL)
```

**3. API-First Design**
All services expose RESTful/gRPC APIs:
```
GET /api/v1/flights?from=Kabul&to=Dubai
POST /api/v1/bookings
PUT /api/v1/users/:id
```

**4. Event-Driven Architecture**
Services communicate via events:
```
BookingCreated → PaymentService (process payment)
PaymentCompleted → NotificationService (send email)
BookingConfirmed → AnalyticsService (track conversion)
```

### 4.2 Service Communication Patterns

**Synchronous (Request/Response)**:
```
Client → API Gateway → Flight Service → Response
```
Use Cases: Search, read operations

**Asynchronous (Event-Driven)**:
```
Booking Service → [BookingCreated Event] → Queue
                                            ↓
                        ┌───────────────────┴────────────────┐
                        ↓                                    ↓
              Payment Service                     Notification Service
              (process payment)                   (send confirmation email)
```
Use Cases: Notifications, analytics, background tasks

**Saga Pattern (Distributed Transactions)**:
```
1. Booking Service: Create booking (pending)
2. Payment Service: Process payment
   → Success: Update booking (confirmed)
   → Failure: Compensate (cancel booking, refund seats)
3. Notification Service: Send confirmation
```

### 4.3 API Gateway Pattern

**Kong API Gateway Configuration**:
```yaml
services:
  - name: flight-service
    url: http://flight-service:3000
    routes:
      - paths: ["/api/v1/flights"]
        methods: ["GET", "POST"]
    plugins:
      - name: rate-limiting
        config:
          minute: 1000
          hour: 10000
      - name: jwt
        config:
          key_claim_name: userId
```

**Benefits**:
- Centralized authentication
- Rate limiting per service
- Request/response transformation
- Caching layer
- Analytics & logging

---

## 5. Cloud Infrastructure

### 5.1 Multi-Cloud Strategy

**Primary**: AWS (80%)
**Secondary**: Google Cloud Platform (15%)
**Backup**: Azure (5%)

**AWS Services Used**:
```
Compute:
├─ EKS (Kubernetes)
├─ EC2 (Legacy apps)
├─ Lambda (Serverless functions)
└─ Fargate (Serverless containers)

Storage:
├─ S3 (Object storage)
├─ EBS (Block storage)
└─ EFS (File storage)

Database:
├─ MongoDB Atlas (managed)
├─ RDS PostgreSQL (analytics)
├─ DynamoDB (session store)
└─ ElastiCache Redis (caching)

Networking:
├─ VPC (Isolated network)
├─ Route 53 (DNS)
├─ CloudFront (CDN)
├─ ALB/NLB (Load balancers)
└─ API Gateway

Security:
├─ IAM (Access management)
├─ KMS (Encryption keys)
├─ WAF (Web firewall)
└─ Secrets Manager

Monitoring:
├─ CloudWatch (Logs & metrics)
├─ X-Ray (Tracing)
└─ GuardDuty (Threat detection)

DevOps:
├─ CodePipeline (CI/CD)
├─ CodeBuild (Build service)
├─ ECR (Container registry)
└─ Systems Manager (Config management)
```

### 5.2 Multi-Region Deployment

**Regions**:
1. **Primary**: US-EAST-1 (Virginia) - 60% traffic
2. **Secondary**: EU-CENTRAL-1 (Frankfurt) - 25% traffic
3. **Tertiary**: AP-SOUTH-1 (Mumbai) - 10% traffic
4. **Backup**: ME-SOUTH-1 (Bahrain) - 5% traffic

**Traffic Routing**:
```
Route 53 Geo-Routing Policy
├─ Afghanistan → ME-SOUTH-1 (Bahrain)
├─ Pakistan/India → AP-SOUTH-1 (Mumbai)
├─ Europe → EU-CENTRAL-1 (Frankfurt)
├─ Americas → US-EAST-1 (Virginia)
└─ Failover → Next closest region
```

**Data Replication**:
```
MongoDB Global Cluster
├─ Primary Shard (US-EAST-1)
├─ Secondary Shard (EU-CENTRAL-1)
├─ Analytics Nodes (read-only) in all regions
└─ Replication lag < 100ms
```

### 5.3 Auto-Scaling Configuration

**Kubernetes HPA (Horizontal Pod Autoscaler)**:
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: flight-service-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: flight-service
  minReplicas: 5
  maxReplicas: 100
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  - type: Pods
    pods:
      metric:
        name: http_requests_per_second
      target:
        type: AverageValue
        averageValue: "1000"
```

**Behavior**:
- Scale up: When CPU > 70% for 2 minutes
- Scale down: When CPU < 40% for 5 minutes
- Max scale rate: +50% every 1 minute
- Min stable period: 5 minutes before scale down

---

## 6. Data Architecture

### 6.1 Polyglot Persistence

**Database Selection Matrix**:

| Data Type | Database | Reason |
|-----------|----------|--------|
| User profiles, bookings | MongoDB | Flexible schema, scalability |
| Transactions, payments | PostgreSQL | ACID compliance |
| Real-time inventory | Redis | In-memory speed |
| Search index | ElasticSearch | Full-text search |
| Analytics, reports | PostgreSQL (Redshift) | Complex queries, aggregations |
| Session data | Redis / DynamoDB | Fast key-value access |
| Logs | ElasticSearch (ELK) | Log aggregation & analysis |
| Time-series metrics | InfluxDB / TimescaleDB | Time-series optimization |

### 6.2 Caching Strategy

**Multi-Layer Caching**:

```
User Request
    ↓
┌─────────────────┐
│  CDN Cache      │ → 90% hit rate (static assets)
│  (CloudFront)   │    TTL: 7 days
└─────────────────┘
    ↓ (Cache Miss)
┌─────────────────┐
│  API Gateway    │ → 70% hit rate (API responses)
│  Cache (Redis)  │    TTL: 5 minutes
└─────────────────┘
    ↓ (Cache Miss)
┌─────────────────┐
│  Application    │ → 50% hit rate (query results)
│  Cache (Redis)  │    TTL: 1 hour
└─────────────────┘
    ↓ (Cache Miss)
┌─────────────────┐
│  Database       │ → Query execution
│  (MongoDB)      │
└─────────────────┘
```

**Cache Keys Strategy**:
```javascript
// Search results
Key: `search:flights:${origin}:${destination}:${date}`
TTL: 300s (5 minutes)

// City/Airport data
Key: `cities:all`
TTL: 86400s (24 hours)

// User session
Key: `session:${userId}`
TTL: 7200s (2 hours)

// Popular routes
Key: `popular:routes:${serviceType}`
TTL: 3600s (1 hour)
```

### 6.3 Data Partitioning & Sharding

**MongoDB Sharding Strategy**:

```
Shard Key: { serviceType: 1, createdAt: 1 }

Shard 1 (US-EAST-1):
├─ Flights (2020-2024)
├─ Hotels (2020-2024)
└─ Primary for US users

Shard 2 (EU-CENTRAL-1):
├─ Buses (all)
├─ Taxis (all)
└─ Primary for EU users

Shard 3 (AP-SOUTH-1):
├─ Flights (2024+)
├─ Hotels (2024+)
└─ Primary for ASIA users
```

**Benefits**:
- Distribute write load across shards
- Geographic data locality
- Independent scaling per shard

---

## 7. Security & Compliance

### 7.1 Security Layers

```
┌─────────────────────────────────────────────────────┐
│  Layer 7: Application Security                      │
│  - Input validation                                 │
│  - Output encoding                                  │
│  - OWASP Top 10 protection                          │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│  Layer 6: API Security                              │
│  - OAuth 2.0 / JWT authentication                   │
│  - Rate limiting (10K req/min per user)             │
│  - API key rotation                                 │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│  Layer 5: Service Mesh Security                     │
│  - mTLS (service-to-service encryption)             │
│  - RBAC (role-based access control)                 │
│  - Network policies                                 │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│  Layer 4: Infrastructure Security                   │
│  - VPC isolation                                    │
│  - Security groups (firewall rules)                 │
│  - WAF (web application firewall)                   │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│  Layer 3: Data Security                             │
│  - Encryption at rest (AES-256)                     │
│  - Encryption in transit (TLS 1.3)                  │
│  - Database encryption (MongoDB native)             │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│  Layer 2: Identity & Access Management              │
│  - AWS IAM roles (least privilege)                  │
│  - MFA for admin access                             │
│  - Audit logs (CloudTrail)                          │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│  Layer 1: Physical Security                         │
│  - AWS data center security                         │
│  - SOC 2 compliance                                 │
└─────────────────────────────────────────────────────┘
```

### 7.2 Compliance Requirements

**PCI-DSS** (Payment Card Industry):
- Never store CVV/CVC
- Tokenize card data (use Stripe/PayPal tokens)
- Encrypt cardholder data (AES-256)
- Quarterly vulnerability scans

**GDPR** (EU users):
- Right to be forgotten (user data deletion)
- Data portability (export user data)
- Consent management
- Data breach notification (72 hours)

**SOC 2 Type II**:
- Security controls audit
- Availability guarantees (99.9% uptime)
- Confidentiality measures
- Annual audit report

### 7.3 Secrets Management

**AWS Secrets Manager**:
```javascript
// Database credentials
Secret: /prod/database/mongodb
Value: {
  "username": "admin",
  "password": "<auto-rotated-every-30-days>",
  "host": "cluster0.mongodb.net"
}

// API keys
Secret: /prod/api/payment-gateway
Value: {
  "public_key": "pk_live_xxx",
  "secret_key": "sk_live_xxx"  // Encrypted
}

// JWT secrets
Secret: /prod/auth/jwt-secret
Value: "<256-bit-random-key>"  // Rotated quarterly
```

**Rotation Policy**:
- Database credentials: Every 30 days
- API keys: Every 90 days
- JWT secrets: Every 90 days
- Certificates: Every 365 days

---

## 8. DevOps & CI/CD

### 8.1 CI/CD Pipeline

```yaml
# .github/workflows/deploy-production.yml

name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  # Stage 1: Build
  build:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup Node.js 18
      - Install dependencies
      - Run linter (ESLint)
      - Run unit tests (Jest)
      - Build application
      - Build Docker image
      - Push to ECR

  # Stage 2: Security Scan
  security:
    needs: build
    steps:
      - Container scan (Trivy)
      - Dependency check (Snyk)
      - SAST scan (SonarQube)
      - Secrets scan (TruffleHog)

  # Stage 3: Deploy to Staging
  deploy-staging:
    needs: security
    steps:
      - Deploy to EKS staging
      - Run integration tests
      - Run E2E tests (Cypress)
      - Performance tests (k6)

  # Stage 4: Deploy to Production
  deploy-production:
    needs: deploy-staging
    steps:
      - Wait for manual approval → Manual approval required
      - Blue/Green deployment     → Zero-downtime
      - Health checks             → Ensure service health
      - Rollback if failed        → Auto-rollback on error

  # Stage 5: Post-Deployment
  post-deploy:
    needs: deploy-production
    steps:
      - Run smoke tests
      - Update documentation
      - Notify Slack channel
      - Create deployment tag (v1.2.3)
```

**Deployment Strategies**:

1. **Blue/Green Deployment**:
```
Production (Blue) → 100% traffic
    ↓
Deploy new version (Green) → 0% traffic
    ↓
Health checks pass → 50% traffic to Green
    ↓
Monitor for 10 minutes → 100% traffic to Green
    ↓
Terminate Blue environment
```

2. **Canary Deployment**:
```
100% → Old version
↓
10% → New version, 90% → Old version (10 min)
↓
25% → New version, 75% → Old version (10 min)
↓
50% → New version, 50% → Old version (10 min)
↓
100% → New version
```

### 8.2 Infrastructure as Code

**Terraform Configuration**:
```hcl
# infrastructure/main.tf

module "eks_cluster" {
  source = "./modules/eks"
  
  cluster_name    = "humsafar-prod"
  cluster_version = "1.28"
  
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.private_subnets
  
  node_groups = {
    general = {
      instance_types = ["t3.large"]
      min_size       = 10
      max_size       = 100
      desired_size   = 20
    }
    memory_optimized = {
      instance_types = ["r5.xlarge"]
      min_size       = 5
      max_size       = 50
      desired_size   = 10
    }
  }
}

module "mongodb_atlas" {
  source = "./modules/mongodb"
  
  cluster_name    = "humsafar-prod"
  cluster_tier    = "M60"
  cloud_provider  = "AWS"
  region          = "us-east-1"
  
  replication_specs = {
    us_east = { priority = 7, nodes = 3 }
    eu_central = { priority = 6, nodes = 3 }
    ap_south = { priority = 5, nodes = 2 }
  }
}
```

**Helm Charts (Kubernetes)**:
```yaml
# charts/flight-service/values.yaml

replicaCount: 10

image:
  repository: 123456789.dkr.ecr.us-east-1.amazonaws.com/flight-service
  tag: v1.2.3

resources:
  requests:
    cpu: 500m
    memory: 512Mi
  limits:
    cpu: 1000m
    memory: 1Gi

autoscaling:
  enabled: true
  minReplicas: 5
  maxReplicas: 100
  targetCPUUtilizationPercentage: 70

service:
  type: ClusterIP
  port: 3000

ingress:
  enabled: true
  hosts:
    - host: api.humsafar.af
      paths:
        - path: /api/v1/flights
          pathType: Prefix
```

---

## 9. Monitoring & Observability

### 9.1 Monitoring Stack

```
┌─────────────────────────────────────────────────────┐
│               Application Layer                     │
│    - Flight Service                                 │
│    - Booking Service                                │
│    - Payment Service                                │
└─────────────┬───────────────────────────────────────┘
              │ (Logs, Metrics, Traces)
              ↓
┌─────────────────────────────────────────────────────┐
│            Telemetry Collection                     │
│    - OpenTelemetry Collector                        │
│    - Prometheus (Metrics)                           │
│    - Fluentd (Logs)                                 │
│    - Jaeger (Traces)                                │
└─────────────┬───────────────────────────────────────┘
              │
              ↓
┌─────────────────────────────────────────────────────┐
│            Storage & Analysis                       │
│    - ElasticSearch (Logs)                           │
│    - Prometheus (Metrics)                           │
│    - Jaeger (Traces)                                │
│    - S3 (Long-term storage)                         │
└─────────────┬───────────────────────────────────────┘
              │
              ↓
┌─────────────────────────────────────────────────────┐
│            Visualization & Alerting                 │
│    - Grafana (Dashboards)                           │
│    - Kibana (Log analysis)                          │
│    - PagerDuty (Incident management)                │
│    - Slack (Notifications)                          │
└─────────────────────────────────────────────────────┘
```

### 9.2 Key Metrics

**Golden Signals** (SRE):

1. **Latency**:
   - P50: < 100ms
   - P95: < 500ms
   - P99: < 1000ms

2. **Traffic**:
   - Requests per second: 100K
   - Peak traffic: 500K req/s

3. **Errors**:
   - Error rate: < 0.1%
   - 5xx errors: < 0.01%

4. **Saturation**:
   - CPU: < 70%
   - Memory: < 80%
   - Disk: < 75%

**Business Metrics**:
```
Bookings per minute
Revenue per hour
Conversion rate (search → booking)
Abandon cart rate
Average booking value
User retention rate (30-day)
```

### 9.3 Alerting Rules

**Critical Alerts** (PagerDuty - 24/7 on-call):
```yaml
# Alert: High Error Rate
- alert: HighErrorRate
  expr: sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) > 0.05
  for: 2m
  severity: critical
  message: "Error rate is {{ $value | humanizePercentage }} (threshold: 5%)"

# Alert: Service Down
- alert: ServiceDown
  expr: up{job="flight-service"} == 0
  for: 1m
  severity: critical
  message: "Flight service is down in {{ $labels.region }}"

# Alert: High Latency
- alert: HighLatency
  expr: histogram_quantile(0.95, http_request_duration_seconds) > 1
  for: 5m
  severity: critical
  message: "P95 latency is {{ $value }}s (threshold: 1s)"
```

**Warning Alerts** (Slack notification):
```yaml
# Alert: High CPU
- alert: HighCPU
  expr: container_cpu_usage > 80
  for: 10m
  severity: warning
  message: "CPU usage is {{ $value }}% on {{ $labels.pod }}"

# Alert: Database Connection Pool
- alert: DatabasePoolExhaustion
  expr: mongodb_connections_current / mongodb_connections_available > 0.9
  for: 5m
  severity: warning
  message: "MongoDB connection pool at {{ $value | humanizePercentage }}"
```

---

## 10. Cost Optimization

### 10.1 Cost Breakdown (Series B Scale)

| Category | Monthly Cost | % of Total |
|----------|--------------|------------|
| Compute (EKS) | $30,000 | 29% |
| Database (MongoDB) | $35,000 | 34% |
| Caching (Redis) | $8,000 | 8% |
| Storage (S3) | $2,000 | 2% |
| CDN (CloudFront) | $2,000 | 2% |
| Data Transfer | $10,000 | 10% |
| Search (ElasticSearch) | $5,000 | 5% |
| Monitoring | $2,000 | 2% |
| Messaging (Kafka) | $3,000 | 3% |
| Other Services | $5,000 | 5% |
| **Total** | **$102,000** | **100%** |

### 10.2 Optimization Strategies

**1. Right-Sizing**:
```
Before: 50x t3.xlarge (4 vCPU, 16GB RAM) = $3,000/mo
After: 30x t3.large (2 vCPU, 8GB RAM) + 20x t3.medium = $1,800/mo
Savings: $1,200/month (40%)
```

**2. Spot Instances**:
```
Before: 100% On-Demand instances = $30,000/mo
After: 70% Spot + 30% On-Demand = $12,000/mo
Savings: $18,000/month (60%)

Note: Use Spot for stateless services only
```

**3. Auto-Scaling Schedule**:
```javascript
// Scale down during low-traffic hours (12 AM - 6 AM)
minReplicas: {
  weekday_day: 20,
  weekday_night: 5,
  weekend_day: 15,
  weekend_night: 3
}

Savings: ~$5,000/month (compute)
```

**4. Database Optimization**:
```
MongoDB Atlas:
├─ Enable compression (50% storage savings)
├─ Archive old bookings (>2 years) to S3
├─ Use read replicas for analytics queries
└─ Optimize indexes (remove unused)

Savings: ~$5,000/month (15% reduction)
```

**5. CDN & Caching**:
```
Before: 90% requests hit backend = $10,000 data transfer
After: 70% cached at CDN = $3,000 data transfer
Savings: $7,000/month (70%)
```

**6. Reserved Instances**:
```
1-Year Reserved Instances (compute):
├─ Discount: 40% off On-Demand
├─ Coverage: 50% of baseline capacity
└─ Savings: ~$10,000/month

3-Year Reserved Instances (database):
├─ Discount: 55% off On-Demand
├─ Coverage: 100% of baseline
└─ Savings: ~$15,000/month
```

**Total Potential Savings**: **$61,200/month (60% reduction)**

---

## 11. Disaster Recovery

### 11.1 RTO & RPO Targets

| Service Tier | RTO (Recovery Time) | RPO (Data Loss) | Cost |
|--------------|---------------------|-----------------|------|
| **Critical** (Booking, Payment) | 5 minutes | 0 (no data loss) | High |
| **High** (Search, User) | 30 minutes | < 5 minutes | Medium |
| **Medium** (Reviews, Notifications) | 4 hours | < 1 hour | Low |
| **Low** (Analytics, Reports) | 24 hours | < 24 hours | Minimal |

### 11.2 Backup Strategy

**Database Backups**:
```
MongoDB Atlas:
├─ Continuous backups (Point-in-time recovery)
├─ Snapshots every 6 hours
├─ Retention: 30 days
└─ Cross-region replication (US → EU → ASIA)

RDS PostgreSQL:
├─ Automated daily snapshots
├─ Retention: 35 days
├─ Multi-AZ synchronous replication
└─ Manual snapshot before major changes
```

**Application Backups**:
```
Docker Images:
├─ Stored in ECR
├─ Tagged by version (v1.2.3)
├─ Retention: Last 100 images

Kubernetes Config:
├─ Stored in Git (GitOps)
├─ Versioned with Helm charts
└─ Automated backup to S3 daily
```

### 11.3 Failover Procedures

**Scenario 1: Single Service Failure**
```
1. Health check fails (Flight Service)
2. Kubernetes auto-restarts pod (30 seconds)
3. If restart fails 3 times:
   → Alert PagerDuty
   → Scale up healthy pods
   → Investigate root cause

RTO: 2 minutes (auto-healing)
RPO: 0 (stateless service)
```

**Scenario 2: Database Failure**
```
1. MongoDB primary node fails
2. Replica set election (automatic - 10 seconds)
3. New primary elected
4. Application reconnects automatically

RTO: 30 seconds (automatic failover)
RPO: 0 (replica synchronization)
```

**Scenario 3: Region Failure**
```
1. AWS us-east-1 region outage detected
2. Route 53 health check fails
3. Traffic automatically routed to eu-central-1
4. Database switches to EU replica
5. Alert engineering team

RTO: 5 minutes (DNS propagation)
RPO: < 1 minute (replication lag)
```

**Scenario 4: Complete Disaster**
```
1. Catastrophic failure (entire cloud provider)
2. Activate disaster recovery plan:
   → Restore latest database snapshot (other cloud)
   → Deploy application from backup images
   → Update DNS to new infrastructure
   → Verify data integrity
   → Resume operations

RTO: 4 hours (manual intervention)
RPO: Last snapshot (6 hours max)
```

---

## 12. International Expansion

### 12.1 Expansion Phases

**Phase 1: Afghanistan** (Current)
- 1 region (ME-SOUTH-1)
- Local payment gateways
- 2 languages (Dari, Pashto)

**Phase 2: Central Asia** (Year 2)
- 3 regions (ME-SOUTH-1, EU-CENTRAL-1, AP-SOUTH-1)
- Countries: Pakistan, Tajikistan, Uzbekistan
- Additional languages: Urdu, Russian
- Local compliance (tax, regulations)

**Phase 3: Middle East** (Year 3)
- 5 regions
- Countries: UAE, Saudi Arabia, Qatar, Turkey
- Additional languages: Arabic, Turkish
- Islamic finance compliance

**Phase 4: Global** (Year 4+)
- 10+ regions worldwide
- 20+ languages
- Multi-currency support (50+ currencies)
- Local partnerships (international airlines, hotels)

### 12.2 Localization Strategy

**Multi-Language Architecture**:
```javascript
// i18n structure
/locales
  /fa-AF (Dari)
    ├─ common.json
    ├─ flights.json
    ├─ hotels.json
    └─ errors.json
  /ps-AF (Pashto)
  /en-US (English)
  /ur-PK (Urdu)
  /ar-SA (Arabic)

// Usage
t('flights.search.title') → "جستجوی پرواز" (Dari)
t('flights.search.title') → "د الوتنې لټون" (Pashto)
```

**Currency Conversion**:
```javascript
// Real-time exchange rates
const price = {
  AFN: 1500,
  USD: 17.50,  // API: ECB Exchange Rates
  EUR: 16.20,
  PKR: 4850,
  AED: 64.30
};

// Display based on user locale
displayPrice(1500, 'AFN', userLocale);
→ "1,500 افغانی" (Dari user)
→ "$17.50" (English user)
```

### 12.3 Compliance Matrix

| Country | Data Residency | Tax | Payment | Travel License |
|---------|----------------|-----|---------|----------------|
| Afghanistan | Local DB required | 10% VAT | Afghan United Bank | Required |
| Pakistan | Local DB preferred | 17% GST | JazzCash, EasyPaisa | Required |
| UAE | DIFC compliant | 5% VAT | Network, Telr | IATA license |
| Saudi Arabia | Local DB required | 15% VAT | HyperPay, PayTabs | MoTIC license |
| India | Strict data laws | 18% GST | Razorpay, Paytm | IATA + TAAI |

---

## 13. Future Roadmap

### Year 1 (MVP → Product-Market Fit)
- ✅ Launch core platform
- ✅ 4 service types (flight, hotel, bus, taxi)
- ✅ Payment integration
- 🔄 1K → 10K users
- 🔄 $10K → $100K MRR

### Year 2 (Scale & Expansion)
- 🎯 Microservices migration
- 🎯 Multi-region deployment (3 regions)
- 🎯 Mobile apps (iOS, Android)
- 🎯 International expansion (Pakistan, Tajikistan)
- 🎯 10K → 500K users
- 🎯 $100K → $5M MRR

### Year 3 (Market Leadership)
- 🎯 AI-powered recommendations
- 🎯 Dynamic pricing engine
- 🎯 B2B platform (corporate travel)
- 🎯 White-label solution
- 🎯 500K → 5M users
- 🎯 $5M → $50M MRR

### Year 4+ (Global Dominance)
- 🎯 Global coverage (50+ countries)
- 🎯 Blockchain-based loyalty program
- 🎯 Metaverse travel experiences
- 🎯 Acquisition strategy (consolidate market)
- 🎯 5M → 50M users
- 🎯 $50M → $500M MRR

---

## 14. Success Metrics & KPIs

### Product Metrics
| Metric | Current | Target (Year 2) | Target (Year 4) |
|--------|---------|-----------------|-----------------|
| Monthly Active Users | 1K | 500K | 5M |
| Daily Bookings | 10 | 5,000 | 50,000 |
| Gross Booking Value | $50K/mo | $10M/mo | $100M/mo |
| Conversion Rate | 2% | 5% | 8% |
| Average Order Value | $100 | $150 | $200 |
| User Retention (30d) | 20% | 40% | 60% |

### Technical Metrics
| Metric | Current | Target (Year 2) | Target (Year 4) |
|--------|---------|-----------------|-----------------|
| Uptime SLA | 99.5% | 99.9% | 99.99% |
| API Response Time (P95) | 500ms | 200ms | 100ms |
| Page Load Time | 3s | 1.5s | < 1s |
| Error Rate | < 1% | < 0.1% | < 0.01% |
| Infrastructure Cost per Booking | $2 | $0.50 | $0.10 |

### Business Metrics
| Metric | Current | Target (Year 2) | Target (Year 4) |
|--------|---------|-----------------|-----------------|
| Monthly Revenue | $10K | $5M | $50M |
| Customer Acquisition Cost | $50 | $20 | $10 |
| Lifetime Value | $500 | $1,500 | $3,000 |
| LTV:CAC Ratio | 10:1 | 75:1 | 300:1 |
| Burn Rate | $50K/mo | $1M/mo | $5M/mo |
| Runway | 12 months | 24 months | 36 months |

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-13 | Architecture Team | Initial SaaS blueprint |

---

**End of Document**

---

## Appendix

### A. Technology Radar (Next 12 Months)

**Adopt**:
- Kubernetes (EKS)
- MongoDB sharding
- Redis clustering
- gRPC for inter-service communication

**Trial**:
- Istio service mesh
- Kafka for event streaming
- GraphQL gateway
- Temporal workflow engine

**Assess**:
- WebAssembly for edge computing
- Dapr for distributed apps
- Pulumi for IaC (alternative to Terraform)

**Hold**:
- Serverless frameworks (current Vercel setup)
- EC2-based deployments (migrate to EKS)

### B. Recommended Team Structure (Year 2)

**Engineering** (30 people):
- Backend: 12 engineers (2 per microservice)
- Frontend: 6 engineers (web + mobile)
- DevOps/SRE: 4 engineers
- QA: 4 engineers
- Data: 2 engineers (analytics)
- Security: 2 engineers

**Product & Design** (8 people):
- Product Managers: 4
- UX/UI Designers: 4

**Operations** (5 people):
- Customer Support: 3
- Operations Manager: 1
- Content/Translations: 1

**Total Headcount**: 43 people
**Payroll (Afghanistan rates)**: ~$500K/year

---

**Ready for Investor Pitch! 🚀**
