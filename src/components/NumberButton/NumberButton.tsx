import './number-button.css';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../../store';
import { keyPadEntry } from '../../appSlice';

type NumberButtonProps = {
  value: number;
};

const NumberButton: React.FC<NumberButtonProps> = ({ value }) => {
  const { activeTile } = useSelector((state: RootState) => state.app);
  let classList = 'button number-button';
  if (activeTile?.value === 0) {
    classList += ' can-be-clicked';
  }

  const dispatch = useDispatch<AppDispatch>();
  const handleClick = () => {
    dispatch(keyPadEntry(value));
  }

  return (
    <>
    <div className={classList} onClick={handleClick}>
      <span>
      {value}
      </span>
    </div>
    </>
  );
}

export default NumberButton;