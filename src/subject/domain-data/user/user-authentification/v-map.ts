import { ActionDodValidator } from 'rilata2/src/app/service/types';
import { ValidatorMap } from 'rilata2/src/domain/validator/field-validator/types';
import { LiteralFieldValidator } from 'rilata2/src/domain/validator/field-validator/literal-field-validator';
import { PositiveNumberValidationRule } from 'rilata2/src/domain/validator/rules/validate-rules/number/positive-number.v-rule';
import { IsTimeStampValidationRule } from 'rilata2/src/domain/validator/rules/validate-rules/timestamp/is-timestamp.v-rule';
import { DtoFieldValidator } from 'rilata2/src/domain/validator/field-validator/dto-field-validator';
import { TelegramAuthDTO } from './a-params';
import { UserAuthentificationServiceParams } from './s-params';

const userAuthentificationVMap: ValidatorMap<TelegramAuthDTO> = {
  id: new LiteralFieldValidator('id', true, { isArray: false }, 'number', [
    new PositiveNumberValidationRule(),
  ]),
  first_name: new LiteralFieldValidator('first_name', false, { isArray: false }, 'string', []),
  last_name: new LiteralFieldValidator('last_name', false, { isArray: false }, 'string', []),
  username: new LiteralFieldValidator('username', false, { isArray: false }, 'string', []),
  photo_url: new LiteralFieldValidator('photo_url', false, { isArray: false }, 'string', []),
  auth_date: new LiteralFieldValidator('auth_date', true, { isArray: false }, 'number', [
    new IsTimeStampValidationRule(),
  ]),
  hash: new LiteralFieldValidator('hash', true, { isArray: false }, 'string', []),
};

// eslint-disable-next-line operator-linebreak
export const userAuthentificationValidator: ActionDodValidator<UserAuthentificationServiceParams> =
  new DtoFieldValidator('userAuthentification', true, { isArray: false }, 'dto', userAuthentificationVMap);
