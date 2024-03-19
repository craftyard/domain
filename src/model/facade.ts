/* eslint-disable max-len */
import { Result } from 'rilata/src/common/result/types';
import { ServiceResult } from 'rilata/src/app/service/types';
import { UuidType } from 'rilata/src/common/types';
import { Facadable } from 'rilata/src/app/resolves/facadable';
import { DomainUser } from 'rilata/src/app/caller';
import { ModelAR } from './domain-object/model/a-root';
import { ModelNameAlreadyExistsError } from './domain-data/model/add-model/s-params';
import { GettingWorkshopModelServiceParams } from './domain-data/model/get-model/s-params';
import { ModelAttrs } from './domain-data/params';
import { ModelModuleResolver } from './resolver';

export interface ModelFacade {
  init(resolver: ModelModuleResolver): void
  addModel(model: ModelAR, caller: DomainUser): Promise<Result<ModelNameAlreadyExistsError, undefined>>
  getWorkshopModel(workshopId: UuidType, modelId: UuidType, caller: DomainUser): Promise<ServiceResult<GettingWorkshopModelServiceParams>>;
  getWorkshopModels(workshopId:UuidType, caller: DomainUser): Promise<ModelAttrs[]>;
}

export const ModelFacade = {
  instance(resolver: Facadable): ModelFacade {
    return resolver.getFacade(ModelFacade) as ModelFacade;
  },
};
