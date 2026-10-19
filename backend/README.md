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
