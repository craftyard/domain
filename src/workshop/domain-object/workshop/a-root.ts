import { AggregateRoot } from 'rilata2/src/domain/domain-object/aggregate-root';
import { Logger } from 'rilata2/src/common/logger/logger';
import { AggregateRootHelper } from 'rilata2/src/domain/domain-object/aggregate-helper';
import { AssertionException } from 'rilata2/src/common/exeptions';
import { WorkshopAttrs, WorkshopParams } from '../../domain-data/workshop/params';
import { workshopARValidator } from '../../domain-data/workshop/v-map';

export class WorkshopAR extends AggregateRoot<WorkshopParams> {
  protected helper: AggregateRootHelper<WorkshopParams>;

  constructor(
    protected attrs: WorkshopAttrs,
    protected version: number,
    protected logger: Logger,
  ) {
    super();
    const result = workshopARValidator.validate(attrs);
    if (result.isFailure()) {
      const errStr = 'Не соблюдены инварианты WorkshopAR';
      this.logger.error(errStr, { attrs, result });
      throw new AssertionException(errStr);
    }
    this.helper = new AggregateRootHelper('WorkshopAR', attrs, version, [], logger);
  }

  override getId(): string {
    return this.attrs.workshopId;
  }

  getShortName(): string {
    return this.attrs.name;
  }
}
