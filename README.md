# Smart Clinic Management System

A full‑stack, cloud‑ready healthcare management platform built with Spring Boot, Spring MVC, REST APIs, MySQL, and MongoDB.
Designed to demonstrate enterprise‑grade engineering practices, modular architecture, and secure multi‑role access for Admin, Doctor, and Patient users.

# Table of Contents
- Overview

- Features

- Architecture

- Tech Stack

- System Modules

- Database Design

- Security

- API Endpoints

- Screenshots

- Running the Project

- Docker Support

- CI/CD Pipeline

- Future Enhancements

- Author

# Overview
The Smart Clinic Management System is a modern healthcare application designed to streamline clinic operations. It supports patient onboarding, doctor management, appointment scheduling, and prescription storage. The system includes role‑based dashboards and secure authentication using JWT.

Although developed as a capstone project, the application is structured using real‑world engineering patterns to demonstrate professional backend development skills suitable for enterprise environments.

# Features
**Admin**
- Add, update, and manage doctors

- View clinic‑wide metrics

- Manage user accounts

**Doctor**
- View upcoming appointments

- Access patient records

- Create and update prescriptions

**Patient**
- Search for doctors

- Book appointments

- View personal medical history

**Security**
- JWT‑based authentication

- Role‑based authorization

- Secure password hashing

**Reporting**
- Daily appointment reports

- Doctor performance metrics

- Stored procedures for analytics

# Architecture
The system follows a three‑tier architecture:

**1. Presentation Layer**
- Thymeleaf MVC for Admin and Doctor dashboards

- REST APIs for Patient and Appointment modules

- JSON responses for external clients

**2. Application Layer**
- Spring Boot controllers

- Service layer containing business logic

- Repository layer for data access

- DTOs for clean API responses

**3. Data Layer**
- MySQL for structured relational data

- MongoDB for flexible prescription documents

**High‑Level Flow**
1. User interacts with dashboard or REST endpoint

2. Controller receives the request

3. Service layer processes business logic

4. Repository accesses MySQL or MongoDB

5. Data is returned to the service layer

6. Controller returns HTML or JSON

7. User receives updated UI or API response

# Tech Stack
**Backend**
- Java 17

- Spring Boot

- Spring MVC

- Spring Web

- Spring Security (JWT)

- Spring Data JPA

- Spring Data MongoDB

- Maven

**Databases**
- MySQL

- MongoDB

**DevOps**
- Docker

- GitHub Actions (CI pipeline)

# System Modules
Module	Description
Admin	Manage doctors, users, and system settings
Doctor	View appointments, manage prescriptions
Patient	Search doctors, book appointments
Auth	JWT login, registration, role management
Reports	Stored procedures for analytics
# Database Design
**MySQL (Relational)**
- Patient

- Doctor

- Appointment

- User

- Role

**MongoDB (Document‑based)**
- Prescription documents

- Flexible schema for medication lists, notes, and dosage history

# Security
**The system uses:**

- JWT authentication

- Role‑based access control

- BCrypt password hashing

- Secure API endpoints

**Roles include:**

- ADMIN

- DOCTOR

- PATIENT

# API Endpoints (Sample)
**Doctor APIs**
Code
GET /api/doctors
GET /api/doctors/{id}
POST /api/doctors
**Appointment APIs**
Code
GET /api/appointments/patient/{id}
POST /api/appointments
**Auth APIs**
Code
POST /api/auth/login
POST /api/auth/register
# Screenshots
(Add screenshots here once generated.)
