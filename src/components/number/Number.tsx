import './number.css';
import Note from '../note/Note';
import Entry from '../entry/Entry';

const Number: React.FC = () => {
  return (
    <>
      <div className='number'>
        {[0,1,2,3].map(e => <Note position={e} key={e} />)}
          <Entry />
        {[4,5,6,7].map(e => <Note position={e} key={e} />)}
      </div>
    </>
  )
}

export default Number;