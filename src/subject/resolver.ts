import { Logger } from 'rilata/src/common/logger/logger';
import { TokenCreator } from 'rilata/src/app/jwt/token-creator.interface';
import { JWTTokens } from 'rilata/src/app/jwt/types';
import { Repositoriable } from 'rilata/src/app/resolves/repositoriable';
import { Realisable } from 'rilata/src/app/resolves/realisable';
import { Facadable } from 'rilata/src/app/resolves/facadable';
import { AssertionException } from 'rilata/src/common/exeptions';
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getFacade(...args: unknown[]): unknown {
    throw new Error('Method not implemented.');
  }

  getRealisation(key: unknown): unknown {
    if (key === 'botToken') return this.botToken;
    if (key === this.tokenCreator) return this.tokenCreator;
    const errStr = `not finded key for getRealisation method of SubjectResolver, key: ${key}`;
    this.logger.error(errStr);
    throw new AssertionException(errStr);
  }

  getRepository(key: unknown): unknown {
    if (key === UserReadRepository) return this.userReadRepo;
    if (key === UserCmdRepository) return this.userCmdRepo;
    const errStr = `not finded key for getRealisation method of SubjectResolver, key: ${key}`;
    this.logger.error(errStr);
    throw new AssertionException(errStr);
  }
}
