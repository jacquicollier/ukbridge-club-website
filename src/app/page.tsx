'use client';

import BridgeClubMap from '@/app/components/BridgeClubMap';
import { useState } from 'react';
import { County } from '@/app/model/types';
// import { Auth } from 'aws-amplify/auth';
import TitleBar from '@/app/components/TitleBar';

export default function Home() {
  const [counties, setCounties] = useState<County[]>([]);
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
              selectedCounty={selectedCounty}
              onCountiesLoaded={setCounties}
              onSelectedCounty={setSelectedCounty}
            />
          </div>

          {/* Right Column */}
          <div className='w-1/2 bg-gray-200 p-2'>
            <label>Select County: </label>
            <select
              value={selectedCounty?.name || ''} // Ensure state controls the value
              onChange={(e) =>
                setSelectedCounty(
                  counties.find((it) => it.name === e.target.value) || null,
                )
              }
            >
              <option value='' disabled>
                Select a county
              </option>
              {counties.map((county) => (
                <option key={county.name} value={county.name}>
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
