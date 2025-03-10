'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const subdomain = 'wgc';

  return (
    <>
      <div className='flex w-full items-center justify-between bg-gray-100'>
        <div className='w-1/3 p-4 text-left'>&nbsp;</div>
        <div className='w-1/3 p-4 text-center'>
          <Link href={''}>Home</Link>
          <Link href={`/club/${subdomain}/calendar`}>Calendar</Link>
          <Link href={`/club/${subdomain}/results`}>Results</Link>
          <Link href={`/club/${subdomain}/info`}>Info</Link>
          <Link href={`/club/${subdomain}/docs`}>Docs</Link>
        </div>
        <div className='w-1/3 p-4 text-right'>
          <button
            className='border-2 p-2'
            onClick={() => router.push(`/club/${subdomain}/edit`)}
          >
            Sign In
          </button>
        </div>
      </div>
      <div className='flex w-screen justify-center bg-blue-100 p-4'>
        <div className='w-full max-w-3xl text-center text-2xl font-bold'>
          Welwyn Garden City Bridge Club
        </div>
      </div>
    </>
  );
}
