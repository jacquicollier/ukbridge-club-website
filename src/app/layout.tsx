'use client';

// import type { Metadata } from 'next';
import './globals.css';
import { Amplify } from 'aws-amplify';
import { amplifyConfig } from '@/aws-config';

Amplify.configure(amplifyConfig);

// export const metadata: Metadata = {
//   title: 'UKBridge.Club',
//   description: 'Find your next bridge game...',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
