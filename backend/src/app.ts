import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import NoteModel from "./models/notes";

const app = express();

// Middleware to handle the root path ("/")
app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
});

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
