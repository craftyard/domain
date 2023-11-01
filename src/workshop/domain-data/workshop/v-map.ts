import { ValidatorMap } from 'rilata2/src/domain/validator/field-validator/types';
import { UuidField } from 'rilata2/src/domain/validator/field-validator/prepared-fields/string/uuid-field';
import { LiteralFieldValidator } from 'rilata2/src/domain/validator/field-validator/literal-field-validator';
import { MaxCharsCountValidationRule } from 'rilata2/src/domain/validator/rules/validate-rules/string/max-chars-count.v-rule';
import { RangeNumberValidationRule } from 'rilata2/src/domain/validator/rules/validate-rules/number/range-number.v-rule';
import { DtoFieldValidator } from "rilata2/src/domain/validator/field-validator/dto-field-validator";
import { OnlyHyphenAndLitinicOrCyrillicCharsValidationRule } from "../../../common/val-rules/only-dash-and-latinic-or-cyrillic-chars.v-rule";
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
    { isArray: false },
    'number',
    [new RangeNumberValidationRule(-180, 360)],
  ),
};

export const workshopVMap: ValidatorMap<WorkshopAttrs> = {
    workshopId: new UuidField("workshopId"),
    name: new LiteralFieldValidator("name", true, { isArray: false }, "string", [
        new MaxCharsCountValidationRule(50),
        new OnlyHyphenAndLitinicOrCyrillicCharsValidationRule(),
      ]),
    city: new LiteralFieldValidator("city", true, { isArray: false }, "string", [
        new MaxCharsCountValidationRule(50),
        new OnlyHyphenAndLitinicOrCyrillicCharsValidationRule(),
      ]),
    address: new LiteralFieldValidator("address", true, { isArray: false }, "string", [ new MaxCharsCountValidationRule(250) ]),
    location: new DtoFieldValidator("location", true, { isArray: false}, "dto", locationAttrsValidatorMap)
}
