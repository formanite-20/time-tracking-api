import { OAuth2Client } from '@badgateway/oauth2-client';

// a12n setup
export default new OAuth2Client({
  server: process.env.AUTH_API_URI,
  clientId: process.env.OAUTH2_CLIENT_ID as string,
  clientSecret: process.env.OAUTH2_CLIENT_SECRET,
});
