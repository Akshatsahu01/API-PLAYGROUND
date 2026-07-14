import express from "express";
import cors from "cors";
import doctorRoutes from "./routes/doctorRoutes.js";
import patientRoutes from "./routes/patientRoutes.js"

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "API Playground Backend Running 🚀",
  });
});
app.use("/api/doctors", doctorRoutes);
app.use("/api/patient",patientRoutes)

export default app;