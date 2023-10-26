import express from "express";
import * as Notescontroller from "../controllers/notes2";

const routes = express.Router();


routes.get("/", Notescontroller.getNotes); 

export default routes;