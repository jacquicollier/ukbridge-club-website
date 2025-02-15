'use client';

import SignInButton from '@/app/components/SignInButton';
import { useEffect, useState } from 'react';
import { AuthUser, getCurrentUser } from '@aws-amplify/auth';
import SignOutButton from '@/app/components/SignOutButton';

const TitleBar: React.FunctionComponent = () => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      }
    };

    getUser();
  }, []);

  return (
    <header className='flex items-center justify-between bg-blue-600 p-4 text-white shadow-md'>
      <h1 className='text-2xl font-bold'>UK Bridge Clubs</h1>
      {user ? <SignOutButton /> : <SignInButton />}
    </header>
  );
};

export default TitleBar;
