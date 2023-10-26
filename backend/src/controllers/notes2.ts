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







// Handle a GET request to retrieve a single note
export const getNote = async (req: Request, res: Response, next: NextFunction) => {
    // Get the note ID 
    const noteId = req.params.noteid;

    try {
        // find the note in the database
        const note = await NoteModel.findById(noteId).exec();

        // Send the note to the user
        res.status(200).json(note);
    } catch (error) {
        // handle errors
        next(error);
    }
};






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



export const updateNote = async (req: Request, res: Response, next: NextFunction) => {
    const noteId = req.params.noteid;
    const newTitle = req.body.title;
    const newText = req.body.text;
    
    try {
        // find the note in the database
        const note = await NoteModel.findById(noteId).exec();
    
        if (note) {
            note.title = newTitle;
            note.text = newText;
            const updatedNote = await note.save();
    
            res.status(200).json(updatedNote);
        }
    } catch (error) {
        // Handle errors
        next(error);
    }
}
