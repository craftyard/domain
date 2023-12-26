import { AggregateRoot } from 'rilata2/src/domain/domain-object/aggregate-root';
import { Logger } from 'rilata2/src/common/logger/logger';
import { AggregateRootHelper } from 'rilata2/src/domain/domain-object/aggregate-helper';
import { WorkshopAttrs, WorkshopMeta, WorkshopParams } from '../../domain-data/workshop/params';
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
    if (result.isFailure()) this.logger.error('Не соблюдены инварианты WorkshopAR', { attrs, result });
    this.helper = new AggregateRootHelper(attrs, 'WorkshopAR', version, [], logger);
  }

  override getId(): string {
    return this.attrs.workshopId;
  }

  getShortName(): string {
    return this.attrs.name;
  }

  protected getMeta(): WorkshopMeta {
    return {
      name: 'WorkshopAR',
      domainType: 'domain-object',
      objectType: 'aggregate',
    };
  }
}
