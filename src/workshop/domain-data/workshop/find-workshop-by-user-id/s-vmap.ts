/* eslint-disable function-paren-newline */
import { ActionDodValidator, GetActionDodBody } from 'rilata/src/app/service/types';
import { DtoFieldValidator } from 'rilata/src/domain/validator/field-validator/dto-field-validator';
import { FindWorkshopByUserIdServiceParams } from './s-params';
import { ValidatorMap } from 'rilata/src/domain/validator/field-validator/types';
import { LiteralFieldValidator } from 'rilata/src/domain/validator/field-validator/literal-field-validator';
import { UUIDFormatValidationRule } from 'rilata/src/domain/validator/rules/validate-rules/string/uuid-format.v-rule';


const gettingUserVMap: ValidatorMap<GetActionDodBody<FindWorkshopByUserIdServiceParams>> = {
  userId: new LiteralFieldValidator(
    'userId',
    true,
    { isArray: false },
    'string',
    [new UUIDFormatValidationRule()],
  ),
};

export const findWorkshopByUserIdValidator:
ActionDodValidator<FindWorkshopByUserIdServiceParams> = new DtoFieldValidator(
  'findWorkshopByUserId', true, { isArray: false }, 'dto', gettingUserVMap,
);
