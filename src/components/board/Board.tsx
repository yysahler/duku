import "./board.css";
import Region from "../Region/Region";
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewPuzzle } from '../../appSlice';
import { AppDispatch, RootState } from '../../store';
import { useEffect } from "react";

const Board: React.FC = () => {
    const { status } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchNewPuzzle(60));
    }, [dispatch]);

    return (
        <>
            {status === "succeeded" && (
                <div className="board">
                    <Region region="0,0"></Region>
                    <Region region="0,3"></Region>
                    <Region region="0,6"></Region>
                    <Region region="3,0"></Region>
                    <Region region="3,3"></Region>
                    <Region region="3,6"></Region>
                    <Region region="6,0"></Region>
                    <Region region="6,3"></Region>
                    <Region region="6,6"></Region>
                </div>
            )}
        </>
    );
};

export default Board;
