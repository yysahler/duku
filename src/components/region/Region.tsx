import Number from '../NumberTile/NumberTile';
import './region.css';

type RegionProps = {
  region: string
}

const Region: React.FC<RegionProps> = ({ region }) => {
  return (
    <>
      <div className='region'>
        <Number></Number>
        <Number></Number>
        <Number></Number>
        <Number></Number>
        <Number></Number>
        <Number></Number>
        <Number></Number>
        <Number></Number>
        <Number></Number>
      </div>
    </>
  )
}

export default Region;