import { ModuleResolves } from 'rilata/src/app/module/module-resolves';
import { SubjectModule } from './module';

export type SubjectResolves = ModuleResolves<SubjectModule> & {
  Repo: SubjectRepository,
}
