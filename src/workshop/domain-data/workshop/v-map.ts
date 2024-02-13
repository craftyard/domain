import { ValidatorMap } from 'rilata/src/domain/validator/field-validator/types';
import { UuidField } from 'rilata/src/domain/validator/field-validator/prepared-fields/string/uuid-field';
import { LiteralFieldValidator } from 'rilata/src/domain/validator/field-validator/literal-field-validator';
import { MaxCharsCountValidationRule } from 'rilata/src/domain/validator/rules/validate-rules/string/max-chars-count.v-rule';
import { RangeNumberValidationRule } from 'rilata/src/domain/validator/rules/validate-rules/number/range-number.v-rule';
import { DtoFieldValidator } from 'rilata/src/domain/validator/field-validator/dto-field-validator';
import { OnlyDashAndLitinicOrCyrillicCharsValidationRule } from 'rilata/src/domain/validator/rules/validate-rules/string/only-dash-and-latinic-or-cyrillic-chars.v-rule';
import { GroupRoleAttrs } from 'rilata/src/domain/domain-object/types';
import { UUIDFormatValidationRule } from 'rilata/src/domain/validator/rules/validate-rules/string/uuid-format.v-rule';
import { Location } from '../../../types';
import { WorkshopAttrs } from './params';

const locationAttrsValidatorMap: ValidatorMap<Location> = {
  latitude: new LiteralFieldValidator(
    'latitude',
    true,
    { isArray: false },
    'number',
    [new RangeNumberValidationRule(-90, 90)],
  ),
  longitude: new LiteralFieldValidator(
    'longitude',
    true,
    {
      isArray: false,
    },
    'number',
    [new RangeNumberValidationRule(-180, 180)],
  ),
};

const employeesRoleValidatorMap:ValidatorMap<GroupRoleAttrs> = {
  userIds: new LiteralFieldValidator(
    'userIds',
    true,
    { isArray: true, mustBeFilled: true },
    'string',
    [new UUIDFormatValidationRule()],
  ),
};

export const workshopAttrsVMap: ValidatorMap<WorkshopAttrs> = {
  workshopId: new UuidField('workshopId'),
  name: new LiteralFieldValidator('name', true, { isArray: false }, 'string', [
    new MaxCharsCountValidationRule(50),
    new OnlyDashAndLitinicOrCyrillicCharsValidationRule(),
  ]),
  city: new LiteralFieldValidator('city', true, { isArray: false }, 'string', [
    new MaxCharsCountValidationRule(50),
    new OnlyDashAndLitinicOrCyrillicCharsValidationRule(),
  ]),
  address: new LiteralFieldValidator('address', true, { isArray: false }, 'string', [new MaxCharsCountValidationRule(250)]),
  location: new DtoFieldValidator('location', true, { isArray: false }, 'dto', locationAttrsValidatorMap),
  employeesRole: new DtoFieldValidator('employeesRole', true, { isArray: false }, 'dto', employeesRoleValidatorMap),
};

export const workshopARValidator = new DtoFieldValidator('workshopAr', true, { isArray: false }, 'dto', workshopAttrsVMap);
