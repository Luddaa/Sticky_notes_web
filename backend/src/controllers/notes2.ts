import { Request, Response, NextFunction } from "express";
import NoteModel from "../models/notes";


export const getNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notes = await NoteModel.find().exec();
      res.status(200).json(notes);
    } catch (error) {
      next(error);
    }
  }
