'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CommitteeMemberGrid from '@/app/club/[subdomain]/info/committee/components/CommitteeMemberGrid';

export default function CommitteePage() {
  const router = useRouter();
  const subdomain = 'wgc';

  return (
    <div>
      <div className='flex w-screen flex-col justify-center'>
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
        <div>
          <CommitteeMemberGrid />
        </div>
      </div>

      {/*<h1>{subdomain.toUpperCase()} Bridge Club</h1>*/}
      {/*<p>Welcome to the {subdomain} Bridge Club! Join us for regular games and events.</p>*/}

      {/*/!*{isLoggedIn ? (*!/*/}
      {/*/!*  <button onClick={() => router.push(`/club/${subdomain}/edit`)}>Edit Club</button>*!/*/}
      {/*/!*) : (*!/*/}
      {/*  <button onClick={() => router.push(`${pathname}/edit`)}>Login to Edit</button>*/}
      {/*/!*)}*!/*/}
    </div>
  );
}
