/* eslint-disable @typescript-eslint/no-unused-vars */
import { ModuleResolveInstance } from 'rilata/src/app/resolves/types';
import { ModuleConfig } from 'rilata/src/app/module/types';
import { BusMessageRepository } from 'rilata/src/app/database/bus-message-repository';
import { ModuleResolver } from 'rilata/src/app/module/module-resolver';
import { EventRepository } from 'rilata/src/app/database/event-repository';
import { ModelModule } from './module';
import { ModelResolves } from './resolves';
import { ModelRepository } from './domain-object/model/repo';

export class ModelModuleResolver extends ModuleResolver<ModelModule, ModelResolves> {
  protected moduleConfig: ModuleConfig = {
    ModuleUrl: '/api/model-module/',
  };

  getRealisation(key: unknown): ModuleResolveInstance {
    throw this.getLogger().error('Method getRealisation not implemented.');
  }

  getRepository(key: unknown): ModuleResolveInstance {
    if (key === ModelRepository) return this.resolves.modelRepo;
    if (key === EventRepository || key === BusMessageRepository) {
      return this.resolves.busMessageRepo;
    }
    throw Error(`not found repository by key: ${key}`);
  }

  getFacade(key: unknown): ModuleResolveInstance {
    throw this.getLogger().error('Method getFacade not implemented.');
  }
}
