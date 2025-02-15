'use client'; // before adding this line I had the error that the user pool was not configured!

import { Amplify } from 'aws-amplify';

import config from 'aws-ex';

Amplify.configure(config, { ssr: true });

export const ConfigureAmplifyClientSide = () => {
  return null;
};
