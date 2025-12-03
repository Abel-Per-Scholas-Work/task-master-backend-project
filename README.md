# Express Auth Email Backend Template

## Overview

A minimal Express backend template implementing user authentication with email verification. Designed for rapid prototyping of auth flows using MongoDB, JWTs, and bcrypt.

### Key features

- User registration with email verification
- Login with JWT access tokens
- Password hashing (bcrypt)
- Token-based protected routes

### Quick start

1. Install dependencies: npm install
2. Create a .env file (MONGO_URI, JWT_SECRET)
3. Start in dev: npm run dev

### Typical endpoints

- POST /auth/register
- POST /auth/login

### Intended use

Serve as a starter backend for apps that need secure user authentication and email-based account verification, easily extended for additional user management and business logic.

## Dependencies

- Express
- MongoDB/Mongoose
- Dotenv
- Morgan
- Cors
- jwtwebtoken
- bcrypt

## Dev Dependencies

- Nodemon
