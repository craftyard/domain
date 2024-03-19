import { ModuleResolves } from 'rilata/src/app/module/module-resolves';
import { ModelModule } from './module';
import { ModelRepository } from './domain-object/model/repo';

export type ModelResolves = ModuleResolves<ModelModule> & {
  modelRepo: ModelRepository;
}
