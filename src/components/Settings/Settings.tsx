import './settings.css';
import { useDispatch } from 'react-redux';
import { newPuzzle } from '../../appSlice';

const Settings: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <>
        <div className="settings">
            <button className='button' onClick={()=>{dispatch(newPuzzle())}}>New</button>
        </div>
        </>
    );
}

export default Settings;