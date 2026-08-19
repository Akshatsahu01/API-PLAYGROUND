# API Playground - Low-Level Design

**Version:** 1.0  
**Status:** Current implementation reference  
**Date:** 2026-08-19

## 1. Project Structure

```text
API-PLAYGROUND/
  backend/
    src/
      app.js
      server.js
      config/env.js
      config/db.js
      routes/doctorRoutes.js
      routes/patientRoutes.js
      controllers/doctorController.js
      controllers/patientController.js
      services/doctorServices.js
      services/patientServices.js
      models/doctorModel.js
      models/patientModel.js
    package.json
  frontend/
    src/
      App.jsx
      pages/Home.jsx
      components/ApiExplorer/
      components/CodeGenerator/
      components/Navbar/
      components/Hero/
      components/Footer/
      data/apiConfig.js
    package.json
  Docs/
```

## 2. Backend Endpoints

### `GET /`

Returns HTTP 200 and a JSON health message:

```json
{
  "message": "API Playground Backend Running"
}
```

### `GET /api/doctors`

Supported query parameters:

| Parameter | Behavior |
|---|---|
| `specialization` | Exact match on `specialization` |
| `availability` | Compares `available` to `true` when value is `Available`; other values become `false` |
| `experience` | Converts the value to a number and applies `experience >= value` |

The model starts with `SELECT * FROM doctors`, appends predicates when filters exist, binds values as `$1`, `$2`, and so on, then returns `result.rows`.

Success: HTTP 200 with an array. Failure: HTTP 500 with `{ "message": "Failed to fetch doctors" }`.

### `GET /api/patients`

Supported query parameters:

| Parameter | Behavior |
|---|---|
| `gender` | Exact match on `gender` |
| `age=0-18` | `age BETWEEN 0 AND 18` |
| `age=19-30` | `age BETWEEN 19 AND 30` |
| `age=31-50` | `age BETWEEN 31 AND 50` |
| `age=50+` | `age >= 50` |
| `doctorAssigned` | Converts to a number and matches `doctor_id` |
| `amountToBePaid=< INR1000` | `amount_to_be_paid < 1000` |
| `amountToBePaid=INR1000 - INR5000` | `amount_to_be_paid BETWEEN 1000 AND 5000` |
| `amountToBePaid=> INR5000` | `amount_to_be_paid > 5000` |
| `sickness` | Exact match on `sickness` |

Multiple predicates are joined with `AND`. Success is HTTP 200 with an array. The current failure path returns HTTP 501 and a string; this should be changed to a consistent HTTP 500 JSON error.

## 3. Backend Runtime Details

`server.js` imports `config/env.js`, imports the Express app, creates the database pool through `config/db.js`, and listens on `PORT` or 3000 on `0.0.0.0`.

`app.js` installs `cors()`, `express.json()`, the root route, and the two resource routers. There is no authentication middleware or centralized error middleware.

`env.js` loads `.env` from the backend directory. Required database settings are:

```text
PORT=3000
DB_HOST=<host>
DB_PORT=<port>
DB_NAME=<database>
DB_USER=<user>
DB_PASSWORD=<password>
```

The frontend uses:

```text
VITE_API_URL=http://localhost:3000
```

## 4. Inferred Database Schema

The repository contains no migrations or schema definition, so types below are inferred from SQL and UI usage.

### `doctors`

| Column | Inferred type | Notes |
|---|---|---|
| `id` | integer | Primary key; referenced by patients |
| `specialization` | text | Exact-match filter |
| `available` | boolean | Availability filter |
| `experience` | integer | Minimum-value filter |

### `patients`

| Column | Inferred type | Notes |
|---|---|---|
| `id` | integer | Primary key |
| `gender` | text | Exact-match filter |
| `age` | integer | Range filter |
| `doctor_id` | integer | Intended foreign key to `doctors.id` |
| `amount_to_be_paid` | numeric | Range filter |
| `sickness` | text | Exact-match filter |

Recommended constraints include non-negative age and amounts, non-negative experience, and a foreign key from `patients.doctor_id` to `doctors.id`.

## 5. Frontend State Design

`ApiExplorer` maintains:

- `selectedApi`, initially `doctors`.
- `selectedFilters`, keyed by filter IDs.
- `generatedUrl`, initialized from `VITE_API_URL` and the selected endpoint.
- `responseData`, containing the latest successful response.
- `loading`, indicating an active fetch.
- `error`, containing the latest fetch error message.

Selecting an API clears filters and rebuilds the base URL. Reset clears filters and restores the base URL. Apply creates a query string from non-empty values. Fetch calls the generated URL with browser `fetch`, rejects non-2xx responses, and parses JSON.

`ResponseViewer` handles four rendering states. `CodeGenerator` supports JavaScript, Java, Python, and C++ through components in `languageCodes.jsx`; it resets the selected language when the resource changes.

## 6. Recommended Hardening Tasks

- Validate numeric values and enum values at the controller boundary.
- Reject unknown age and payment ranges instead of mapping them implicitly.
- Standardize errors as JSON with consistent status codes.
- Add centralized logging and Express error middleware.
- Use explicit selected columns and pagination.
- Add indexes for common filter columns after measuring query patterns.
- Add database readiness checks and graceful pool shutdown.
- Restrict CORS and verify database TLS certificates.

## 7. Test Design

No backend test files are currently present. Recommended tests include:

- Root route returns 200.
- Each endpoint works with no filters.
- Every individual filter maps to the intended predicate.
- Multiple filters preserve placeholder/value order.
- Invalid numeric and enum inputs return 400.
- Database failures return the standard error body.
- Frontend URL generation encodes values and reset clears them.
- Response viewer renders loading, error, empty, and success states.
