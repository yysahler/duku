import "./region.css";
import NumberTile from "../NumberTile/NumberTile";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

type RegionProps = {
    region: string;
};

const Region: React.FC<RegionProps> = ({ region }) => {
    const { puzzle } = useSelector((state: RootState) => state.app);

    const rowStart = Number(region.split(',')[0]);
    const colStart = Number(region.split(',')[1]);
    const numbers = [];
    

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const row = rowStart + i;
        const col = colStart + j;
        const value = puzzle[row][col];
        numbers.push({
          row: row,
          col: col,
          value: value,
        });
      }
    }

    return (
        <>
            <div className="region">
              {numbers.map((num, i) => <NumberTile value={num.value} row={num.row} col={num.col} key={`${num.row},${num.col}`} />)}
            </div>
        </>
    );
};

export default Region;
