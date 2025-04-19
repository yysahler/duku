import NumberButton from "../NumberButton/NumberButton";
import "./number-pad.css";

const NumberPad = () => {
    return (
        <>
            <div className="number-pad">
            <div className="button">Pen</div>
            <div className="button">Pencil</div>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                    <NumberButton onClickFn={() => {}} value={i} key={i} />
                ))}
            </div>
        </>
    );
};

export default NumberPad;
