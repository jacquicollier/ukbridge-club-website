'use client';

import { DDSProvider } from '@/app/context/DDSContext';
import { DDSInstance } from '@/app/model/dds/model';
import { useEffect, useState } from 'react';

export default function GameContestantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ddsInstance, setDDSInstance] = useState<DDSInstance | null>(null);

  useEffect(() => {
    async function loadWasm() {
      if (typeof window !== 'undefined') {
        setDDSInstance(
          await (
            await import('./dds.js')
          ).default({
            locateFile: () => '/dds.wasm',
          }),
        );
      }
    }

    loadWasm();
  }, []);

  useEffect(() => {
    if (ddsInstance !== null) {
      ddsInstance._dds_init();
    }
  }, [ddsInstance]);

  if (!ddsInstance) return <p>Loading...</p>;

  return <DDSProvider ddsInstance={ddsInstance}>{children}</DDSProvider>;
}
