/* eslint-disable @typescript-eslint/no-unused-vars */
import { ModuleResolver } from 'rilata/src/app/module/module-resolver';
import { ModuleConfig } from 'rilata/src/app/module/types';
import { ModuleResolveInstance } from 'rilata/src/app/resolves/types';
import { BusMessageRepository } from 'rilata/src/app/database/bus-message-repository';
import { EventRepository } from 'rilata/src/app/database/event-repository';
import { SubjectModule } from './module';
import { SubjectResolves } from './resolves';
import { UserReadRepository } from './domain-object/user/read-repository';
import { UserCmdRepository } from './domain-object/user/cmd-repository';

export class SubjectModuleResolver extends ModuleResolver<SubjectModule, SubjectResolves> {
  protected moduleConfig: ModuleConfig = {
    ModuleUrl: '/api/subject-module/',
  };

  getRealisation(key: unknown): ModuleResolveInstance {
    throw this.getLogger().error('Method getRealisation not implemented.');
  }

  getRepository(key: unknown): ModuleResolveInstance {
    if (key === UserReadRepository) return this.resolves.subjectReadRepo;
    if (key === UserCmdRepository) return this.resolves.subjectCmdRepo;
    if (key === EventRepository || key === BusMessageRepository) {
      return this.resolves.busMessageRepo;
    }
    throw Error(`not found repository by key: ${key}`);
  }

  getFacade(key: unknown): ModuleResolveInstance {
    throw this.getLogger().error('Method getFacade not implemented.');
  }
}
