import { AggregateFactory } from 'rilata/src/domain/domain-object/aggregate-factory';
import { Caller } from 'rilata/src/app/caller';
import { uuidUtility } from 'rilata/src/common/utils/uuid/uuid-utility';
import { UuidType } from 'rilata/src/common/types';
import { ModelAR } from './a-root';
import { ModelAttrs, AddModelParams } from '../domain-data/params';
import { AddModelDomainCommand } from '../domain-data/a-params';

export class ModelFactory extends AggregateFactory<AddModelParams> {
  create(caller: Caller, action: AddModelDomainCommand, actionId: UuidType): ModelAR {
    const modelAttrs: ModelAttrs = {
      ...action,
      modelId: uuidUtility.getNewUUID(),
    };

    const addModel = new ModelAR(modelAttrs, 0, this.logger);

    addModel.getHelper().registerDomainEvent('AddedModelEvent', modelAttrs, actionId, caller);

    return addModel;
  }

  restore(modelAttrs: ModelAttrs, version: number): ModelAR {
    return new ModelAR(modelAttrs, version, this.logger);
  }
}
