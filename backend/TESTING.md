# Backend Jest tests

Run the backend tests from the `backend` directory:

```bash
npm test
```

The tests are in `tests/practiceApiRoutes.test.js`. They send HTTP requests to
the real Express app and router. The database model is mocked, so the suite does
not require a running PostgreSQL database, Neon credentials, or seeded records.

## Test cases

1. **Collection GET** - sends `GET /api/companies` with filters and checks the
   route forwards the API ID and query values to the data model and returns its
   records as JSON.
2. **GET by ID** - sends `GET /api/companies/1` and checks the route passes the
   numeric ID to the data model and returns the matching record.
3. **Malformed ID validation** - sends `GET /api/companies/not-an-id` and
   checks the API returns HTTP 400 without querying the data model.
4. **Simulated PATCH** - sends a valid `PATCH /api/companies/1` and checks the
   success response while confirming the data model is never called. This
   guards the rule that simulated mutations do not write to PostgreSQL.

These tests cover the HTTP route, controller, and service boundary, but are not
database integration tests. GET results come from a mocked model, so the suite
does not verify the live PostgreSQL connection or table contents.
