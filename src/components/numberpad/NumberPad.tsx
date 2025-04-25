import "./number-pad.css";
import NumberButton from "../NumberButton/NumberButton";
import { AppDispatch, RootState } from "../../store";
import { type EntryMode, entryModeChange } from "../../appSlice";
import { useDispatch, useSelector } from "react-redux";

const NumberPad: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const handleClick = (mode: EntryMode) => {
        dispatch(entryModeChange(mode));
    };
    const { entryMode } = useSelector((state: RootState) => state.app);

    return (
        <>
            <div className="number-pad">
                <div
                    className={entryMode === 'pen' ? 'button mode-button is-active' : 'button mode-button'}
                    onClick={() => {
                        handleClick("pen");
                    }}
                >
                    <span>Pen</span>
                </div>
                <div
                    className={entryMode === 'pencil' ? 'button mode-button is-active' : 'button mode-button'}
                    onClick={() => {
                        handleClick("pencil");
                    }}
                >
                    <span>Pencil</span>
                </div>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                    <NumberButton value={i} key={i} />
                ))}
            </div>
        </>
    );
};

export default NumberPad;
