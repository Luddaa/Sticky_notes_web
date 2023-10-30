
import React from 'react';
import { Card } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';

import styles from '../styles/Note.module.css';
import styleUtils from '../styles/utils.module.css';
import { Note as NoteModel } from '../models/note';

interface NoteProps {
  note: NoteModel;
  className?: string;
  onDeleteNoteClicked: (note: NoteModel) => void;
  onNoteClicked: (note: NoteModel) => void;
}

const Note: React.FC<NoteProps> = ({ note, className, onDeleteNoteClicked, onNoteClicked }) => {
  const { title, text } = note;

  const handleDeleteClick = (e: React.MouseEvent) => {
    onDeleteNoteClicked(note);
    e.stopPropagation();
  };

  return (
    <Card className={`${styles.noteCard} ${className}`} onClick={() => onNoteClicked(note)}>
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {title}
          <MdDelete className="text-muted ms-auto" onClick={handleDeleteClick} />
        </Card.Title>
        <Card.Text className={styles.cardText}>
          {text}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Note;