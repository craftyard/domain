import { AggregateRoot } from 'rilata/src/domain/domain-object/aggregate-root';
import { AggregateRootHelper } from 'rilata/src/domain/domain-object/aggregate-helper';
import { Logger } from 'rilata/src/common/logger/logger';
import { AssertionException } from 'rilata/src/common/exeptions';
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
      const errStr = 'Не соблюдены инварианты ModelAR';
      this.logger.error(errStr, { attrs, result });
      throw new AssertionException(errStr);
    }
    this.helper = new AggregateRootHelper('ModelAR', attrs, version, [], logger);
  }

  getId(): string {
    throw new Error('Method not implemented.');
  }

  getShortName(): string {
    return this.attrs.name;
  }

  getCategory():string {
    return this.attrs.category;
  }
}
