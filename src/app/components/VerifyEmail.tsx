'use client';

import { useState } from 'react';
import { Auth } from 'aws-amplify';

export default function VerifyEmail() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null); // Clear error
    setSuccessMessage(null); // Clear success message

    try {
      // Confirm the verification code entered by the user
      await Auth.confirmSignUp(email, verificationCode);
      setSuccessMessage('Your email has been verified successfully!');
    } catch (error: any) {
      console.error('Error verifying email:', error);
      setError(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Verify Email</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor='verificationCode'>Verification Code</label>
          <input
            type='text'
            id='verificationCode'
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
        </div>

        <button type='submit'>Verify</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}
