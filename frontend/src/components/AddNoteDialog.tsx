import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Note } from '../models/note';
import { NoteInput } from '../net/notes_api';
import * as NotesApi from '../net/notes_api';

interface AddNoteDialogProps {
  onDismiss: () => void; // Function to close the dialog
  onNoteSaved: (note: Note) => void; // Function to handle saving a new note
}

const AddNoteDialog = ({ onDismiss, onNoteSaved }: AddNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>();

  // Function to handle form submission
  async function onSubmit(input: NoteInput) {
    try {
      const noteResponse = await NotesApi.createNote(input); // Create a new note
      onNoteSaved(noteResponse); // Call the callback to save the new note
    } catch (error) {
      console.error(error);
      alert(error); // Display an error alert if there's an issue
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Add Note</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              isInvalid={!!errors.title}
              {...register('title', { required: 'Required' })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control as="textarea" rows={5} placeholder="Text" {...register('text')} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" form="addNoteForm" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNoteDialog;
