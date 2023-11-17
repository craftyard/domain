import { Realisable } from 'rilata2/src/domain/realisable';
import { TokenCreatorPayload } from '../../../types';

export interface TokenCreator {
  createToken(payload: TokenCreatorPayload): string
}

export const TokenCreator = {
  instance(realistationResolver: Realisable): TokenCreator {
    return realistationResolver.getRealisatioin(TokenCreator) as TokenCreator;
  },
};
