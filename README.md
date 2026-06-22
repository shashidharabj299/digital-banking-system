# Digital Banking System

A full-stack microservices banking application built with Spring Boot and React.

## Services
- **Auth Service** (8081) — User registration and login with JWT
- **Account Service** (8082) — Bank account management
- **Transaction Service** (8083) — Money transfers and history
- **API Gateway** (8080) — JWT validation and routing
- **Banking UI** (3000) — React frontend

## Tech Stack
- Java 21 + Spring Boot 3.5
- Spring Security + JWT
- MySQL
- React.js
- Spring Cloud Gateway

## How to Run
1. Start MySQL
2. Run each service with `mvn spring-boot:run`
3. Start React UI with `npm start`
4. Open `http://localhost:3000`
