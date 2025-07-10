// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./src/routes/index.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Backend is working!");
});

app.use("/api/v1", routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

// error handler
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message });
});
