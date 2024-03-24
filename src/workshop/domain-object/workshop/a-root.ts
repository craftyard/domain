import { AggregateRoot } from 'rilata/src/domain/domain-object/aggregate-root';
import { Logger } from 'rilata/src/common/logger/logger';
import { AggregateRootHelper } from 'rilata/src/domain/domain-object/aggregate-helper';
import { DtoFieldValidator } from 'rilata/src/domain/validator/field-validator/dto-field-validator';
import { WorkshopAttrs, WorkshopParams } from '../../domain-data/workshop/params';
import { workshopAttrsVMap } from '../../domain-data/workshop/v-map';

export class WorkshopAR extends AggregateRoot<WorkshopParams> {
  protected helper: AggregateRootHelper<WorkshopParams>;

  protected attrs: WorkshopAttrs;

  protected logger: Logger;

  constructor(attrs: WorkshopAttrs, version: number, logger: Logger) {
    super();
    this.logger = logger;
    this.checkInveriants(attrs);
    this.attrs = attrs;
    this.helper = new AggregateRootHelper<WorkshopParams>('WorkshopAR', attrs, 'workshopId', version, [], logger);
  }

  protected checkInveriants(attrs: WorkshopAttrs): void {
    const invariantValidator = new DtoFieldValidator('workshopInvariants', true, { isArray: false }, 'dto', workshopAttrsVMap);
    const invariantsResult = invariantValidator.validate(attrs);
    if (invariantsResult.isFailure()) {
      throw this.logger.error('Не соблюдены инварианты агрегата Workshop', {
        companyAttrs: attrs,
        validatorValue: invariantsResult.value,
      });
    }
  }

  override getId(): string {
    return this.attrs.workshopId;
  }

  getShortName(): string {
    return this.attrs.name;
  }
}
