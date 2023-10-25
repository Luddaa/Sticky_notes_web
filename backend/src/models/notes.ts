import { InferSchemaType, Schema, model } from "mongoose";

const notesSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
});

type Notes = InferSchemaType<typeof notesSchema>;

export default model<Notes>("Note", notesSchema);