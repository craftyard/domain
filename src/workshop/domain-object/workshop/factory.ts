import { AggregateFactory } from 'rilata2/src/domain/domain-object/aggregate-factory';
import { Logger } from 'rilata2/src/common/logger/logger';
import { Caller } from 'rilata2/src/app/caller';
import { WorkshopAttrs, WorkshopParams } from '../../domain-data/workshop/params';
import { WorkshopAR } from './a-root';

export class WorkshopFactory extends AggregateFactory<WorkshopParams> {
  constructor(protected logger: Logger) { super(); }

  create(caller: Caller, attrs: WorkshopAttrs): WorkshopAR {
    return new WorkshopAR(attrs, 0, this.logger);
  }

  restore(workshopAttrs: WorkshopAttrs, version: number): WorkshopAR {
    return new WorkshopAR(workshopAttrs, version, this.logger);
  }
}
