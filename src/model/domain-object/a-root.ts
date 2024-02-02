import { AggregateRoot } from 'rilata/src/domain/domain-object/aggregate-root';
import { AggregateRootHelper } from 'rilata/src/domain/domain-object/aggregate-helper';
import { Logger } from 'rilata/src/common/logger/logger';
import { ModelAttrs, AddModelParams } from '../domain-data/params';
import { modelAttrsDtoVMap } from '../domain-data/v-map';

export class ModelAR extends AggregateRoot<AddModelParams> {
  protected helper: AggregateRootHelper<AddModelParams>;

  constructor(
    protected attrs: ModelAttrs,
    protected version: number,
    protected logger: Logger,
  ) {
    super();
    const result = modelAttrsDtoVMap.validate(attrs);
    if (result.isFailure()) {
      throw this.logger.error('Не соблюдены инварианты ModelAR', { attrs, result });
    }
    this.helper = new AggregateRootHelper('ModelAR', attrs, version, [], logger);
  }

  getId(): string {
    return this.attrs.modelId;
  }

  getShortName(): string {
    return `Модель: ${this.attrs.name}`;
  }

  getCategory():string {
    return this.attrs.category;
  }
}
