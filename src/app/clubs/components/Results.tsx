import PoiCard from '@/app/clubs/components/PoiCard';
import { Poi } from '@/app/clubs/model/types';

const Results = (props: { pois: Poi[] }) => {
  return (
    <>
      <div className='flex flex-wrap gap-4'>
        {props.pois.map((poi) => (
          <PoiCard key={poi.key} poi={poi}></PoiCard>
        ))}
      </div>
    </>
  );
};

export default Results;
