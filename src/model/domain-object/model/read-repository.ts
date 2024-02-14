import { Repositoriable } from 'rilata/src/app/resolves/repositoriable';
import { UuidType } from 'rilata/src/common/types';
import { ModelAttrs } from '../../domain-data/params';

export interface ModelReadRepository {
    getWorkshopModels(workshopId:UuidType): Promise<ModelAttrs[]>;

    getWorkshopModel(modelId: UuidType): Promise<ModelAttrs>;
}

export const ModelReadRepository = {
  instance(repoResolver: Repositoriable): ModelReadRepository {
    return repoResolver.getRepository(ModelReadRepository) as ModelReadRepository;
  },
};
