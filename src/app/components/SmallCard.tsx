import { Card } from '@aws-amplify/ui-react';
import { Poi } from '@/app/model/types';

const SmallCard = (props: { poi: Poi }) => {
  return (
    <>
      <Card className='relative flex w-64 cursor-pointer flex-col overflow-hidden rounded-lg border shadow-lg'>
        {props.poi.key}
      </Card>
    </>
  );
};

export default SmallCard;
