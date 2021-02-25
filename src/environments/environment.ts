import { googleSignIn } from './google.environment';

export const environment = {
  production: false,
  apiUrl: 'http://localhost:4200',
  ...googleSignIn,
};
