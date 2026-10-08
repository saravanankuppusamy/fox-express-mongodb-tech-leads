# Fox Insurance — Express + MongoDB Demo Guide (2 Hours)

## Learning objective
Help tech leads understand how an Express API moves a request through middleware, validation, routes/controllers, Mongoose models, and MongoDB — and how production concerns fit around that flow.

## Suggested 2-hour flow
| Time | Topic | Demo |
|---|---|---|
| 0–15 min | MongoDB fundamentals | Inspect Fox policy documents and collections |
| 15–30 min | Native driver vs Mongoose | Explain ODM value and trade-offs |
| 30–50 min | Schemas/models | Walk through `Policy.js`, enums, required fields, unique index |
| 50–75 min | CRUD API | Run GET/POST/PUT/DELETE flows |
| 75–95 min | Validation & errors | Trigger 400, invalid ID, duplicate 409 |
| 95–110 min | JWT & authorization | Register/login, then protected update/delete |
| 110–120 min | Production practices | Helmet, CORS, rate limiting, logging, pagination, wrap-up |

## Demo 1 — Data model and schema
Open `src/models/Policy.js`.
Discuss:
- collection/document model
- schema-required fields
- `enum` for product types
- `unique` creates an index; duplicate errors still come from MongoDB
- virtual `displayLabel`

## Demo 2 — Request lifecycle
Use `GET /api/policies` and trace:
Client -> Express -> middleware -> route -> controller -> Mongoose model -> MongoDB -> response.

Files to show:
1. `src/app.js`
2. `src/routes/policies.js`
3. `src/controllers/policyController.js`
4. `src/models/Policy.js`

## Demo 3 — CRUD
Run requests from `requests/fox-api.http`.
- GET all policies
- GET with `?productType=auto`
- POST a new policy
- PUT after login with bearer token
- DELETE as admin

## Demo 4 — Defense-in-depth validation
Submit the invalid POST request. Show that express-validator rejects malformed input before the database call.
Then point out that Mongoose still enforces schema rules if some other code path calls the model directly.

## Demo 5 — Centralized error handling
Trigger:
- malformed MongoDB ObjectId -> 400
- duplicate `policyNumber` -> 409
- schema validation error -> 400
Explain the `application/problem+json` error shape.

## Demo 6 — Authentication and authorization
Register/login with the sample admin account.
Explain:
- bcrypt hashes the password before save
- JWT is verified by middleware
- authentication = who are you?
- authorization = what are you allowed to do?
- DELETE requires admin role

## Demo 7 — Pagination and production concerns
Use `GET /api/policies?limit=2` and follow `nextCursor`.
Discuss why cursor pagination scales better than large `skip()` values.
Point out Helmet, CORS, rate limiting, structured logging, connection pooling, and graceful shutdown.

## Instructor talking points
- Keep routes thin; move logic into controllers/services.
- Never hardcode MongoDB or JWT secrets.
- Explicitly map allowed fields instead of blindly storing `req.body`.
- Validate at both API and model layers.
- `findByIdAndUpdate()` skips pre-save hooks; use find-modify-save when hooks matter.
- Production readiness is more than CRUD: errors, security, observability, limits, configuration, and shutdown behavior matter.
