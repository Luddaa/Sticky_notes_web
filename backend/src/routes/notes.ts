import express from "express";
import * as Notescontroller from "../controllers/notes2";

const routes = express.Router();

// GET request to retrieve all notes
routes.get("/", Notescontroller.getNotes);

// GET request to retrieve a specific note by ID
routes.get("/:noteid", Notescontroller.getNote);

// POST request to create a new note
routes.post("/", Notescontroller.createNotes);

// PATCH request to update a specific note by ID
routes.patch("/:noteid", Notescontroller.updateNote);

// DELETE request to delete a specific note by ID
routes.delete("/:noteid", Notescontroller.deleteNote);

export default routes;