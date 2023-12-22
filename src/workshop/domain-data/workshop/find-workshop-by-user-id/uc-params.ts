import { InputOptions, QueryUseCaseParams } from 'rilata2/src/app/use-case/types';
import { ErrorDod } from 'rilata2/src/domain/domain-object-data/common-types';
import { WorkshopAttrs, WorkshopParams } from '../params';

export type GetMyWorkshopActionDod = {
  actionName: 'getMyWorkshop',
  body: Record<string, never>,
};

export type GetMyWorkshopInputOptions = InputOptions<GetMyWorkshopActionDod>

export type GetMyWorkshopOut = WorkshopAttrs;

type WorkshopForUserDoesntExistLocale = {
  text: 'Мастерская не найдена',
  hint: Record<string, never>,
}

export type WorkshopForUserDoesntExistError = ErrorDod<
  WorkshopForUserDoesntExistLocale, 'WorkshopForUserDoesntExistError'
>

export type GetMyWorkshopUcParams = QueryUseCaseParams<
  WorkshopParams, GetMyWorkshopInputOptions, GetMyWorkshopOut, WorkshopForUserDoesntExistError
>
