import { Repositoriable } from 'rilata/src/app/resolves/repositoriable';
import { GetServiceErrorsResult } from 'rilata/src/app/service/types';
import { failure } from 'rilata/src/common/result/failure';
import { UuidType } from 'rilata/src/common/types';
import { GettingWorkshopModelServiceParams } from '../../domain-data/model/get-model/s-params';
import { ModelAttrs } from '../../domain-data/params';

export interface ModelReadRepository {
    getWorkshopModels(workshopId:UuidType): Promise<ModelAttrs[]>;

    getWorkshopModel(workshopId: UuidType, modelId: UuidType): Promise<ModelAttrs | GetServiceErrorsResult<GettingWorkshopModelServiceParams>>;
}

export const ModelReadRepository = {
  instance(repoResolver: Repositoriable): ModelReadRepository {
    return repoResolver.getRepository(ModelReadRepository) as ModelReadRepository;
  },
};
