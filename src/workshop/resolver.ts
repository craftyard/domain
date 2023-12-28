import { ModuleResolver } from 'rilata/src/app/resolves/module-resolver';
import { Logger } from 'rilata/src/common/logger/logger';
import { Database } from 'rilata/src/app/database/database';
import { TokenVerifier } from 'rilata/src/app/jwt/token-verifier.interface';
import { Module } from 'rilata/src/app/module/module';
import { WorkshopRepository } from '../workshop/domain-object/workshop/repository';
import { JWTPayload } from '../subject/domain-data/user/user-authentification/a-params';

export class WorkshopResolver implements ModuleResolver {
  constructor(
    protected workshopRepo: WorkshopRepository,
    protected logger: Logger,
  ) {}

  private module!: Module;

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

  getFacade(...args: unknown[]): unknown {
    throw new Error('Method not implemented.');
  }

  getRealisation(key: unknown): unknown {
    this.logger.error(`not finded key for getRealisation method of WorkshopResolver, key: ${key}`);
    throw Error();
  }

  getRepository(key: unknown): unknown {
    if (key === WorkshopRepository) return this.workshopRepo;
    this.logger.error(`not finded key for getRealisation method of WorkshopResolver, key: ${key}`);
    throw Error();
  }
}
