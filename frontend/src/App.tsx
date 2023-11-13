import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from './styles/Notes.module.css';
import * as NotesApi from './net/notes_api';
import AddNoteDialog from './components/AddNoteDialog';
import styleUtils from './styles/utils.module.css';
import SignUpModal from './components/signupModel';
import LoginModal from './components/Loginmodel';

function App() {
  // State to store notes
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  // Load notes from the API when the component mounts
  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  // Delete a note and update the notes state
  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter(existingNote => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Container>
      {/* Button to open the "Add Note" dialog */}
      <Button
        className={`mb-4 ${styleUtils.blockCenter}`}
        onClick={() => setShowAddNoteDialog(true)}>
        Add new note
      </Button>

      {/* Display notes in a responsive grid */}
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map(note => (
          <Col key={note._id}>
            <Note
              note={note}
              className={styles.note}
              onDeleteNoteClicked={deleteNote}
              onNoteClicked={() => {}}
            />
          </Col>
        ))}
      </Row>

      {/* "Add Note" dialog */}
      {showAddNoteDialog && (
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      )}

      {
        false &&
        <SignUpModal
        onDismiss={()=>{}}
        onSignUpSuccess={()=>{}}
          />
        }
        {true &&
        <LoginModal
        onDismiss={()=>{}}
        onLoginSuccessful={()=>{}}
          />
        }
      
    </Container>
  );
}

export default App;