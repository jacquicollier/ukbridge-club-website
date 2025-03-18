import { Card } from '@aws-amplify/ui-react';
import { Poi } from '@/app/model/types';
import Image from 'next/image';
import { affiliations } from '@/app/model/constants';

const PoiCard = (props: { poi: Poi }) => {
  const getAffiliationInfo = (
    affiliationKey: string,
    subdivisionKey?: string,
  ): { name: string; website: string } | null => {
    const affiliation = affiliations[affiliationKey];

    if (!affiliation) return null;

    if (subdivisionKey) {
      const subdivision = affiliation.subdivisions?.[subdivisionKey];
      if (subdivision) {
        return { name: subdivision.name, website: subdivision.website };
      }
      return null;
    }

    return { name: affiliation.name, website: affiliation.website };
  };

  return (
    <Card className='relative flex w-64 cursor-pointer flex-col overflow-hidden rounded-lg border shadow-lg'>
      {/* Heading with Image */}
      <div className='flex items-center justify-between bg-gray-100 p-2'>
        <h3 className='text-lg font-semibold'>{props.poi.key}</h3>
        <div>
          {props.poi.affiliations.map((affiliation) => (
            <div key={affiliation.name} className='flex items-center'>
              {affiliation.type === 'uk-federation' &&
                affiliation.subdivision && (
                  <a
                    href={
                      getAffiliationInfo(
                        affiliation.name,
                        affiliation.subdivision,
                      )?.website
                    }
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Image
                      src={`https://images.ukbridge.club/${affiliation.name}/${affiliation.subdivision}.png`}
                      alt={`${affiliation.subdivision} Logo`}
                      width={32}
                      height={32}
                      className='object-contain'
                      title={`${getAffiliationInfo(affiliation.name, affiliation.subdivision)?.name}`}
                    />
                  </a>
                )}
              <a
                href={getAffiliationInfo(affiliation.name)?.website}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Image
                  src={`https://images.ukbridge.club/${affiliation.name}.png`}
                  alt={`${affiliation.name} Logo`}
                  width={32}
                  height={32}
                  className='object-contain'
                  title={`${getAffiliationInfo(affiliation.name)?.name}`}
                />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Card Content */}
      <div className='p-2'>{props.poi.key}</div>
    </Card>
  );
};

export default PoiCard;
