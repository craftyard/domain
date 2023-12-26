import { Module } from 'rilata2/src/app/module/module';
import { GeneraQuerylUseCase, GeneralCommandUseCase } from 'rilata2/src/app/use-case/types';

export class SubjectDomainModule extends Module<'module'> {
  queryUseCases: GeneraQuerylUseCase[] = [];

  commandUseCases: GeneralCommandUseCase[] = [];

  moduleType: 'module' = 'module' as const;

  moduleName: string = 'subject';
}
