'use client';

import { Country, County } from '@/app/model/map/types';
import { useEffect, useState } from 'react';

const Form = (props: {
  selectedCountry: Country | null;
  selectedCounty: County | null;
  onSelectCountry: (country: Country | null) => void;
  onSelectCounty: (county: County | null) => void;
}) => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/clubs/countries`,
        {
          cache: 'force-cache',
        },
      );
      if (!response.ok) throw new Error('Failed to fetch countries');
      setCountries((await response.json()) as Country[]);
    };

    fetchCountries();
  }, []);

  return (
    <div className='rounded-lg border border-gray-300 bg-white p-4 shadow-md'>
      <h3 className='mb-3 border-b pb-2 text-lg font-semibold'>
        Find a Bridge Club
      </h3>

      <div className='flex flex-col gap-2'>
        {/* Country Dropdown */}
        <div className='flex items-center gap-2'>
          <label className='w-20 font-medium'>Country:</label>
          <select
            className='grow rounded border border-gray-300 p-2'
            value={props.selectedCountry?.id || ''}
            onChange={(e) => {
              const country =
                countries.find((c) => c.id === e.target.value) || null;
              props.onSelectCountry(country);
              props.onSelectCounty(null);
            }}
          >
            <option value=''>Any</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* Show county dropdown only if a country is selected */}
        {props.selectedCountry && (
          <div className='flex items-center gap-2'>
            <label className='w-20 font-medium'>County:</label>
            <select
              className='grow rounded border border-gray-300 p-2'
              value={props.selectedCounty?.id || ''}
              onChange={(e) => {
                const county =
                  props.selectedCountry?.counties.find(
                    (c) => c.id === e.target.value,
                  ) || null;
                props.onSelectCounty(county);
              }}
            >
              <option value=''>Any</option>
              {props.selectedCountry?.counties.map((county) => (
                <option key={county.id} value={county.id}>
                  {county.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
