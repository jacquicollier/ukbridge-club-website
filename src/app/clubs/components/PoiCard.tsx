'use client';

import { Card } from '@aws-amplify/ui-react';
import Image from 'next/image';
import { Poi } from '@/app/clubs/model/types';
import { useEffect, useState } from 'react';
import { Affiliation } from '@/app/clubs/model/constants';

const PoiCard = ({ poi }: { poi: Poi }) => {
  const [affiliations, setAffiliations] = useState<Record<string, Affiliation>>(
    {},
  );

  useEffect(() => {
    const fetchAffiliations = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/clubs/affiliations`,
        {
          cache: 'force-cache',
        },
      );
      if (!response.ok) throw new Error('Failed to fetch affiliations');
      setAffiliations(await response.json());
    };

    fetchAffiliations();
  }, []);

  const getAffiliationInfo = (
    affiliationKey: string,
    subdivisionKey?: string,
  ) => {
    const affiliation = affiliations[affiliationKey];
    if (!affiliation) return null;

    if (subdivisionKey) {
      return affiliation.subdivisions?.[subdivisionKey] || null;
    }

    return affiliation;
  };

  return (
    <Card className='relative flex w-64 cursor-pointer flex-col overflow-hidden rounded-lg border shadow-lg'>
      {/* Heading with Image */}
      <div className='flex items-center justify-between bg-gray-100 p-2'>
        <h3 className='text-lg font-semibold'>{poi.key}</h3>
        <div>
          {poi.affiliations.map((affiliation) => (
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
      <div className='p-2'>{poi.key}</div>
    </Card>
  );
};

export default PoiCard;
