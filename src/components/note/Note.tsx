import './note.css'

type NoteProps = {
  position: number;
}

const Note: React.FC<NoteProps> = ({ position }) => {
  return (
    <>
      <div className="note">
        <span className='note-value'>
          {position}
        </span>
      </div>
    </>
  );
}

export default Note;