# Backend API

This folder contains the Node.js and Express backend for the API Playground project. It exposes REST APIs for managing doctor and patient records and connects to a PostgreSQL database.

## Features

- Express server with JSON handling and CORS support
- Modular structure with routes, controllers, services, and models
- Environment-based configuration using dotenv
- PostgreSQL connectivity through the pg package

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- dotenv
- cors
- nodemon

## Getting Started

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure your environment variables

4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - start the server with nodemon
- `npm start` - start the server in production mode
- `npm run seed:generate` - regenerate the 47-API SQL seed and mutation schemas from the frontend catalog

## Seeded Explore APIs

Run [`sql/seed_explore_apis.sql`](sql/seed_explore_apis.sql) against the PostgreSQL
database configured in your `.env` file:

```bash
psql -h your_host -U your_user -d your_database -f sql/seed_explore_apis.sql
```

The script creates three sample data tables, inserts four records into each,
and adds three cards to the existing `fake_apis` catalog. It preserves existing
rows and can be run again without duplicating these sample records or cards.

| Endpoint | Optional filter | Single record |
| --- | --- | --- |
| `GET /api/products` | `?category=Home` | `GET /api/products/1` |
| `GET /api/books` | `?genre=Science%20Fiction` | `GET /api/books/1` |
| `GET /api/posts` | `?user_id=1` | `GET /api/posts/1` |

List routes return JSON arrays. Single record routes return a JSON object, or
404 when the ID does not exist. Invalid IDs and invalid filters return 400.
The catalog routes remain `GET /api/fake-apis` and `GET /api/fake-apis/:id`.

## The 47 practice APIs

Generate and load their sample records with:

```bash
npm run seed:generate
psql -h your_host -U your_user -d your_database -f sql/seed_practice_apis.sql
```

The seed creates 47 separate tables and inserts 10 sample records (IDs 1-10)
into each table. A table name is `playground_` plus the API ID, with hyphens
replaced by underscores (for example, `bus-routes` uses
`playground_bus_routes`). The API IDs are `students`, `courses`, `exams`, `grades`, `library`,
`employees`, `companies`, `teams`, `jobs`, `applications`, `comments`, `users`,
`followers`, `notifications`, `chats`, `expenses`, `cart`, `orders`, `invoices`,
`coupons`, `flights`, `hotels`, `destinations`, `bus-routes`, `properties`,
`recipes`, `workouts`, `habits`, `sleep-records`, `moods`, `movies`, `music`,
`games`, `news`, `podcasts`, `todos`, `snippets`, `servers`, `webhooks`,
`errors`, `countries`, `space`, `weather-records`, `statistics`, `locations`,
`auth`, and `request-tests`. Re-running the SQL upserts the sample rows without
duplicating them. The seed data is generated from each frontend sample response
and expanded into 10 distinguishable records. The generator also creates the
backend table and field maps used by GET handlers and mutation validation.

Each collection supports `GET /api/:apiId` and `GET /api/:apiId/:id`. Collection
GET supports exact-match filters on table columns, `search`, `sort`, `order`,
`limit`, and `offset`. For example:
`GET /api/students?enrollment_status=active&limit=20`.
GET requests read from PostgreSQL. `POST /api/:apiId`, `PUT /api/:apiId/:id`,
`PATCH /api/:apiId/:id`, and `DELETE /api/:apiId/:id` are simulated and never
write to PostgreSQL. Mutation bodies must be JSON objects with fields and value
types from that API's sample record; an optional body `id` must match the URL
ID. PUT requires every sample field, while PATCH needs at least one valid field.
DELETE accepts an empty body or validates fields if a body is supplied.
Mutations recognize seeded IDs 1-10; other well-formed IDs return 404.
Invalid IDs or bodies return 400. Successful simulated writes return 200 with
`dataChanged: false` and a message identifying the simulated operation.

The extra examples also work: `GET /api/errors/:status` returns the selected
sample HTTP error; `POST /api/auth/register` and `/api/auth/login` simulate
authentication; `GET /api/chats/:id/messages` and
`GET /api/webhooks/:id/deliveries` read their sample parent record from
PostgreSQL. Chat message POST requests are simulated.

## Doctor and patient mutation examples

`DELETE`, `PUT`, and `PATCH` are available on `/api/doctors` and
`/api/patients` as validation-only examples. DELETE uses supported URL query
filters and does not accept a body. PUT and PATCH require a JSON object with a
positive integer `id`; PATCH also requires at least one valid field, while PUT
requires every field for that resource. Invalid inputs receive `400 Bad
Request`. Valid requests receive `200 OK` with `dataChanged: false`. These
handlers do not call a service or modify PostgreSQL.

## Project Structure

- `src/app.js` - application setup
- `src/server.js` - server entry point
- `src/routes/` - API routes
- `src/controllers/` - request handlers
- `src/services/` - business logic
- `src/models/` - data models
- `src/config/` - environment and database configuration
