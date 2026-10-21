import express from "express";
import cors from "cors";

import doctorRoutes from "./routes/doctorRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";

import productRoutes from "./routes/productRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import practiceApiRoutes from "./routes/practiceApiRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "API Playground Backend Running 🚀",
  });
});

// This generic practice routes  handle  47 API endpoitns
app.use("/api", practiceApiRoutes);

app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);

app.use("/api/products", productRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/posts", postRoutes);

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({
      success: false,
      message: "Request body is invalid; send valid JSON.",
    });
  }
  return next(error);
});

export default app;
