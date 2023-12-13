import { UuidType } from 'rilata2/src/common/types';
import { AggregateRootDataParams } from 'rilata2/src/domain/domain-object-data/aggregate-data-types';
import { DomainMeta } from 'rilata2/src/domain/domain-object-data/common-types';
import { TelegramId } from '../../../types';
import { AuthentificationUserActionParams } from './user-authentification/a-params';

export type UserProfile = {
  name: string,
}

export type UserAttrs = {
  userId: UuidType,
  telegramId: TelegramId,
  employeeId?: UuidType,
  userProfile: UserProfile,
}

export type UserMeta = DomainMeta<'UserAR'>;

export type UserParams = AggregateRootDataParams<
  UserAttrs, UserMeta, AuthentificationUserActionParams
>;
