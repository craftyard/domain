import { Repositoriable } from 'rilata/src/app/resolves/repositoriable';
import { Result } from 'rilata/src/common/result/types';
import { ModelAR } from './domain-object/a-root';
import { ModelNameAlreadyExistsError } from './domain-data/a-params';

export interface ModelCmdRepository {
  addModel(model: ModelAR): Promise<Result<ModelNameAlreadyExistsError, undefined>>
}

export const ModelCmdRepository = {
  instance(repoResolver: Repositoriable): ModelCmdRepository {
    return repoResolver.getRepository(ModelCmdRepository) as ModelCmdRepository;
  },
};
