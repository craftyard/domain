import { Module } from 'rilata/src/app/module/module';
import { ModuleType } from 'rilata/src/app/module/types';
import { GeneraQueryService, GeneralCommandService, GeneralEventService } from 'rilata/src/app/service/types';
import { GetingWorkshopModelsService } from './service/get-workshop-models/service';
import { GettingWorkshopModelService } from './service/get-workshop-model/service';

export class ModelModule extends Module {
  moduleName = 'ModelModule' as const;

  moduleType: ModuleType = 'read-module' as const;

  queryServices: GeneraQueryService[] = [
    new GetingWorkshopModelsService(),
    new GettingWorkshopModelService(),
  ];

  commandServices: GeneralCommandService[] = [];

  eventServices: GeneralEventService[] = [];
}
