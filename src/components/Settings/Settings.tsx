import './settings.css';

import { useDispatch, useSelector } from 'react-redux';
import { fetchNewPuzzle, setTilesToShow } from '../../appSlice';
import { AppDispatch, RootState } from '../../store';
import { ChangeEvent } from 'react';

const Settings: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { status, tilesToShow } = useSelector((state: RootState) => state.app);

    const handleNewPuzzle = () => {
        dispatch(fetchNewPuzzle(tilesToShow));
    };

    const handleTilesToShowChange = (evt: ChangeEvent) => {
        const target = evt.target as HTMLInputElement;
        dispatch(setTilesToShow(Number(target.value)));
    }

    return (
        <>
        <div className="settings">
            <button className='button' onClick={handleNewPuzzle} disabled={status === 'loading'}>New</button>
            <input type='number' name='tilesToShow' value={tilesToShow} min={17} max={80} onChange={handleTilesToShowChange} />
            <label htmlFor="tilesToShow">Starting Tiles</label>
        </div>
        </>
    );
}

export default Settings;

