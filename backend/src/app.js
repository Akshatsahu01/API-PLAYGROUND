import express from "express";
import cors from "cors";
import doctorRoutes from "./routes/doctorRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import fakeApiRoutes from "./routes/fakeApiRoutes.js";

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
app.use("/api/patients", patientRoutes);
app.use("/api/fake-apis", fakeApiRoutes);

export default app;
