# Express Auth Email Backend Template

## Overview

## Summary

A minimal Express backend template implementing secure user authentication with email verification, intended for rapid prototyping of auth flows using MongoDB, JWTs, and bcrypt. It provides registration, email verification, JWT-protected routes, and simple project/task management primitives you can extend.

### Key features

- User registration with email verification
- Login with JWT access tokens
- Password hashing (bcrypt)
- Token-based protected routes

### Quick start

1. Install dependencies: npm install
2. Create a .env file (MONGO_URI, JWT_SECRET)
3. Start in dev: npm run dev

### Routes (routes folder)

- routes/users.js

  - POST /auth/register — Register a new user and send email verification
  - POST /auth/login — Authenticate and return access (and optional refresh) token

  - routes/taskRoute.js

    - GET /projects/:projectId/tasks — List tasks (protected).
    - POST /projects/:projectId/tasks — Create a new task (protected).
    - PUT /tasks/:taskId — Replace/update a task (protected).
    - DELETE /projects/:projectId/members/:userId — Remove a member from a project (protected)

  - routes/projectRoutes.js
    - GET /projects — List projects by the login user (protected).
    - POST /projects — Create a new project (protected).
    - GET /projects/:id — Get project details by ID (protected)
    - PUT /projects/:id — Update a project (protected)
    - DELETE /projects/:id — Delete a project (protected)
    - DELETE /projects/:id/members/:userId — Remove a member from a project (protected)
    - GET /projects/:id/tasks — List tasks for a project (protected) — can delegate to /tasks with projectId filter

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
