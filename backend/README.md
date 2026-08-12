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

## Project Structure

- `src/app.js` - application setup
- `src/server.js` - server entry point
- `src/routes/` - API routes
- `src/controllers/` - request handlers
- `src/services/` - business logic
- `src/models/` - data models
- `src/config/` - environment and database configuration
