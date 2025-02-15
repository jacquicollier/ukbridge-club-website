import { signOut } from 'aws-amplify/auth';

const SignOutButton = () => {
  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOutButton;
