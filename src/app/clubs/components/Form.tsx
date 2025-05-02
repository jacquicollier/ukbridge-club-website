'use client';

import { Country, County } from '@/app/clubs/model/types';
import { useEffect, useState } from 'react';

const Form = (props: {
  postcode: string;
  selectedCountry: Country | null;
  selectedCounty: County | null;
  onSelectCountry: (country: Country | null) => void;
  onSelectCounty: (county: County | null) => void;
  onPostcodeChange: (postcode: string) => void;
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [postcode, setPostcode] = useState<string>(props.postcode);

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

      <div className='flex flex-col gap-3'>
        {/* Postcode Input */}
        <div className='flex items-center gap-2'>
          <label className='w-20 font-medium'>Postcode:</label>
          <input
            type='text'
            className='grow rounded border border-gray-300 p-2'
            placeholder='Enter postcode'
            value={postcode || ''}
            onChange={(e) => setPostcode(e.target.value)}
          />
          <button
            className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
            onClick={() => props.onPostcodeChange(postcode)}
            disabled={postcode.length < 3}
          >
            Search
          </button>
        </div>

        <div className='flex items-center gap-2'>
          <div className='w-20 font-medium'>Or</div>
          <hr className='grow border-gray-300' />
        </div>

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
