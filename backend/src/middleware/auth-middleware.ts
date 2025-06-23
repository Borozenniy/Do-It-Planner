import { auth } from 'express-oauth2-jwt-bearer';
import 'dotenv/config';

const audience = process.env.ALLOWED_AUDIENCE;
const issuer = process.env.ISSUER_BASE_URL;

const jwtCheck = auth({
  audience: audience,
  issuerBaseURL: issuer,
  tokenSigningAlg: 'RS256',
});

export default jwtCheck;
