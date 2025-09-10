import serverless from "serverless-http";
import express from "express";
import dotenv from "dotenv";
import tiktokRoutes from "../routes/api.js";
import cors from "cors";
import { swaggerUi, specs } from "../swagger.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", tiktokRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

export default serverless(app);
