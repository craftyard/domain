/* eslint-disable function-paren-newline */
import { DtoFieldValidator } from 'rilata2/src/domain/validator/field-validator/dto-field-validator';
import { ValidatorMap } from 'rilata2/src/domain/validator/field-validator/types';
import { LiteralFieldValidator } from 'rilata2/src/domain/validator/field-validator/literal-field-validator';
import { UUIDFormatValidationRule } from 'rilata2/src/domain/validator/rules/validate-rules/string/uuid-format.v-rule';
import { ActionDodValidator, GetActionDodBody } from 'rilata2/src/app/service/types';
import { GetingUsersServiceParams } from './s-params';

const getingUsersVMap: ValidatorMap<GetActionDodBody<GetingUsersServiceParams>> = {
  userIds: new LiteralFieldValidator('userIds', true, { isArray: true, mustBeFilled: true }, 'string', [
    new UUIDFormatValidationRule(),
  ]),
};

// eslint-disable-next-line max-len
export const getUsersValidator: ActionDodValidator<GetingUsersServiceParams> = new DtoFieldValidator(
  'getUsers', true, { isArray: false }, 'dto', getingUsersVMap,
);
