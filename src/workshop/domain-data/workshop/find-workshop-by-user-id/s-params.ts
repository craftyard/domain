import { UserId, UuidType } from 'rilata/src/common/types';
import { ErrorDod } from 'rilata/src/domain/domain-data/domain-types';
import { QueryServiceParams } from 'rilata/src/app/service/types';
import { WorkshopOutAttrs, WorkshopParams } from '../params';

export type FindWorkshopByUserIdActionDod = {
  attrs: {userId: UserId},
  meta: {
    name: 'getMyWorkshop',
    actionId: UuidType,
    domainType: 'action',
  }
};

export type FindWorkshopByUserIdOut = WorkshopOutAttrs;

type WorkshopForUserDoesntExistLocale = {
  text: 'Мастерская не найдена',
  hint: Record<string, never>,
}

export type WorkshopForUserDoesntExistError = ErrorDod<
  WorkshopForUserDoesntExistLocale, 'WorkshopForUserDoesntExistError'
>

export type GetMyWorkshopServiceParams = QueryServiceParams<
  WorkshopParams, FindWorkshopByUserIdActionDod, FindWorkshopByUserIdOut, WorkshopForUserDoesntExistError
>
