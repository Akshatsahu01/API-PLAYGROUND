import express from "express";
import cors from "cors";

import doctorRoutes from "./routes/doctorRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";

import productRoutes from "./routes/productRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import postRoutes from "./routes/postRoutes.js";

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


app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);

app.use("/api/products", productRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/posts", postRoutes);

export default app;