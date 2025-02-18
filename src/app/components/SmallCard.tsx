import { Card } from '@aws-amplify/ui-react';
import { Poi } from '@/app/model/types';
import Image from 'next/image';

const SmallCard = (props: { poi: Poi }) => {
  return (
    <Card className='relative flex w-64 cursor-pointer flex-col overflow-hidden rounded-lg border shadow-lg'>
      {/* Heading with Image */}
      <div className='flex items-center justify-between bg-gray-100 p-2'>
        <h3 className='text-lg font-semibold'>{props.poi.key}</h3>
        <Image
          src={`/affiliation-logos/${props.poi.affiliations[0]}.png`}
          alt='EBU Logo'
          width={32}
          height={32}
          className='object-contain'
        />
      </div>

      {/* Card Content */}
      <div className='p-2'>{props.poi.key}</div>
    </Card>
  );
};

export default SmallCard;
