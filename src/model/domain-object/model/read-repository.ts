import { Repositoriable } from 'rilata/src/app/resolves/repositoriable';
import { ServiceResult } from 'rilata/src/app/service/types';
import { UuidType } from 'rilata/src/common/types';
import { GettingWorkshopModelServiceParams } from '../../domain-data/model/get-model/s-params';
import { ModelAttrs } from '../../domain-data/params';

export interface ModelReadRepository {
    getWorkshopModel(workshopId: UuidType, modelId: UuidType):
    Promise<ServiceResult<GettingWorkshopModelServiceParams>>;
    getWorkshopModels(workshopId:UuidType): Promise<ModelAttrs[]>;
}

export const ModelReadRepository = {
  instance(resolver: Repositoriable): ModelReadRepository {
    return resolver.getRepository(ModelReadRepository) as ModelReadRepository;
  },
};
