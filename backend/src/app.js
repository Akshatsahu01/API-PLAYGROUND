import express from "express";
import cors from "cors";
import doctorRoutes from "./routes/doctorRoutes.js";

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

export default app;