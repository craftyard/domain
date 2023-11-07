import { DtoFieldValidator } from 'rilata2/src/domain/validator/field-validator/dto-field-validator';
import { CommandValidatorMap, ValidatorMap } from 'rilata2/src/domain/validator/field-validator/types';
import { CannotEmptyStringField } from 'rilata2/src/domain/validator/field-validator/prepared-fields/string/cannot-empty-string';
import { AuthentificationUserUCQuery } from '../../read-usecase/user-authentifiacaion/uc-params';
import { TelegramAuthDTO } from '../../domain-data/user/user-authentification.a-params';
import { TelegramId } from '../../../types';

export const authentificationUserAttrsVMap: ValidatorMap<TelegramAuthDTO> = {
  telegram_id: new CannotEmptyStringField('telegram_id', true, []),
  first_name: new CannotEmptyStringField('first_name', true, []),
  last_name: new CannotEmptyStringField('last_name', true, []),
  username: new CannotEmptyStringField('username', true, []),
  photo_url: new CannotEmptyStringField('photo_url', true, []),
  auth_date: new CannotEmptyStringField('auth_date', true, []),
  hash: new CannotEmptyStringField('hash', true, []),
};

export type AuthentificationUserDomainCommand = TelegramAuthDTO;

export const AuthentificationUserAttrsVMap: ValidatorMap<AuthentificationUserDomainCommand> = {
  telegram_id: authentificationUserAttrsVMap.telegram_id,
  first_name: authentificationUserAttrsVMap.first_name,
  last_name: authentificationUserAttrsVMap.last_name,
  username: authentificationUserAttrsVMap.username,
  photo_url: authentificationUserAttrsVMap.photo_url,
  auth_date: authentificationUserAttrsVMap.auth_date,
  hash: authentificationUserAttrsVMap.hash,
};

export const authUserVMap: CommandValidatorMap<AuthentificationUserUCQuery
> = new DtoFieldValidator(
  'AuthentificationUserQuery',
  true,
  { isArray: false },
  'dto',
  AuthentificationUserAttrsVMap,
);