import { AggregateFactory } from 'rilata/src/domain/domain-object/aggregate-factory';
import { AssertionException } from 'rilata/src/common/exeptions';
import { Caller } from 'rilata/src/app/caller';
import { WorkshopAttrs, WorkshopParams } from '../../domain-data/workshop/params';
import { WorkshopAR } from './a-root';

export class WorkshopFactory extends AggregateFactory<WorkshopParams> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(caller: Caller, attrs: WorkshopAttrs): WorkshopAR {
    throw new AssertionException('not implemented');
  }

  restore(workshopAttrs: WorkshopAttrs, version: number): WorkshopAR {
    return new WorkshopAR(workshopAttrs, version, this.logger);
  }
}
