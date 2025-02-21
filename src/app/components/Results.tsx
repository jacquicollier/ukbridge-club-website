import SmallCard from '@/app/components/SmallCard';
import { Poi } from '@/app/model/types';

const Results = (props: { pois: Poi[] }) => {
  return (
    <>
      <div className='flex flex-wrap gap-4'>
        {props.pois.map((poi) => (
          <SmallCard key={poi.key} poi={poi}></SmallCard>
        ))}
      </div>
    </>
  );
};

export default Results;
