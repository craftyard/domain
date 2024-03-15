import { ModuleResolves } from '../../../src/app/module/module-resolves';
import { PersonRepository } from './domain-object/person/repo';
import { ModelModule } from './module';

export type ModelResolves = ModuleResolves<ModelModule> & {
  modelRepo: PersonRepository,
}
