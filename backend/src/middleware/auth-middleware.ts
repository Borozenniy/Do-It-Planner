import { auth } from 'express-oauth2-jwt-bearer';
import 'dotenv/config';

const jwtCheck = auth({
  audience: 'https://do-it-planner.vercel.app/app/dashboard',
  issuerBaseURL: 'https://dev-761rd8ygardisai0.us.auth0.com/',
  tokenSigningAlg: 'RS256',
});

export default jwtCheck;
