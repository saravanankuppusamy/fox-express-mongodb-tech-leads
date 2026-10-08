# Fox Insurance Express + MongoDB Integration Demo

A classroom-friendly demo repository for a 2-hour Express/MongoDB integration session for tech leads.

## Covers
MongoDB fundamentals, Mongoose schemas/models, layered Express CRUD, dual-layer validation, centralized error handling, JWT authentication/authorization, pagination, Helmet, CORS, rate limiting, logging, pooling, and graceful shutdown.

## Requirements
- Node.js 20+
- MongoDB 7/8 locally, or MongoDB Atlas
- VS Code REST Client, Postman, Insomnia, or curl

## Quick start
```bash
npm install
cp .env.example .env
npm run seed
npm run dev
```
Open `requests/fox-api.http` and execute the demo requests.

## Repository map
```text
src/
  app.js
  config/db.js
  models/Policy.js User.js
  routes/policies.js auth.js
  controllers/policyController.js authController.js
  middleware/asyncHandler.js validation.js auth.js errorHandler.js
requests/fox-api.http
demo-data/seed.js
docs/LECTURE-DEMO-GUIDE.md
docs/STUDENT-PRACTICE.md
```

## Teaching order
1. MongoDB document model
2. Mongoose schema/model
3. GET/POST CRUD
4. Validation and centralized errors
5. JWT authentication and role authorization
6. Cursor pagination
7. Production middleware and observability
