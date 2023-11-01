import { UUIDFormatValidationRule } from 'rilata2/src/domain/validator/rules/validate-rules/string/uuid-format.v-rule';
import { LiteralFieldValidator } from 'rilata2/src/domain/validator/field-validator/literal-field-validator';

export class NoRequiredUuidField<N extends string>
  extends LiteralFieldValidator<N, false, false, string> {
  constructor(attrName: N) {
    super(
      attrName,
      false,
      { isArray: false },
      'string',
      [new UUIDFormatValidationRule()],
    );
  }
}
