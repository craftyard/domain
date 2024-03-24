import { ModuleResolves } from 'rilata/src/app/module/module-resolves';
import { WorkshopModule } from './module';
import { WorkshopRepository } from './workshop/domain-object/workshop/repo';

export type WorkshopResolves = ModuleResolves<WorkshopModule> & {
  workshopRepo: WorkshopRepository,
}
