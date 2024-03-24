import { Module } from 'rilata/src/app/module/module';
import { ModuleType } from 'rilata/src/app/module/types';
import { GeneraQueryService, GeneralCommandService, GeneralEventService } from 'rilata/src/app/service/types';
import { FindWorkshopByUserIdService } from './workshop/services/service';

export class WorkshopModule extends Module {
  moduleName = 'WorkshopModule' as const;

  moduleType: ModuleType = 'read-module' as const;

  queryServices: GeneraQueryService[] = [
    new FindWorkshopByUserIdService() as unknown as GeneraQueryService,
  ];

  commandServices: GeneralCommandService[] = [
  ];

  eventServices: GeneralEventService[] = [];
}
