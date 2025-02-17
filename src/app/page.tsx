'use client';

import BridgeClubMap from '@/app/components/BridgeClubMap';
import { useState } from 'react';
import TitleBar from '@/app/components/TitleBar';
import { Country, County } from '@/app/model/types';
import { countries } from '@/app/model/countries';

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
        <TitleBar />

        <div className='flex flex-1'>
          {/* Left Column */}
          <div className='w-1/2 bg-gray-100 p-2'>
            <BridgeClubMap
              selectedCountry={selectedCountry}
              selectedCounty={selectedCounty}
            />
          </div>

          {/* Right Column */}
          <div className='w-1/2 bg-gray-200 p-2'>
            <label>Select County: </label>

            {/* Country Dropdown */}
            <select
              value={selectedCountry?.id || ''}
              onChange={(e) => {
                const country =
                  countries.find((c) => c.id === e.target.value) || null;
                setSelectedCountry(country);
                setSelectedCounty(null); // Reset county when country changes
              }}
            >
              <option value=''>Any</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>

            {/* County Dropdown */}
            <select
              value={selectedCounty?.id || ''}
              onChange={(e) => {
                const county =
                  selectedCountry?.counties.find(
                    (c) => c.id === e.target.value,
                  ) || null;
                setSelectedCounty(county);
              }}
              disabled={!selectedCountry} // Disable until a country is selected
            >
              <option value=''>Any</option>
              {selectedCountry?.counties.map((county) => (
                <option key={county.id} value={county.id}>
                  {county.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
