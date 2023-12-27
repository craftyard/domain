import { AggregateFactory } from 'rilata/src/domain/domain-object/aggregate-factory';
import { Caller } from 'rilata/src/app/caller';
import { WorkshopAttrs, WorkshopParams } from '../../domain-data/workshop/params';
import { WorkshopAR } from './a-root';

export class WorkshopFactory extends AggregateFactory<WorkshopParams> {
  create(caller: Caller, attrs: WorkshopAttrs): WorkshopAR {
    return new WorkshopAR(attrs, 0, this.logger);
  }

  restore(workshopAttrs: WorkshopAttrs, version: number): WorkshopAR {
    return new WorkshopAR(workshopAttrs, version, this.logger);
  }
}
