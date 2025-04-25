import './entry.css';

type EntryProps = {
  value: number;
};

const Entry: React.FC<EntryProps> = ({ value }) => {
  return (
    <>
      <div className='entry'>
        <div className='entry-value'>
          <span className={value === 0 ? 'entry-is-zero' : ''}>
            {value}
          </span>
        </div>
      </div>
    </>
  );
}

export default Entry;