import dotenv from "dotenv";
dotenv.config();

import https from "https";
import fs from "fs";
import express from "express";
import tiktokRoutes from "./routes/api.js";
import uploadRoutes from "./routes/upload.js";
import cors from "cors";

const app = express();

app.use(cors({
  origin: ["https://www.ratcs.my.id"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use("/api", tiktokRoutes);
app.use("/api/upload", uploadRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});


// HTTPS
const PORT = process.env.PORT || 5000;
const sslOptions = {
  key: fs.readFileSync("/etc/letsencrypt/live/api.ratcs.my.id/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/api.ratcs.my.id/fullchain.pem")
};


https.createServer(sslOptions, app).listen(PORT, '0.0.0.0', () => {
  console.log(`HTTPS Server running on port ${PORT}`);
});

