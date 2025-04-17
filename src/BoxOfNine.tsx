import NumberBox from "./NumberBox";

const BoxOfNine = () => {
  return (
    <>
      <div className="box-of-nine-row">
        <NumberBox></NumberBox>
        <NumberBox></NumberBox>
        <NumberBox></NumberBox>
      </div>
      <div className="box-of-nine-row">
        <NumberBox></NumberBox>
        <NumberBox></NumberBox>
        <NumberBox></NumberBox>
      </div>
      <div className="box-of-nine-row">
        <NumberBox></NumberBox>
        <NumberBox></NumberBox>
        <NumberBox></NumberBox>
      </div>
    </>
  )
}

export default BoxOfNine;