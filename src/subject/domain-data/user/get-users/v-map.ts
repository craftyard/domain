/* eslint-disable function-paren-newline */
import { DtoFieldValidator } from 'rilata2/src/domain/validator/field-validator/dto-field-validator';
import { ValidatorMap } from 'rilata2/src/domain/validator/field-validator/types';
import { LiteralFieldValidator } from 'rilata2/src/domain/validator/field-validator/literal-field-validator';
import { UUIDFormatValidationRule } from 'rilata2/src/domain/validator/rules/validate-rules/string/uuid-format.v-rule';
import { ActionDodValidator, GetActionDodBody } from 'rilata2/src/app/use-case/types';
import { GetingUsersUcParams } from './uc-params';

const getingUsersVMap: ValidatorMap<GetActionDodBody<GetingUsersUcParams>> = {
  userIds: new LiteralFieldValidator('userIds', true, { isArray: true, mustBeFilled: true }, 'string', [
    new UUIDFormatValidationRule(),
  ]),
};

export const getUsersValidator: ActionDodValidator<GetingUsersUcParams> = new DtoFieldValidator(
  'getUsers', true, { isArray: false }, 'dto', getingUsersVMap,
);
