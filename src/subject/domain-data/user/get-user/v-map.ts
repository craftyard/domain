/* eslint-disable function-paren-newline */
import { DtoFieldValidator } from 'rilata/src/domain/validator/field-validator/dto-field-validator';
import { ValidatorMap } from 'rilata/src/domain/validator/field-validator/types';
import { LiteralFieldValidator } from 'rilata/src/domain/validator/field-validator/literal-field-validator';
import { UUIDFormatValidationRule } from 'rilata/src/domain/validator/rules/validate-rules/string/uuid-format.v-rule';
import { ActionDodValidator, GetActionDodBody } from 'rilata/src/app/service/types';
import { GetingUserServiceParams } from './s-params';

const getingUserVMap: ValidatorMap<GetActionDodBody<GetingUserServiceParams>> = {
  userId: new LiteralFieldValidator('userId', true, { isArray: false }, 'string', [
    new UUIDFormatValidationRule(),
  ]),
};

// eslint-disable-next-line max-len
export const getUserValidator: ActionDodValidator<GetingUserServiceParams> = new DtoFieldValidator(
  'getUser', true, { isArray: false }, 'dto', getingUserVMap,
);
