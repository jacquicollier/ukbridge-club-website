'use client';

import { generateClient } from 'aws-amplify/api';
import { listClubs } from '@/graphql/queries';
import { useEffect, useState } from 'react';
import type { Club } from '@/graphql/types';

export default function Clubs() {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    async function fetchClubs() {
      try {
        const client = generateClient();
        const response = await client.graphql({ query: listClubs });
        const clubsData = response.data.listClubs.items;
        setClubs(clubsData);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    }
    fetchClubs();
  }, []);

  return (
    <div>
      <h2>Clubs List</h2>
      <ul>
        {clubs.map((club) => (
          <li key={club.id}>{club.name}</li>
        ))}
      </ul>
    </div>
  );
}
