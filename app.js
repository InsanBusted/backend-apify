import express from "express";
import dotenv from "dotenv";
import tiktokRoutes from "./routes/api.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api", tiktokRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
