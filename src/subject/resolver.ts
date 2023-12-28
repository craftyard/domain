import { Logger } from 'rilata/src/common/logger/logger';
import { TokenCreator } from 'rilata/src/app/jwt/token-creator.interface';
import { JWTTokens } from 'rilata/src/app/jwt/types';
import { ModuleResolver } from 'rilata/src/app/resolves/module-resolver';
import { AssertionException } from 'rilata/src/common/exeptions';
import { Database } from 'rilata/src/app/database/database';
import { TokenVerifier } from 'rilata/src/app/jwt/token-verifier.interface';
import { Module } from 'rilata/src/app/module/module';
import { UserCmdRepository } from './domain-object/user/cmd-repository';
import { UserReadRepository } from './domain-object/user/read-repository';
import { JWTPayload } from './domain-data/user/user-authentification/a-params';

export class SubjectResolver implements ModuleResolver {
  private module!: Module;

  constructor(
    protected botToken: string,
    protected tokenCreator: TokenCreator<JWTTokens>,
    protected userReadRepo: UserReadRepository,
    protected userCmdRepo: UserCmdRepository,
    protected logger: Logger,
  ) {}

  init(module: Module): void {
    this.module = module;
  }

  getTokenVerifier(): TokenVerifier<JWTPayload> {
    throw new Error('Method not implemented.');
  }

  getModule(): Module {
    return this.module;
  }

  getLogger(): Logger {
    return this.logger;
  }

  getDatabase(): Database {
    throw new Error('Method not implemented.');
  }

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
