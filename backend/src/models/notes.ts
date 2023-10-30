import { InferSchemaType, Schema, model } from "mongoose";

// Define a Mongoose schema for notes with title and text fields
const notesSchema = new Schema({
    title: { type: String, required: true },  // Title is required
    text: { type: String, required: false }, // Text is optional
});

// Infer the schema type and define it as "Notes"
type Notes = InferSchemaType<typeof notesSchema>;

// Create and export a Mongoose model for "Note" using the defined schema
export default model<Notes>("Note", notesSchema);
