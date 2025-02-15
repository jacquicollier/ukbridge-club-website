import type { Metadata } from 'next';
import './globals.css';
import '../aws-config';

export const metadata: Metadata = {
  title: 'UKBridge.Club',
  description: 'Find your next bridge game...',
};

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
