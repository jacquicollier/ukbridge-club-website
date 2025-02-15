import { signInWithRedirect } from 'aws-amplify/auth';

const SignInButton = () => {
  return (
    <button
      onClick={() => signInWithRedirect()}
      className='rounded-lg bg-white px-4 py-2 text-blue-600 shadow transition hover:bg-gray-200'
    >
      Sign In
    </button>
  );
};

export default SignInButton;
