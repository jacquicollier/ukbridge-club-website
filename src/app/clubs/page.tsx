'use client';

import BridgeClubMap from '@/app/clubs/components/BridgeClubMap';
import { useEffect, useState } from 'react';
import TitleBar from '@/app/components/TitleBar';
import { Country, County, Poi } from '@/app/clubs/model/types';
import Form from '@/app/clubs/components/Form';
import Results from '@/app/clubs/components/Results';

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCounty, setSelectedCounty] = useState<County | null>(null);
  const [postcode, setPostcode] = useState<string>('');
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

    if (selectedCountry || selectedCounty) {
      setPostcode('');
    }

    if (selectedCountry && selectedCounty) {
      fetchPois();
    }
  }, [selectedCountry, selectedCounty]);

  useEffect(() => {
    const fetchPoisForPostcode = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/clubs?postcode=${encodeURIComponent(postcode!)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}`,
        {
          cache: 'force-cache',
        },
      );
      if (!response.ok) throw new Error('Failed to fetch countries');
      setPois((await response.json()) as Poi[]);
    };

    if (postcode) {
      setSelectedCountry(null);
      setSelectedCounty(null);
      fetchPoisForPostcode();
    }
  }, [postcode]);

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
                  postcode={postcode}
                  selectedCountry={selectedCountry}
                  onSelectCountry={setSelectedCountry}
                  selectedCounty={selectedCounty}
                  onSelectCounty={setSelectedCounty}
                  onPostcodeChange={setPostcode}
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
