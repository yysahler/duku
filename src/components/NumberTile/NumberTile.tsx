import { useState } from 'react';
import './number-tile.css';
import Note from '../Note/Note';
import Entry from '../Entry/Entry';

const NumberTile: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    console.log('this was clicked');
    setIsActive(!isActive);
  }

  return (
    <>
      <div className={isActive ? 'number-tile isActive' : 'number-tile'} onClick={handleClick}>
        {[1,2,3,4].map(e => <Note position={e} key={e} />)}
          <Entry />
        {[5,6,7,8].map(e => <Note position={e} key={e} />)}
      </div>
    </>
  )
}

export default NumberTile;