'use client';

import BridgeClubMap from '@/app/components/map/BridgeClubMap';
import { useEffect, useState } from 'react';
import TitleBar from '@/app/components/TitleBar';
import { Country, County, Poi } from '@/app/model/map/types';
import Form from '@/app/components/map/Form';
import Results from '@/app/components/map/Results';

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCounty, setSelectedCounty] = useState<County | null>(null);
  const [pois, setPois] = useState<Poi[]>([]);

  useEffect(() => {
    const fetchPois = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/clubs?country=${selectedCountry!.id}&county=${selectedCounty!.id}`,
        {
          cache: 'force-cache',
        },
      );
      if (!response.ok) throw new Error('Failed to fetch countries');
      setPois((await response.json()) as Poi[]);
    };

    if (selectedCountry && selectedCounty) {
      fetchPois();
    }
  }, [selectedCountry, selectedCounty]);

  return (
    <>
      <div className='flex min-h-screen flex-col'>
        <div className='sticky top-0 z-10 bg-white shadow-md'>
          <TitleBar />
        </div>

        <div className='flex flex-1'>
          {/* Left Column */}
          <div className='w-1/2 bg-gray-100 p-2'>
            <BridgeClubMap
              pois={pois}
              selectedCountry={selectedCountry}
              selectedCounty={selectedCounty}
            />
          </div>

          {/* Right Column */}
          <div className='w-1/2 bg-gray-200 p-2'>
            <div className='flex h-screen flex-col'>
              {/* First Row: Form */}
              <div className='bg-gray-200 pb-2'>
                <Form
                  selectedCountry={selectedCountry}
                  onSelectCountry={setSelectedCountry}
                  selectedCounty={selectedCounty}
                  onSelectCounty={setSelectedCounty}
                />
              </div>

              {/* Second Row: Results (Takes up remaining space) */}
              <div className='grow flex-row overflow-auto bg-white p-4'>
                <Results pois={pois} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
