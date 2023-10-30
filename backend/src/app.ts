import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import notesRoutes from "./routes/notes";
import userRoutes from "./routes/user";

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);

app.use("/api/notes", notesRoutes);

// Middleware for handling endpoints not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Generic error handling middleware
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  const errorMessage = error instanceof Error ? error.message : "Internal server error";
  res.status(500).json({ error: errorMessage });
});

export default app;
