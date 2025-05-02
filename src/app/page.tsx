'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@aws-amplify/ui-react';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Button onClick={() => router.push('/clubs')}>Find A Club</Button>
    </>
  );
}
