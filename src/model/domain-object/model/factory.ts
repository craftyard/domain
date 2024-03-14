import { AggregateFactory } from 'rilata/src/domain/domain-object/aggregate-factory';
import { Caller } from 'rilata/src/app/caller';
import { uuidUtility } from 'rilata/src/common/utils/uuid/uuid-utility';
import { UuidType } from 'rilata/src/common/types';
import { ModelAR } from './a-root';
import { ModelAttrs, ModelParams } from '../../domain-data/params';
import { AddModelDomainCommand, AddedModelEvent } from '../../domain-data/model/add-model/a-params';

export class ModelFactory extends AggregateFactory<ModelParams> {
  create(caller: Caller, action: AddModelDomainCommand, requestId: UuidType): ModelAR {
    const modelAttrs: ModelAttrs = {
      ...action,
      modelId: uuidUtility.getNewUUID(),
      images: [],
    };

    const addModel = new ModelAR(modelAttrs, 0, this.logger);

    addModel.getHelper().registerEvent<AddedModelEvent>('AddedModelEvent', modelAttrs, requestId, caller);

    return addModel;
  }

  restore(modelAttrs: ModelAttrs, version: number): ModelAR {
    return new ModelAR(modelAttrs, version, this.logger);
  }
}
