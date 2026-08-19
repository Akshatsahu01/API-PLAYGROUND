# API Playground

API Playground is a simple website for trying a healthcare API.

You can:

- View doctor and patient data.
- Filter the data using simple dropdowns.
- See the final API URL.
- View the API response as JSON.
- Generate example code in JavaScript, Java, Python, and C++.

## Technologies Used

### Frontend

- React
- Vite
- CSS

### Backend

- Node.js
- Express
- PostgreSQL
- `pg` for connecting to PostgreSQL

## Project Structure

```text
API-PLAYGROUND/
├── backend/       Backend API and database connection
├── frontend/      React user interface
├── Docs/          HLD, LLD, and PRD documents
└── README.md      Project documentation
```

## How the Project Works

1. The user opens the React frontend.
2. The user selects Doctors or Patients.
3. The user selects one or more filters.
4. The frontend creates an API URL with the selected filters.
5. The backend receives the request.
6. The backend gets matching records from PostgreSQL.
7. The frontend displays the returned JSON data.

## Requirements

Install these before running the project:

- Node.js and npm
- PostgreSQL database

## Backend Setup

Open a terminal in the project folder and run:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT=3000
DB_HOST=your_database_host
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
```

Start the backend in development mode:

```bash
npm run dev
```

The backend runs at:

```text
http://localhost:3000
```

## Frontend Setup

Open another terminal and run:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

Open the URL shown by Vite, usually:

```text
http://localhost:5173
```

## API Endpoints

### Check the backend

```http
GET /
```

### Get doctors

```http
GET /api/doctors
```

Doctor filters:

- `specialization`
- `availability`
- `experience`

Example:

```text
http://localhost:3000/api/doctors?specialization=Cardiologist&availability=Available
```

### Get patients

```http
GET /api/patients
```

Patient filters:

- `gender`
- `age`
- `doctorAssigned`
- `amountToBePaid`
- `sickness`

Example:

```text
http://localhost:3000/api/patients?gender=Female&age=19-30
```

## Available Filter Values

### Doctors

- Specialization: `Cardiologist`, `Dermatologist`, `Neurologist`, `Orthopedic`
- Availability: `Available`, `Unavailable`
- Experience: `+1`, `+3`, `+5`, `+10`

### Patients

- Gender: `Male`, `Female`, `Other`
- Age: `0-18`, `19-30`, `31-50`, `50+`
- Sickness: `Diabetes`, `Fever`, `Cancer`, `COVID-19`
- Payment: `< ₹1000`, `₹1000 - ₹5000`, `> ₹5000`

## Useful Commands

Run these commands inside the `backend` or `frontend` folder as appropriate:

```bash
npm install       # Install packages
npm run dev       # Start development server
npm run build     # Build the frontend for production
npm run lint      # Check frontend code
```

The backend also has:

```bash
npm start         # Start the backend without nodemon
```

## Important Notes

- Start the backend before using the frontend.
- Make sure PostgreSQL is running and contains the `doctors` and `patients` tables.
- Do not commit `.env` files or database passwords.
- This project is currently read-only. It does not create, update, or delete records.
- Use sample data only. Do not add real patient information.

## More Documentation

- [High-Level Design](Docs/HLD.md)
- [Low-Level Design](Docs/LLD.md)
- [Product Requirements Document](Docs/PRD.md)
