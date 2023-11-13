
import { Note } from '../models/note';
import { User } from '../models/user';

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

export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData('/api/users', { method: 'GET' });
  return response.json(); // Parse and return the JSON response
}

export interface SignUpBody {
  username: string;
  email: string;
  password: string;
}

export async function signUp(body: SignUpBody): Promise<User> {
  const response = await fetchData('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json(); // Parse and return the JSON response
}

export interface LoginBody {
  username: string;
  password: string;
}

export async function login(body: LoginBody): Promise<User> {
  const response = await fetchData('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json(); // Parse and return the JSON response
}


export async function logout(): Promise<void> {
  await fetchData('/api/users/logout', { method: 'POST' });
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
