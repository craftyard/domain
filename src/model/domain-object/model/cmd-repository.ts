import { Repositoriable } from 'rilata/src/app/resolves/repositoriable';
import { Result } from 'rilata/src/common/result/types';
import { ModelAR } from './a-root';
import { ModelNameAlreadyExistsError } from '../../domain-data/model/add-model/s-params';

export interface ModelCmdRepository {
  addModel(model: ModelAR): Promise<Result<ModelNameAlreadyExistsError, undefined>>
}

export const ModelCmdRepository = {
  instance(resolver: Repositoriable): ModelCmdRepository {
    return resolver.getRepository(ModelCmdRepository) as ModelCmdRepository;
  },
};
