import { AggregateFactory } from 'rilata2/src/domain/domain-object/aggregate-factory';
import { Logger } from 'rilata2/src/common/logger/logger';
import { Caller } from 'rilata2/src/app/caller';
import { AggregateRoot } from 'rilata2/src/domain/domain-object/aggregate-root';
import { GeneralAR } from 'rilata2/src/domain/domain-object/types';
import { UserAttrs, UserParams } from '../../domain-data/user/params';
import { UserAR } from './a-root';

export class UserFactory extends AggregateFactory<UserParams> {
  constructor(protected logger: Logger) { super(); }

  create(caller: Caller, command: UserAttrs): AggregateRoot<UserParams> {
    throw Error('should not be called until JSON implementation');
  }

  restore(userAttrs: UserAttrs, version: number): GeneralAR {
    return new UserAR(userAttrs, version, this.logger);
  }
}
