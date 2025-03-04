'use client';

import {
  fetchUserAttributes,
  FetchUserAttributesOutput,
} from '@aws-amplify/auth';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// Define a custom type for the user attributes
interface ClubAttribute {
  club: string;
  role: string;
}

// Extend FetchUserAttributesOutput with your custom attributes
type CustomUserAttributes = FetchUserAttributesOutput & {
  'custom:clubs'?: string;
};

export default function ClubEditLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Function to print access token and id token
  const printUserAttributes = async () => {
    try {
      const userAttributes =
        (await fetchUserAttributes()) as CustomUserAttributes;
      const clubs = userAttributes['custom:clubs'];
      if (!clubs) {
      } else {
        const clubsObj = JSON.parse(clubs) as ClubAttribute[];
        console.log(clubsObj);
        // TODO: Check sub-domain here
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Authenticator>
      {({ signOut }) => (
        <div>
          <button onClick={signOut}>Sign out</button>
          {children}
          <button onClick={printUserAttributes}>Print Attributes</button>
        </div>
      )}
    </Authenticator>
  );
}
