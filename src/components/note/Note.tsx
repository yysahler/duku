import './note.css'

type NoteProps = {
  value: number;
}

const Note: React.FC<NoteProps> = ({ value }) => {
  return (
    <>
      <div className={value === 0 ? 'note note-hidden' : 'note'}>
        <span className='note-value'>
          {value}
        </span>
      </div>
    </>
  );
}

export default Note;