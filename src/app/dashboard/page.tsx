import { headers } from 'next/headers';

export async function DashboardPage({
  params,
}: {
  params: { subdomain: string };
}) {
  const headersList = await headers();
  const detectedSubdomain = headersList.get('x-subdomain') || params.subdomain;

  return (
    <div>
      <h1>Welcome to the dashboard for {detectedSubdomain}</h1>
    </div>
  );
}
