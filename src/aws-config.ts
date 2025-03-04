import { ResourcesConfig } from 'aws-amplify';

export const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'eu-west-2_HtanvtmuD',
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
      identityPoolId: 'eu-west-2:7036d3cb-efed-4905-a54e-e72fb7458f43',
      signUpVerificationMethod: 'code',
      loginWith: {
        oauth: {
          domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN!,
          scopes: ['email', 'openid'],
          redirectSignIn: [
            'http://localhost:3000/auth/callback',
            'https://ukbridge.club/auth/callback',
          ],
          redirectSignOut: [
            'http://localhost:3000/auth/callback',
            'https://ukbridge.club/auth/callback',
          ],
          responseType: 'code',
        },
      },
    },
  },
} as ResourcesConfig;

// const currentConfig = Amplify.getConfig();
