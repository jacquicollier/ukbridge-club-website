import CommitteeMemberGrid from '@/app/club/[subdomain]/info/committee/components/CommitteeMemberGrid';
import Header from '@/app/club/[subdomain]/components/Header';

export default function CommitteePage() {
  return (
    <div>
      <div className='flex w-screen flex-col justify-center'>
        <Header />
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
