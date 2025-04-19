import Region from "../Region/Region";
import "./board.css";

const Board = () => {
    return (
        <>
            <div className="board">
                <Region region="Aa"></Region>
                <Region region="Ab"></Region>
                <Region region="Ac"></Region>
                <Region region="Ba"></Region>
                <Region region="Bb"></Region>
                <Region region="Bc"></Region>
                <Region region="Ca"></Region>
                <Region region="Cb"></Region>
                <Region region="Cc"></Region>
            </div>
        </>
    );
};

export default Board;
