import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import notesRoutes from "./routes/notes";

const app = express();

app.use("/api/notes", notesRoutes);

// Middleware for handling endpoints not found
app.use((req: Request, res: Response, next: NextFunction) => {
  next(Error("Endpoint not found"));
});

// Generic error handling middleware
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  const errorMessage = error instanceof Error ? error.message : "Internal server error";
  res.status(500).json({ error: errorMessage });
});

export default app;
