import { Request, Response, NextFunction } from "express";
import NoteModel from "../models/notes";

// Handle GET requests to get a list of notes
export const getNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get notes from the database
        const notes = await NoteModel.find().exec();

        // Send the notes to the user
        res.status(200).json(notes);
    } catch (error) {
        // Handle errors
        next(error);
    }
}

// Handle POST requests to create a new note
export const createNotes = async (req: Request, res: Response, next: NextFunction) => {
    const { title, text } = req.body;
    
    try {
        // create a new note in the database
        const newNote = await NoteModel.create({ title, text });

        // Send the new note to the user
        res.status(201).json(newNote);
    } catch (error) {
        // Handle errors
        next(error);
    }
}
