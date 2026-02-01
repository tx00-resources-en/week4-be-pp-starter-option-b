# Postman Checklist (Beginner-Friendly)

Use this every time you add a new endpoint.

## Base setup

- Base URL: `http://localhost:4000`
- If your routes are under `/api`, your full base becomes:
  - `http://localhost:4000/api`

Tip: in Postman you can store the base as an environment variable (example: `{{baseUrl}}`) so you don’t have to edit every request later.

## For GET requests

- Method: `GET`
- URL example: `/api/tours`
- Expected:
  - Status `200`
  - JSON array or object

## For POST / PUT requests

1) Set headers

- `Content-Type: application/json`

2) Set body

- Body → raw → JSON
- Paste JSON (valid JSON uses double quotes)

3) Common mistakes

- Forgetting the header
- Invalid JSON (trailing comma, single quotes)
- Sending fields with the wrong names

## For DELETE requests

- Method: `DELETE`
- URL example: `/api/tours/1`
- Expected (depends on the lab step):
  - Often `204 No Content` (no JSON body)
  - Or `200` with a message

If you expect `204`, don’t be surprised if the response body is empty (that’s correct).

## Always check these 3 things

1. **Status code** (200/201/204/404/403/500)
2. **Response body** (JSON or empty)
3. **Server terminal logs**

## Debugging fast

If something doesn’t work:

- Did the server restart? (your `npm run dev` script should restart automatically)
- Are you calling the correct URL? (`/tours` vs `/api/tours`)
- Are you using the correct ID? (create first, then use returned `id`)
- Did you send JSON correctly for POST/PUT?

## Common status codes in this lab

- `200 OK` — normal success
- `201 Created` — successful POST creates a resource
- `204 No Content` — successful DELETE with no JSON body
- `403 Forbidden` — blocked by auth middleware (try `?admin=true`)
- `404 Not Found` — ID doesn’t exist
- `500 Server Error` — your server logic returned failure (often missing required fields)

## Auth middleware quick test (if the lab uses it)

- Should fail: `POST /api/tours`
- Should pass: `POST /api/tours?admin=true`

Tip: query params are after `?`.
