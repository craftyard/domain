import { ModuleResolver } from 'rilata/src/app/resolves/module-resolver';
import { Logger } from 'rilata/src/common/logger/logger';
import { Database } from 'rilata/src/app/database/database';
import { TokenVerifier } from 'rilata/src/app/jwt/token-verifier.interface';
import { Module } from 'rilata/src/app/module/module';
import { RunMode } from 'rilata/src/app/types';
import { WorkshopReadRepository } from '../workshop/domain-object/workshop/repository';
import { JWTPayload } from '../subject/domain-data/user/user-authentification/a-params';

export class WorkshopResolver implements ModuleResolver {
  constructor(
    protected workshopReadRepo: WorkshopReadRepository,
    protected logger: Logger,
    protected runMode: RunMode,
    protected tokenVerifier: TokenVerifier<JWTPayload>,
  ) {}

  getRunMode(): RunMode {
    return this.runMode;
  }

  private module!: Module;

  init(module: Module): void {
    this.module = module;
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
    if (key === TokenVerifier) return this.tokenVerifier;
    this.logger.error(`not finded key for getRealisation method of WorkshopResolver, key: ${key}`);
    throw Error();
  }

  getRepository(key: unknown): unknown {
    if (key === WorkshopReadRepository) return this.workshopReadRepo;
    this.logger.error(`not finded key for getRealisation method of WorkshopResolver, key: ${key}`);
    throw Error();
  }
}
