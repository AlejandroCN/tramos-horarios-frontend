import { googleSignIn } from './google.environment';

export const environment = {
  production: true,
  apiUrl: 'https://tramos-horarios-backend.herokuapp.com',
  ...googleSignIn,
};
