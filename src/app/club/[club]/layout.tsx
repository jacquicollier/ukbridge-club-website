'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, Transition } from '@headlessui/react';
import { Menu as MenuIcon, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@aws-amplify/ui-react';

export default function ClubLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  /** Common navigation items */
  const navItems = [
    { label: 'Home', href: `/` },
    { label: 'Calendar', href: `/calendar` },
    {
      label: 'Results',
      dropdown: [
        { label: 'Sessions', href: `/results/sessions` },
        { label: 'Ladders', href: `/results/ladders` },
      ],
    },
    {
      label: 'Info',
      dropdown: [
        { label: 'Sessions', href: `/info/sessions` },
        { label: 'Club', href: `/info/club` },
        { label: 'Committee', href: `/info/committee` },
      ],
    },
    { label: 'Docs', href: `/docs` },
  ];

  return (
    <div className='flex w-screen flex-col justify-center'>
      {/* Full-width banner with centered club name */}
      <div className='relative flex w-full items-center justify-center bg-blue-100 p-4'>
        <div className='text-2xl font-bold'>Welwyn Garden City Bridge Club</div>
        <button
          className='absolute right-4 rounded-lg border-2 bg-blue-700 p-2 text-white hover:bg-blue-800'
          onClick={() => router.push(`/edit`)}
        >
          Sign In
        </button>
      </div>

      {/* Mobile Navbar */}
      <div className='flex w-full items-center justify-between bg-blue-700 p-4 text-white md:hidden'>
        <div className='text-xl font-bold'>Menu</div>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className='size-6' /> : <MenuIcon className='size-6' />}
        </button>
      </div>

      {/* Mobile Menu Items */}
      {isOpen && (
        <div className='flex flex-col bg-blue-700 p-2 text-white md:hidden'>
          {navItems.map((item, idx) =>
            item.dropdown ? (
              <Dropdown key={idx} title={item.label}>
                <div className='flex flex-col space-y-2'>
                  {item.dropdown.map((subItem) => (
                    <Link key={subItem.href} href={subItem.href}>
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              </Dropdown>
            ) : (
              <Link key={idx} href={item.href}>
                {item.label}
              </Link>
            ),
          )}
        </div>
      )}

      {/* Desktop Navbar */}
      <div className='hidden w-full items-center justify-center gap-4 bg-blue-700 p-2 text-white md:flex'>
        {navItems.map((item, idx) =>
          item.dropdown ? (
            <Dropdown key={idx} title={item.label}>
              <div className='flex flex-col space-y-2 bg-blue-600'>
                {item.dropdown.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className='p-2 hover:bg-blue-400'
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            </Dropdown>
          ) : (
            <NavButton key={idx} href={item.href}>
              {item.label}
            </NavButton>
          ),
        )}
      </div>

      {children}
    </div>
  );
}

/** Button Component for Navigation */
function NavButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Button className='inline-flex h-full w-auto items-center justify-center rounded-md px-4 py-2 text-white hover:bg-blue-600'>
      <Link href={href} className='flex size-full items-center justify-center'>
        {children}
      </Link>
    </Button>
  );
}

/** Dropdown Menu Component */
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
        <Menu.Items className='absolute left-0 w-48 rounded-md bg-blue-600 p-4 text-white shadow-lg'>
          <div className='py-1'>{children}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
