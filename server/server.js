
import "dotenv/config";
import express from "express";
import cors from "cors";
import threadsRouter from "./routes/threads.js";
import prisma from "./prisma/client.js";

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/threads", threadsRouter);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Threadbase API is running!" });
});

const PORT = 3001;

async function startServer() {
  try {
    // Connect to PostgreSQL using Prisma
    await prisma.$connect();

    console.log("Prisma connected successfully to PostgreSQL");

    app.listen(PORT, () => {
      console.log(`Threadbase API running on http://localhost:${PORT}`);
      console.log("API endpoint: http://localhost:3001/api/threads");
    });
  } catch (error) {
    console.error("Failed to connect Prisma:", error);
    process.exit(1);
  }
}

startServer();
