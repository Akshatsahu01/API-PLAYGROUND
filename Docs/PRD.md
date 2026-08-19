# API Playground - Product Requirements Document

**Version:** 1.0  
**Status:** MVP product definition  
**Date:** 2026-08-19

## 1. Product Summary

API Playground helps developers explore a healthcare sample API without manually constructing request URLs. The application provides resource selection, visual filters, live JSON responses, and generated examples for common programming languages.

## 2. Problem

Developers learning or integrating an API must discover endpoints, remember query parameter names, construct valid URLs, inspect responses, and translate requests into code. These steps are disconnected in a typical API workflow. API Playground brings them together in a single browser experience.

## 3. Users

- Developers evaluating or integrating the sample API.
- Students learning REST APIs, query parameters, and database-backed services.
- QA engineers checking filtered responses.
- Technical reviewers demonstrating the project.

## 4. Goals and Success Criteria

### Goals

- Make available resources immediately discoverable.
- Let users build filtered requests without memorizing parameter syntax.
- Show the exact URL and JSON response.
- Give users a usable starting point in four programming languages.

### MVP success criteria

- A new user can run an unfiltered doctors request from the home page.
- A user can combine filters and reproduce the displayed URL.
- Generated code contains the same URL shown in the explorer.
- Loading and failure states are visible and understandable.

## 5. Scope

### In scope

- Doctors and Patients read-only resources.
- Dropdown filters configured in `frontend/src/data/apiConfig.js`.
- URL generation with encoded query parameters.
- Browser GET requests to the Express backend.
- Formatted JSON response display.
- JavaScript, Java, Python, and C++ request examples.
- PostgreSQL-backed filtering through modular backend layers.

### Out of scope for MVP

- Authentication, user accounts, or permissions.
- Creating, editing, or deleting records.
- Appointment scheduling or clinical workflows.
- Real patient-data processing.
- Pagination, sorting, full-text search, analytics, quotas, or billing.
- Saved requests or automatic schema discovery.

## 6. User Stories and Acceptance Criteria

| ID    | User story                                                                  | Acceptance criteria                                                                        |
| ----- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| US-01 | As a developer, I want to choose a resource so I can explore its data.      | Doctors and Patients are selectable; the active endpoint and filters update.               |
| US-02 | As a developer, I want to choose filters so I can narrow results.           | The selected resource shows its supported options and retains selected values until reset. |
| US-03 | As a developer, I want to see the final URL so I can reuse it elsewhere.    | The URL includes the endpoint and all non-empty, URL-encoded query parameters.             |
| US-04 | As a developer, I want to fetch data so I can inspect a real response.      | The UI shows loading, then formatted JSON on success or a visible error on failure.        |
| US-05 | As a developer, I want generated code so I can start integration quickly.   | Four language tabs render examples containing the current URL.                             |
| US-06 | As a maintainer, I want layered backend code so I can add resources safely. | Routes, controllers, services, and models remain separate responsibilities.                |

## 7. Functional Requirements

### Resource discovery

- The UI shall list resources defined in `apiConfig.js`.
- The initial resource shall be Doctors.
- The backend shall expose `GET /api/doctors` and `GET /api/patients`.

### Filtering

- Doctors shall support specialization, availability, and minimum experience.
- Patients shall support gender, age range, assigned doctor, payment range, and sickness.
- Empty filters shall not be included in the generated URL.
- Values shall be URL-encoded before the request.
- Applying filters shall update the URL; fetching shall be a separate action.
- Reset shall clear filters and restore the unfiltered resource URL.

### Response handling

- The browser shall issue a GET request to the displayed URL.
- Successful collection responses shall be displayed as formatted JSON.
- Loading, error, no-response, and success states shall be visually distinct.
- Backend errors should use one documented JSON shape and appropriate 4xx/5xx codes.

### Code generation

- The UI shall offer JavaScript, Java, Python, and C++ examples.
- Examples shall use the exact current generated URL.
- Changing resources shall reset the selected language.

## 8. Non-Functional Requirements

- **Usability:** The core workflow should be understandable without separate API documentation.
- **Performance:** UI interactions should remain responsive while requests are running.
- **Security:** SQL values must be parameterized, secrets must remain server-side, and production CORS must be restricted.
- **Compatibility:** Support current evergreen browsers and the Node.js runtime used by the backend.
- **Maintainability:** New resources should follow the existing backend layering and frontend metadata pattern.
- **Privacy:** Use synthetic or explicitly approved data only; do not place real patient information in the demo environment.

## 9. Assumptions

- PostgreSQL contains `doctors` and `patients` tables.
- `patients.doctor_id` references `doctors.id`.
- Doctor availability is stored as a boolean.
- Age, experience, and amount-to-be-paid are numeric fields.
- The frontend's fixed doctor IDs and option labels match seeded database data.

The repository does not currently include database migrations or a formal API schema, so these assumptions must be confirmed before production deployment.

## 10. Risks and Mitigations

| Risk                                          | Impact                                | Mitigation                                                                  |
| --------------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------- |
| Frontend and backend filter definitions drift | Requests become invalid or surprising | Adopt a shared OpenAPI contract or generated metadata.                      |
| Invalid values reach the model                | Errors or incorrect results           | Validate enums and numbers before querying.                                 |
| Large result sets overload the UI/database    | Slow requests                         | Add limits, pagination, explicit fields, and indexes based on measurements. |
| Demo data is mistaken for clinical data       | Privacy and trust issues              | Label data as synthetic and prohibit real PII.                              |
| Inconsistent backend errors                   | Difficult client handling             | Standardize status codes and error response bodies.                         |

## 11. Future Roadmap

1. Add an OpenAPI specification and generated API documentation.
2. Add pagination, sorting, field selection, and request history.
3. Add copy-to-clipboard and downloadable code snippets.
4. Add schema and sample-response panels.
5. Add automated backend and frontend tests.
6. Add security and privacy controls only if the product expands beyond synthetic demo data.

## 12. Release Checklist

- Backend starts with documented environment variables.
- Frontend passes `npm run build`.
- Root health route responds successfully.
- Both resource endpoints return expected data with a configured database.
- Each documented filter produces the intended behavior.
- URL, response, loading, error, and code-generation states work on desktop and mobile.
- No secrets or real patient information are committed.
