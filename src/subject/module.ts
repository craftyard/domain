import { Module } from 'rilata/src/app/module/module';
import { ModuleType } from 'rilata/src/app/module/types';
import { GeneraQueryService, GeneralCommandService, GeneralEventService } from 'rilata/src/app/service/types';
import { GettingUsersService } from './service/user/get-users/service';

export class SubjectModule extends Module {
  moduleName = 'SubjectModule' as const;

  moduleType: ModuleType = 'common-module' as const;

  queryServices: GeneraQueryService[] = [
    new GettingUsersService(),
  ];

  commandServices: GeneralCommandService[] = [
  ];

  eventServices: GeneralEventService[] = [];
}
