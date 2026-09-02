# API Playground - Product Requirements Document

**Version:** 1.1  
**Status:** MVP product definition  
**Date:** 2026-09-02

## 1. Product Summary

API Playground is a browser-based developer tool that helps users explore a healthcare sample REST API without manually constructing request URLs.

The product combines:
- Client-side page navigation.
- API resource discovery.
- Visual filter selection.
- Automatic request URL generation.
- Live JSON responses.
- Loading and error states.
- Generated integration examples.

The primary API resources are Doctors and Patients. The current product is read-only and intended for synthetic/sample data.

## 2. Problem Statement

Developers learning or integrating an API often need to discover endpoints, remember query parameter names, construct valid URLs, apply filters, send requests, inspect responses, and translate requests into application code.

API Playground brings these activities into one browser workflow so a developer can move from resource discovery to a reusable API request and generated code without manually constructing every part of the request.

## 3. Target Users

- Developers evaluating or integrating the sample API.
- Students learning REST APIs, query parameters, HTTP requests, and database-backed services.
- QA engineers checking filtered responses.
- Technical reviewers demonstrating the project.

## 4. Product Goals

### Goal 1 — Resource Discoverability

Users should be able to discover Doctors and Patients directly from the application.

### Goal 2 — Simple Request Construction

Users should build filtered API requests using UI controls instead of manually writing query parameters.

### Goal 3 — Request Reproducibility

Users should see the exact generated request URL and reuse it elsewhere.

### Goal 4 — Response Visibility

Users should clearly understand whether a request is loading, successful, empty, or failed.

### Goal 5 — Integration Support

Users should receive usable request examples in JavaScript, Java, Python, and C++.

### Goal 6 — Simple Application Navigation

Users should navigate between application pages without unnecessary full-page browser reloads.

## 5.1 Client-Side Navigation

The application shall provide client-side navigation using React Router.

Current routes:

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Main API exploration experience |
| `/about` | About | Project and feature information |
| `*` | NotFound | Handles unknown frontend routes |

Navigation requirements:
- Use `BrowserRouter` as the routing context.
- Explicitly map routes to React components.
- Use React Router navigation links.
- Navigate between application pages without a complete page reload.
- Render NotFound for unknown frontend paths.

**Rationale:** Client-side routing supports the browser-based single-page experience and keeps page navigation separate from API exploration state.

## 5.2 Resource Discovery

The application shall allow users to select Doctors or Patients.

Resource definitions shall be maintained in `frontend/src/data/apiConfig.js`.

The backend shall expose:
- `GET /api/doctors`
- `GET /api/patients`

Selecting a resource shall update the active endpoint and available filters.

## 5.3 Filtering

### Doctors
- Specialization
- Availability
- Minimum experience

### Patients
- Gender
- Age range
- Assigned doctor
- Payment range
- Sickness

Filter behavior:
- Show only supported filters for the selected resource.
- Exclude empty filters from the generated URL.
- URL-encode filter values.
- Update the generated URL when filters change.
- Keep fetching as a separate action.
- Reset filters to restore the unfiltered resource URL.

## 5.4 Request URL Generation

The final URL shall be generated from:

`Backend base URL + Resource endpoint + Selected non-empty query parameters`

Example:

`/api/doctors?specialization=Cardiology&experience=5`

The displayed URL shall represent the exact request sent by the Fetch action and shall also be used by the code generator.

## 5.5 API Request Execution

When the user fetches data:

1. The frontend sends an HTTP GET request to the displayed URL.
2. The backend routes the request to the appropriate resource handler.
3. Query parameters are processed.
4. The model retrieves matching records from PostgreSQL.
5. The backend returns JSON.
6. The frontend displays the result.

The UI shall distinguish loading, success, empty, and error states.

## 5.6 Response Handling

The response interface shall support:
- Loading state.
- Error state.
- Empty/no-data state.
- Successful formatted JSON response.

Errors shall be visibly presented to the user.

## 5.7 Code Generation

The application shall provide examples for:
- JavaScript
- Java
- Python
- C++

Generated examples shall contain the exact current request URL so the displayed URL, API request, and generated code represent the same request.

## 5.8 Backend Architecture Requirement

The backend shall maintain separate responsibilities:

`Routes → Controllers → Services → Models → PostgreSQL`

This allows resources to be extended without combining routing, HTTP handling, application logic, and database queries in one file.

## 6. User Stories and Acceptance Criteria

| ID | User Story | Acceptance Criteria |
|---|---|---|
| US-01 | As a developer, I want to navigate between application pages without full-page navigation. | `/` displays Home, `/about` displays About, and unknown paths display NotFound. |
| US-02 | As a developer, I want to choose a resource so I can explore its data. | Doctors and Patients are selectable and endpoint/filter configuration changes. |
| US-03 | As a developer, I want to choose filters so I can narrow API results. | Supported filters are shown and selected values are reflected in the generated URL. |
| US-04 | As a developer, I want to see the final request URL so I can reproduce it elsewhere. | The URL contains the endpoint and non-empty URL-encoded query parameters. |
| US-05 | As a developer, I want to fetch data so I can inspect a real response. | The UI displays loading and then formatted JSON, an empty state, or a visible error. |
| US-06 | As a developer, I want generated code so I can start integrating quickly. | JavaScript, Java, Python, and C++ examples contain the current request URL. |
| US-07 | As a maintainer, I want separated backend layers so resources can be extended safely. | Routes, controllers, services, and models retain separate responsibilities. |

## 7. Functional Requirements

### FR-01 — Routing
Use React Router for client-side navigation:
- `/` → Home
- `/about` → About
- `*` → NotFound

### FR-02 — Resource Selection
Allow selection between Doctors and Patients.

### FR-03 — Filter Configuration
Change available filters according to the selected resource.

### FR-04 — URL Generation
Generate a request URL from the selected resource and non-empty filters.

### FR-05 — URL Encoding
URL-encode filter values before adding them to the request URL.

### FR-06 — API Execution
Issue a GET request to the displayed URL when Fetch is selected.

### FR-07 — Backend Processing
Process resource requests through the configured backend layers.

### FR-08 — Database Retrieval
Retrieve filtered resource data from PostgreSQL through the model layer.

### FR-09 — Response Display
Display formatted JSON and visible request-state feedback.

### FR-10 — Code Generation
Generate request examples for four programming languages using the current request URL.

## 8. Non-Functional Requirements

### Usability
The primary API exploration workflow should be understandable without manually constructing query strings.

### Performance
The frontend should remain responsive while API requests are running.

### Security
Database query values must be parameterized. Database credentials must remain server-side. Production CORS must be restricted.

### Maintainability
New resources should follow the existing frontend configuration pattern and backend layering.

### Compatibility
Support current evergreen browsers and the Node.js runtime used by the backend.

### Privacy
Only synthetic or explicitly approved sample data should be used.

## 9. System Integration Requirements

The product integrates:

`React Frontend → Express REST API → Service/Model Layers → PostgreSQL`

### Frontend → Backend
The frontend sends HTTP GET requests using the generated API URL.

### Backend → Database
Express processes the request and delegates database operations through services and models.

### Database → Backend
PostgreSQL returns matching records.

### Backend → Frontend
The controller returns the database result as JSON.

### Frontend → User
React displays the response and uses the same URL for generated integration examples.

## 10. Product-to-Implementation Mapping

| Product Requirement | Implementation Location |
|---|---|
| Client-side navigation | `frontend/src/main.jsx` |
| Route mapping | `frontend/src/App.jsx` |
| Navigation links | `frontend/src/components/Navbar/Navbar.jsx` |
| Home page | `frontend/src/pages/Home.jsx` |
| About page | `frontend/src/pages/About.jsx` |
| Unknown route handling | `frontend/src/pages/NoteFound.jsx` |
| API resource configuration | `frontend/src/data/apiConfig.js` |
| Resource/filter state | `frontend/src/components/ApiExplorer/ApiExplorer.jsx` |
| Response rendering | `frontend/src/components/ApiExplorer/ResponseViewer.jsx` |
| Code generation | `frontend/src/components/CodeGenerator/CodeGenerator.jsx` |
| Backend configuration | `backend/src/app.js` |
| Doctor routing | `backend/src/routes/doctorRoutes.js` |
| Doctor query validation | `backend/src/middleware/validateDoctorQuery.js` |
| Database connection | `backend/src/config/db.js` |
| Doctor database access | `backend/src/models/doctorModel.js` |
| Patient database access | `backend/src/models/patientModel.js` |

## 11. Scope

### In Scope
- React browser application.
- Client-side routing.
- Home and About pages.
- NotFound fallback.
- Doctors and Patients.
- Visual filtering.
- Generated API URLs.
- HTTP GET requests.
- JSON response display.
- Loading and error states.
- JavaScript, Java, Python, and C++ code generation.
- Express backend.
- Layered backend architecture.
- PostgreSQL-backed retrieval.

### Out of Scope
- Authentication and authorization.
- CRUD operations.
- Appointment scheduling.
- Real patient-data processing.
- Pagination, sorting, full-text search, analytics, quotas, billing.
- Saved requests.
- Automatic API schema discovery.

## 12. Assumptions

- PostgreSQL contains `doctors` and `patients` tables.
- Patient records use `doctor_id` for assigned doctors.
- Doctor availability is boolean.
- Experience, age, and payment-related values are numeric.
- Frontend doctor IDs and filter options correspond to seeded sample data.

The repository does not currently contain formal database migration files or an API schema, so these assumptions should be verified before production deployment.

## 13. Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Frontend/backend filter definitions drift | Invalid or unexpected requests | Adopt shared OpenAPI contract or generated metadata |
| Invalid filter values | Errors or incorrect results | Expand resource-specific validation |
| Large result sets | Slow database/UI responses | Add pagination, limits, and indexes |
| Inconsistent backend errors | Difficult client handling | Standardize error responses |
| Demo data mistaken for clinical data | Privacy/trust concerns | Label data as synthetic and prohibit real PII |
| Unknown frontend routes | Poor navigation experience | Use wildcard NotFound route |
| Routing mixed with API logic | Increased coupling | Keep routing in `App.jsx` and API state in `ApiExplorer` |

## 14. MVP Success Criteria

1. Home page opens the API explorer.
2. About page is reachable through client-side navigation.
3. Unknown frontend routes display NotFound.
4. Users can select Doctors or Patients.
5. Users can combine supported filters.
6. The application generates the corresponding request URL.
7. Users can execute requests and inspect JSON.
8. Loading and error states are understandable.
9. Generated code contains the same URL displayed in the explorer.
10. Backend resource handling remains separated into routes, controllers, services, and models.

## 15. Future Roadmap

1. Add a formal OpenAPI specification.
2. Add generated API documentation.
3. Add pagination and sorting.
4. Add field selection.
5. Add request history.
6. Add copy-to-clipboard and downloadable snippets.
7. Add schema and sample-response panels.
8. Add automated frontend and backend tests.
9. Add stronger security and privacy controls if the product expands beyond synthetic data.

## 16. Release Checklist

- Backend starts using documented environment variables.
- Frontend builds successfully.
- `/` loads Home.
- `/about` loads About.
- Unknown routes display NotFound.
- Root backend health route responds.
- Doctors and Patients endpoints respond with configured database.
- Documented filters produce expected behavior.
- Generated URLs contain expected parameters.
- API responses display correctly.
- Loading and error states are visible.
- Generated code contains the current request URL.
- No database secrets are committed.
- No real patient information is committed.
