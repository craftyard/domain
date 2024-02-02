import { AggregateFactory } from 'rilata/src/domain/domain-object/aggregate-factory';
import { AssertionException } from 'rilata/src/common/exeptions';
import { Caller } from 'rilata/src/app/caller';
import { ModelAR } from './a-root';
import { ModelAttrs, AddModelParams } from '../domain-data/params';

export class ModelFactory extends AggregateFactory<AddModelParams> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(caller: Caller, action: unknown): ModelAR {
    throw new AssertionException('not implemented');
  }

  restore(modelAttrs: ModelAttrs, version: number): ModelAR {
    return new ModelAR(modelAttrs, version, this.logger);
  }
}
