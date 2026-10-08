# Student Practice

## Exercise 1 — Add Claims
Create a `Claim` model with:
- claimNumber (unique)
- policyNumber
- incidentDate
- amount
- status: submitted | reviewing | approved | denied
Build GET and POST endpoints.

## Exercise 2 — Add Query Filters
Enhance policies endpoint to filter by:
- status
- premium range
- effective date

## Exercise 3 — Validation
Add custom validation so cancelled policies cannot have a future effective date.

## Exercise 4 — Authorization
Allow users to read policies, but only admins to delete them.

## Exercise 5 — Error Handling
Standardize all errors using RFC 9457 Problem Details.

## Exercise 6 — Pagination
Load 100+ policies and compare offset pagination to cursor pagination.

## Reflection questions
1. Why use both express-validator and Mongoose validation?
2. When would the native MongoDB driver be preferable to Mongoose?
3. What happens if `runValidators: true` is omitted from an update?
4. Why should routes contain little or no business logic?
5. Why are short-lived access tokens safer?
6. What security risk comes from passing `req.body` directly to a model?
7. What production concerns exist beyond functional CRUD?
