import { Repositoriable } from 'rilata2/src/domain/repositoriable';
import { Realisable } from 'rilata2/src/domain/realisable';
import { Facadable } from 'rilata2/src/domain/facadable';
import { Logger } from 'rilata2/src/common/logger/logger';
import { TokenCreator } from 'rilata2/src/app/jwt/token-creator.interface';
import { JWTTokens } from 'rilata2/src/app/jwt/types';
import { UserReadRepository } from './domain-object/user/read-repository';
import { UserCmdRepository } from './domain-object/user/cmd-repository';

export class SubjectResolver implements Repositoriable, Realisable, Facadable {
  constructor(
    protected botToken: string,
    protected tokenCreator: TokenCreator<JWTTokens>,
    protected userReadRepo: UserReadRepository,
    protected userCmdRepo: UserCmdRepository,
    protected logger: Logger,
  ) {}

  getFacade(...args: unknown[]): unknown {
    throw new Error('Method not implemented.');
  }

  getRealisation(key: unknown): unknown {
    if (key === 'botToken') return this.botToken;
    if (key === this.tokenCreator) return this.tokenCreator;
    this.logger.error(`not finded key for getRealisation method of SubjectResolver, key: ${key}`);
    throw Error();
  }

  getRepository(key: unknown): unknown {
    if (key === UserReadRepository) return this.userReadRepo;
    if (key === UserCmdRepository) return this.userCmdRepo;
    this.logger.error(`not finded key for getRealisation method of SubjectResolver, key: ${key}`);
    throw Error();
  }
}
