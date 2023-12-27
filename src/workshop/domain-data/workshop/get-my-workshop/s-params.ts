import { UuidType } from 'rilata/src/common/types';
import { ErrorDod } from 'rilata/src/domain/domain-data/domain-types';
import { QueryServiceParams } from 'rilata/src/app/service/types';
import { WorkshopAttrs, WorkshopParams } from '../params';

export type GetMyWorkshopActionDod = {
  attrs: Record<string, never>,
  meta: {
    name: 'getMyWorkshop',
    actionId: UuidType,
    domainType: 'action',
  }
};

export type GetMyWorkshopOut = WorkshopAttrs;

type WorkshopForUserDoesntExistLocale = {
  text: 'Мастерская не найдена',
  hint: Record<string, never>,
}

export type WorkshopForUserDoesntExistError = ErrorDod<
  WorkshopForUserDoesntExistLocale, 'WorkshopForUserDoesntExistError'
>

export type GetMyWorkshopServiceParams = QueryServiceParams<
  WorkshopParams, GetMyWorkshopActionDod, GetMyWorkshopOut, WorkshopForUserDoesntExistError
>
