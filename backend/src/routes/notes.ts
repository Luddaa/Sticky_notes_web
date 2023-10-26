import express from "express";
import * as Notescontroller from "../controllers/notes2";

const routes = express.Router();


routes.get("/", Notescontroller.getNotes); 

routes.get("/:noteid", Notescontroller.getNote);

routes.post("/", Notescontroller.createNotes);

routes.patch("/:noteid", Notescontroller.updateNote);

routes.delete("/:noteid", Notescontroller.deleteNote);

export default routes;