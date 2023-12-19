import { Module } from 'rilata2/src/app/module/module';

export abstract class SubjectModule extends Module<'module'> {
  moduleType: 'module' = 'module' as const;

  moduleName: string = 'subject';
}
