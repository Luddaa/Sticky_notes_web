
import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import {MdDelete} from 'react-icons/md';



interface NoteProps {
    note: NoteModel,
    className?: string,
    onDeleteNoteClicked: (note: NoteModel) =>void, 
    onNoteClicked: (note: NoteModel) => void
}

const Note = ({ note, className, onDeleteNoteClicked, onNoteClicked }: NoteProps) => {
    const {
        title,
        text,
    } = note;



    return (
        <Card
            className={`${styles.noteCard} ${className}`}
            onClick={() => onNoteClicked(note)}>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {title}
                    <MdDelete
                        className="text-muted ms-auto"
                        onClick={(e) => {
                            onDeleteNoteClicked(note);
                            e.stopPropagation();
                        }}
                    />
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Note;