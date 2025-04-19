import './number-button.css';

type NumberButtonProps = {
  onClickFn: Function;
  value: number;
};

const NumberButton: React.FC<NumberButtonProps> = ({ onClickFn, value }) => {
  return (
    <>
    <div className='button number-button'>
      <span>
      {value}
      </span>
    </div>
    </>
  );
}

export default NumberButton;