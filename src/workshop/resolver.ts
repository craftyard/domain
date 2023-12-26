import { Repositoriable } from 'rilata2/src/domain/repositoriable';
import { Realisable } from 'rilata2/src/domain/realisable';
import { Facadable } from 'rilata2/src/domain/facadable';
import { Logger } from 'rilata2/src/common/logger/logger';
import { WorkshopRepository } from '../workshop/domain-object/workshop/repository';

export class WorkshopResolver implements Repositoriable, Realisable, Facadable {
  constructor(
    protected workshopRepo: WorkshopRepository,
    protected logger: Logger,
  ) {}

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
