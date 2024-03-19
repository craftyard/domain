import { ModuleResolves } from 'rilata/src/app/module/module-resolves';
import { SubjectModule } from './module';
import { SubjectFacade } from './facade';
import { UserReadRepository } from './domain-object/user/read-repository';
import { UserCmdRepository } from './domain-object/user/cmd-repository';

export type SubjectResolves = ModuleResolves<SubjectModule> & {
  subjectReadRepo: UserReadRepository
  subjectCmdRepo: UserCmdRepository,
  subjectFacade: SubjectFacade,
}
