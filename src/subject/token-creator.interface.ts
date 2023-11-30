import { JWTPayload, JwtTokens } from './domain-data/user/user-authentification.a-params';

export interface TokenCreator {
  createToken(payload: JWTPayload): JwtTokens;
}
