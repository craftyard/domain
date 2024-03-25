import { ModuleResolves } from 'rilata/src/app/module/module-resolves';
import { ModelModule } from './module';
import { ModelRepository } from './domain-object/model/repo';
import { ModelFacade } from './facade';

export type ModelResolves = ModuleResolves<ModelModule> & {
  moduleUrl: '/api/model-module/',
  modelRepo: ModelRepository;
  modelFacade: ModelFacade,
}
