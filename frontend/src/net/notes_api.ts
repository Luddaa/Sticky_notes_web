import { Note } from '../models/note';

// Function to handle common fetch logic
async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);

  if (response.ok) {
    return response; // If the response is OK, return the response object
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage); // If there's an error, throw an error with the error message
  }
}

// Function to fetch notes from the API
export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchData('/api/notes', { method: 'GET' });
  return response.json(); // Parse and return the JSON response
}

// Interface for creating a new note
export interface NoteInput {
  title: string;
  text?: string;
}

// Function to create a new note
export async function createNote(note: NoteInput): Promise<Note> {
  const response = await fetchData('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  return response.json(); // Parse and return the JSON response
}

// Function to delete a note by its ID
export async function deleteNote(id: string) {
  await fetchData(`/api/notes/${id}`, { method: 'DELETE' });
}
