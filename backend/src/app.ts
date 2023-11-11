import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import notesRoutes from "./routes/notes";
import userroutes from "./routes/users";
import session from "express-session";
import MongoStore from "connect-mongo";
import env from "./util/validateEnv";
const app = express();

app.use(express.json());


app.use(session({
  secret: env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000
  },
  rolling: true,
   store: MongoStore.create({
     mongoUrl:env.MONGO_STRING,
   }),
}));

app.use("/api/notes", notesRoutes);
app.use("/api/users", userroutes);
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