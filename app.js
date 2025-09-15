import https from "https";
import fs from "fs";
import express from "express";
import dotenv from "dotenv";
import tiktokRoutes from "./routes/api.js";
import cors from "cors";
import { swaggerUi, specs } from "./swagger.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", tiktokRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// HTTPS
const PORT = process.env.PORT || 5000;
const sslOptions = {
  key: fs.readFileSync("/etc/letsencrypt/live/api.ratcs.my.id/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/api.ratcs.my.id/fullchain.pem")
};

https.createServer(sslOptions, app).listen(PORT, '0.0.0.0', () => {
  console.log(`HTTPS Server running on port ${PORT}`);
});
