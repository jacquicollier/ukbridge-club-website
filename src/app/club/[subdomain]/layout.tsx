'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, Transition } from '@headlessui/react';
import { Menu as MenuIcon, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function ClubLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const subdomain = 'wgc';

  return (
    <div className='flex w-screen flex-col justify-center'>
      {/* Full-width banner with centered club name */}
      <div className='relative flex w-full items-center justify-center bg-blue-100 p-4'>
        <div className='text-2xl font-bold'>Welwyn Garden City Bridge Club</div>
        <button
          className='absolute right-4 rounded-lg border-2 bg-blue-700 p-2 text-white hover:bg-blue-800'
          onClick={() => router.push(`/club/${subdomain}/edit`)}
        >
          Sign In
        </button>
      </div>

      <div>
        {/* Mobile Navbar (Hamburger) */}
        <div className='flex w-full items-center justify-between bg-blue-700 p-4 text-white md:hidden'>
          <div className='text-xl font-bold'>Menu</div>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className='size-6' />
            ) : (
              <MenuIcon className='size-6' />
            )}
          </button>
        </div>

        {/* Mobile Menu Items */}
        {isOpen && (
          <div className='flex flex-col bg-blue-700 p-2 text-white md:hidden'>
            <Link href={`/club/${subdomain}`}>Home</Link>
            <Link href={`/club/${subdomain}/calendar`}>Calendar</Link>
            <Dropdown title='Results'>
              <Link href={`/club/${subdomain}/results/sessions`}>Sessions</Link>
              <Link href={`/club/${subdomain}/results/ladders`}>Ladders</Link>
            </Dropdown>
            <Dropdown title='Info'>
              <Link href={`/club/${subdomain}/info/club`}>Club</Link>
              <Link href={`/club/${subdomain}/info/committee`}>Committee</Link>
            </Dropdown>
            <Link href={`/club/${subdomain}/docs`}>Docs</Link>
          </div>
        )}

        {/* Desktop Navbar */}
        <div className='hidden w-full items-center justify-center gap-4 bg-blue-700 p-2 text-white md:flex'>
          <Link href={`/club/${subdomain}`}>Home</Link>
          <Link href={`/club/${subdomain}/calendar`}>Calendar</Link>
          <Dropdown title='Results'>
            <Link href={`/club/${subdomain}/results/sessions`}>Sessions</Link>
            <Link href={`/club/${subdomain}/results/ladders`}>Ladders</Link>
          </Dropdown>
          <Dropdown title='Info'>
            <Link href={`/club/${subdomain}/info/club`}>Club</Link>
            <Link href={`/club/${subdomain}/info/committee`}>Committee</Link>
          </Dropdown>
          <Link href={`/club/${subdomain}/docs`}>Docs</Link>
        </div>
      </div>
      {children}
    </div>
  );

  /* Dropdown Menu Component */
  function Dropdown({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) {
    return (
      <Menu as='div' className='relative mx-2 inline-block text-left'>
        <Menu.Button className='inline-flex w-full justify-center rounded-md px-4 py-2 text-white hover:bg-blue-600'>
          {title}
          <ChevronDown className='ml-2 size-5' />
        </Menu.Button>

        <Transition
          enter='transition duration-100 ease-out'
          enterFrom='transform scale-95 opacity-0'
          enterTo='transform scale-100 opacity-100'
          leave='transition duration-75 ease-in'
          leaveFrom='transform scale-100 opacity-100'
          leaveTo='transform scale-95 opacity-0'
        >
          <Menu.Items className='absolute left-0 mt-2 w-48 rounded-md bg-white text-black shadow-lg'>
            <div className='py-1'>{children}</div>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }
}
