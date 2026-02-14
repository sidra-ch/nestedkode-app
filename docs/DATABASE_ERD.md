# Humsafar Travel Platform - Database ERD

## Entity Relationship Diagram Overview

This ERD represents the complete database structure for the Humsafar multi-service travel booking platform, supporting flights, hotels, buses, and taxi services with full booking, payment, and administrative capabilities.

---

## 1. Core Entities

### 1.1 Users & Authentication
```mermaid
erDiagram
    USERS ||--o{ USER_PROFILES }
    USERS ||--o{ USER_PREFERENCES }
    USERS ||--o{ USER_SESSIONS }
    USERS ||--o{ BOOKINGS }
    
    USERS {
        uuid PK
        email UK
        phone UK
        password_hash
        first_name
        last_name
        father_name
        passport_number
        id_number
        date_of_birth
        gender
        email_verified
        phone_verified
        role
        status
        created_at
        updated_at
    }
```

### 1.2 Bookings Master
```mermaid
erDiagram
    BOOKINGS ||--o{ FLIGHT_BOOKINGS }
    BOOKINGS ||--o{ HOTEL_BOOKINGS }
    BOOKINGS ||--o{ BUS_BOOKINGS }
    BOOKINGS ||--o{ TAXI_BOOKINGS }
    BOOKINGS ||--o{ PAYMENTS }
    BOOKINGS ||--o{ REFUNDS }
    BOOKINGS ||--o{ NOTIFICATIONS }
    
    BOOKINGS {
        uuid PK
        user_id FK
        service_type
        service_id FK
        booking_reference UK
        status
        total_amount
        paid_amount
        currency
        passenger_count
        booking_data JSONB
        payment_data JSONB
        created_at
        updated_at
    }
```

### 1.3 Flights System
```mermaid
erDiagram
    AIRPORTS ||--o{ FLIGHTS }
    AIRLINES ||--o{ FLIGHTS }
    FLIGHTS ||--o{ FLIGHT_BOOKINGS }
    
    AIRPORTS {
        uuid PK
        iata_code UK
        icao_code UK
        name
        city
        country
        latitude
        longitude
        timezone
        is_domestic
        is_active
    }
    
    AIRLINES {
        uuid PK
        name
        code
        logo_url
        is_active
        created_at
    }
    
    FLIGHTS {
        uuid PK
        flight_number
        airline_id FK
        departure_airport_id FK
        arrival_airport_id FK
        departure_time
        arrival_time
        aircraft_type
        flight_class
        available_seats
        total_seats
        base_price
        currency
        status
        created_at
    }
    
    FLIGHT_BOOKINGS {
        uuid PK
        booking_id FK
        flight_id FK
        passenger_details JSONB
        seat_selection JSONB
        meal_preference
        baggage_info
        created_at
    }
```

### 1.4 Hotels System
```mermaid
erDiagram
    HOTELS ||--o{ HOTEL_ROOMS }
    HOTELS ||--o{ HOTEL_BOOKINGS }
    HOTEL_ROOMS ||--o{ HOTEL_BOOKINGS }
    
    HOTELS {
        uuid PK
        name
        description
        address
        city
        country
        latitude
        longitude
        rating
        star_rating
        amenities JSONB
        contact_info JSONB
        check_in_time
        check_out_time
        cancellation_policy JSONB
        status
        created_at
    }
    
    HOTEL_ROOMS {
        uuid PK
        hotel_id FK
        room_type
        room_number
        max_occupancy
        base_price
        currency
        amenities JSONB
        availability_status
        created_at
    }
    
    HOTEL_BOOKINGS {
        uuid PK
        booking_id FK
        hotel_id FK
        room_id FK
        check_in_date
        check_out_date
        nights
        guest_details JSONB
        total_amount
        room_rates JSONB
        created_at
    }
```

### 1.5 Bus System
```mermaid
erDiagram
    BUS_COMPANIES ||--o{ BUS_ROUTES }
    BUS_ROUTES ||--o{ BUS_SCHEDULES }
    BUS_SCHEDULES ||--o{ BUS_BOOKINGS }
    
    BUS_COMPANIES {
        uuid PK
        name
        english_name
        contact_info JSONB
        rating
        license_number
        logo_url
        status
        created_at
    }
    
    BUS_ROUTES {
        uuid PK
        company_id FK
        origin_city
        destination_city
        distance_km
        estimated_duration_minutes
        base_price
        currency
        is_active
        created_at
    }
    
    BUS_SCHEDULES {
        uuid PK
        route_id FK
        departure_time
        arrival_time
        days_of_week JSONB
        vehicle_type
        total_seats
        available_seats
        created_at
    }
    
    BUS_BOOKINGS {
        uuid PK
        booking_id FK
        schedule_id FK
        passenger_details JSONB
        seat_selection JSONB
        departure_point
        special_requirements
        created_at
    }
```

### 1.6 Taxi System
```mermaid
erDiagram
    TAXI_PROVIDERS ||--o{ TAXI_DRIVERS }
    TAXI_PROVIDERS ||--o{ TAXI_BOOKINGS }
    TAXI_DRIVERS ||--o{ TAXI_BOOKINGS }
    
    TAXI_PROVIDERS {
        uuid PK
        company_name
        contact_person
        phone
        email
        license_number
        service_areas JSONB
        vehicle_types JSONB
        base_rate_per_km
        minimum_fare
        rating
        is_verified
        status
        created_at
    }
    
    TAXI_DRIVERS {
        uuid PK
        provider_id FK
        name
        phone
        vehicle_type
        vehicle_plate
        current_location JSONB
        is_available
        rating
        created_at
    }
    
    TAXI_BOOKINGS {
        uuid PK
        booking_id FK
        provider_id FK
        driver_id FK
        pickup_location JSONB
        dropoff_location JSONB
        distance_km
        estimated_time_minutes
        fare_amount
        passenger_details JSONB
        booking_status
        created_at
    }
```

### 1.7 Payment System
```mermaid
erDiagram
    PAYMENTS ||--o{ BOOKINGS }
    PAYMENT_GATEWAYS ||--o{ PAYMENTS }
    
    PAYMENTS {
        uuid PK
        booking_id FK
        gateway_id FK
        transaction_id UK
        amount
        currency
        status
        gateway_response JSONB
        created_at
    }
    
    PAYMENT_GATEWAYS {
        uuid PK
        name
        type
        config JSONB
        is_active
        created_at
    }
```

### 1.8 Support Systems
```mermaid
erDiagram
    REFUNDS ||--o{ BOOKINGS }
    NOTIFICATIONS ||--o{ BOOKINGS }
    
    REFUNDS {
        uuid PK
        booking_id FK
        amount
        reason
        status
        processed_by
        created_at
    }
    
    NOTIFICATIONS {
        uuid PK
        user_id FK
        booking_id FK
        type
        title
        message
        status
        scheduled_at
        sent_at
        created_at
    }
```

### 1.9 Administrative System
```mermaid
erDiagram
    ADMIN_USERS ||--o{ ADMIN_LOGS }
    SERVICES ||--o{ ADMIN_LOGS }
    CITIES ||--o{ ADMIN_LOGS }
    DISCOUNT_CODES ||--o{ ADMIN_LOGS }
    CAMPAIGNS ||--o{ ADMIN_LOGS }
    
    ADMIN_USERS {
        uuid PK
        user_id FK
        permissions
        last_login
        created_at
    }
    
    SERVICES {
        uuid PK
        name
        type
        config JSONB
        is_active
        created_at
    }
    
    CITIES {
        uuid PK
        name
        country
        latitude
        longitude
        timezone
        is_active
        created_at
    }
    
    DISCOUNT_CODES {
        uuid PK
        code
        type
        value
        min_amount
        max_usage
        expires_at
        is_active
        created_at
    }
    
    CAMPAIGNS {
        uuid PK
        name
        description
        start_date
        end_date
        config JSONB
        status
        created_at
    }
    
    ADMIN_LOGS {
        uuid PK
        admin_user_id FK
        action
        entity_type
        entity_id
        details JSONB
        ip_address
        user_agent
        created_at
    }
```

---

## 2. Relationships & Constraints

### 2.1 Key Relationships
1. **Users to Bookings**: One-to-Many (user can have multiple bookings)
2. **Bookings to Service Bookings**: One-to-One (booking has one service-specific booking)
3. **Services to Service Data**: One-to-Many (service can have multiple records)
4. **Bookings to Payments**: One-to-Many (booking can have multiple payment attempts)
5. **Bookings to Refunds**: One-to-One (booking can have one refund)
6. **Bookings to Notifications**: One-to-Many (booking can trigger multiple notifications)

### 2.2 Data Integrity Constraints
- **Foreign Key Constraints**: All relationships maintain referential integrity
- **Check Constraints**: Enum values for status, gender, service_type
- **Unique Constraints**: Email, phone, booking_reference
- **Not Null Constraints**: Required fields for data completeness
- **Index Optimization**: Strategic indexes on frequently queried columns

### 2.3 Cascade Operations
- **DELETE CASCADE**: Removing user removes their bookings and notifications
- **SET NULL**: Removing service records sets related FK to null
- **RESTRICT**: Critical data prevents accidental deletion

---

## 3. Performance Considerations

### 3.1 Indexing Strategy
```sql
-- Primary performance indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_bookings_user_status ON bookings(user_id, status);
CREATE INDEX idx_flights_departure_date ON flights(departure_time);
CREATE INDEX idx_hotels_city_rating ON hotels(city, rating);
CREATE INDEX idx_bookings_created_at ON bookings(created_at);
CREATE INDEX idx_services_type ON services(type, is_active);

-- Composite indexes for complex queries
CREATE INDEX idx_flight_search ON flights(departure_airport_id, arrival_airport_id, departure_time);
CREATE INDEX idx_hotel_search ON hotels(city, star_rating, price_range);
```

### 3.2 Partitioning Strategy
```sql
-- Partition large tables by date for performance
CREATE TABLE bookings_2024_01 PARTITION OF bookings
FOR VALUES FROM ('2024-01-01') TO ('2024-01-31');

CREATE TABLE bookings_2024_02 PARTITION OF bookings
FOR VALUES FROM ('2024-02-01') TO ('2024-02-29');
```

### 3.3 Caching Strategy
```sql
-- Materialized views for complex queries
CREATE MATERIALIZED VIEW mv_popular_routes AS
SELECT 
    origin_city,
    destination_city,
    COUNT(*) as booking_count,
    AVG(base_price) as avg_price
FROM bookings b
WHERE b.status = 'completed'
    AND b.created_at >= NOW() - INTERVAL '90 days'
GROUP BY origin_city, destination_city
ORDER BY booking_count DESC;

-- Refresh strategy
REFRESH MATERIALIZED VIEW mv_popular_routes CONCURRENTLY;
```

---

## 4. Security & Compliance

### 4.1 Data Encryption
```sql
-- Column-level encryption for sensitive data
ALTER TABLE users 
ALTER COLUMN passport_number 
TYPE bytea USING pgcrypto;

-- Transparent data encryption
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

### 4.2 Audit Trail
```sql
-- Comprehensive audit logging
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name VARCHAR(50),
    operation VARCHAR(20),
    user_id UUID,
    old_values JSONB,
    new_values JSONB,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address INET
);

-- Trigger for automatic audit logging
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_log (table_name, operation, user_id, old_values, new_values)
    VALUES (TG_TABLE_NAME, TG_OP, current_setting('app.current_user_id'), 
            OLD, NEW);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

## 5. Scaling Considerations

### 5.1 Read Replicas
- **3 Read Replicas** for reporting and analytics
- **Connection Pooling**: PgBouncer with max 20 connections per service
- **Geographic Distribution**: Multi-region deployment for global scale

### 5.2 Write Optimization
- **Connection Pooling**: Separate write connections for each service
- **Queue System**: Background job processing for heavy operations
- **Event Sourcing**: Immutable event log for audit trails

### 5.3 Storage Optimization
- **Data Archiving**: Move historical data to cold storage
- **Compression**: Use table compression for large text fields
- **Cleanup Jobs**: Automated cleanup of temporary data

---

## 6. Migration Strategy

### 6.1 Version Control
```sql
-- Migration tracking table
CREATE TABLE schema_migrations (
    id SERIAL PRIMARY KEY,
    version VARCHAR(20) NOT NULL,
    description TEXT,
    sql_up TEXT NOT NULL,
    sql_down TEXT,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rollback_possible BOOLEAN DEFAULT TRUE
);
```

### 6.2 Zero-Downtime Deployment
1. **Blue-Green Deployment**: Maintain two identical environments
2. **Feature Flags**: Dynamic feature enablement
3. **Database Migrations**: Incremental schema updates
4. **Health Checks**: Comprehensive service validation

---

This ERD provides a robust, scalable foundation for the Humsafar travel platform that can handle enterprise-level traffic while maintaining data integrity and performance standards.
