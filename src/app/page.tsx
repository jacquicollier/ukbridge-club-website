'use client';

import BridgeClubMap from '@/app/components/BridgeClubMap';
import { useState } from 'react';
import TitleBar from '@/app/components/TitleBar';
import { Country, County } from '@/app/model/types';
import Form from '@/app/components/Form';
import Results from '@/app/components/Results';
import { england } from '@/app/model/england';
import { scotland } from '@/app/model/scotland';
import { wales } from '@/app/model/wales';
import { northernIreland } from '@/app/model/northern-ireland';

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCounty, setSelectedCounty] = useState<County | null>(null);

  // const claimClub = async (clubName: string) => {
  //   try {
  //     const user = await Auth.currentAuthenticatedUser();
  //     const response = await fetch('/api/claim-club', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ clubName, userId: user.username }),
  //     });
  //     const data = await response.json();
  //     alert(data.message);
  //   } catch (error) {
  //     console.error('Error claiming club', error);
  //   }
  // };

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
              pois={[...england, ...scotland, ...wales, ...northernIreland]}
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
                <Results
                  pois={[...england, ...scotland, ...wales, ...northernIreland]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
