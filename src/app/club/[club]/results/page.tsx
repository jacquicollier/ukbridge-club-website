'use client';

import { useRouter } from 'next/navigation';

export default function ResultsPage() {
  const router = useRouter();

  router.push(`/sessions`);
}
