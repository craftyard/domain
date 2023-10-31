import { ValidatorMap } from "rilata2/src/domain/validator/field-validator/types";
import { WorkshopAttrs } from "./params";
import { Location } from "../../../types";
import { UuidField } from "rilata2/src/domain/validator/field-validator/prepared-fields/string/uuid-field";
import { LiteralFieldValidator } from 'rilata2/src/domain/validator/field-validator/literal-field-validator';
import { RegexFormatValidationRule } from 'rilata2/src/domain/validator/rules/validate-rules/string/regex.field-v-rule';
import { MaxCharsCountValidationRule } from 'rilata2/src/domain/validator/rules/validate-rules/string/max-chars-count.v-rule';
import { RangeNumberValidationRule } from 'rilata2/src/domain/validator/rules/validate-rules/number/range-number.v-rule';
import { DtoFieldValidator } from "rilata2/src/domain/validator/field-validator/dto-field-validator";
import { OnlyHyphenAndLitinicOrCyrillicCharsValidationRule } from "../../../common/val-rules/only-dash-and-latinic-or-cyrillic-chars.v-rule";

const locationAttrsValidatorMap: ValidatorMap<Location> = {
    latitude: new LiteralFieldValidator(
      'latitude',
      true,
      { isArray: false },
      'number',
      [ new RangeNumberValidationRule(-90, 90) ],
    ),
    longitude: new LiteralFieldValidator(
      'longitude',
      true,
      { isArray: false },
      'number',
      [ new RangeNumberValidationRule(-180, 360) ],
    ),
};

const workshopVMap: ValidatorMap<WorkshopAttrs> = {
    workshopId: new UuidField("workshopId"),
    name: new LiteralFieldValidator("name", true, { isArray: false }, "string", [
        new MaxCharsCountValidationRule(50),
        new RegexFormatValidationRule(/^[-a-z-а-яё]+$/i, 'Строка не должна содержать символы кроме "-"(дефис)'),
        new OnlyHyphenAndLitinicOrCyrillicCharsValidationRule(),
      ]),
    city: new LiteralFieldValidator("city", true, { isArray: false }, "string", [
        new MaxCharsCountValidationRule(50),
        new RegexFormatValidationRule(/^[-a-z-а-яё]+$/i, 'Строка не должна содержать символы кроме "-"(дефис)'),
        new OnlyHyphenAndLitinicOrCyrillicCharsValidationRule(),
      ]),
    address: new LiteralFieldValidator("address", true, { isArray: false }, "string", [ new MaxCharsCountValidationRule(250) ]),
    location: new DtoFieldValidator("location", true, { isArray: false}, "dto", locationAttrsValidatorMap)
}