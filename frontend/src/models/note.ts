export interface Note {
    _id: string;        // Unique identifier for the note
    title: string;      // Title of the note
    text: string;       // Content or text of the note
    createdAt: Date;    // Date and time when the note was created
    updatedAt: Date;    // Date and time when the note was last updated
  }
  