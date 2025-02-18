import SmallCard from '@/app/components/SmallCard';
import { Poi } from '@/app/model/types';

const Results = (props: { pois: Poi[] }) => {
  return (
    <>
      <div className='flex flex-wrap gap-4'>
        {' '}
        {/* Flex container for multiple cards */}
        {props.pois.map(
          (
            poi, // Replace with your actual data
          ) => (
            <SmallCard key={poi.key} poi={poi}></SmallCard>
          ),
        )}
      </div>
    </>
  );
};

export default Results;
