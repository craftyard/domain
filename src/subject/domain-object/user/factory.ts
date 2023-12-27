import { AggregateFactory } from 'rilata2/src/domain/domain-object/aggregate-factory';
import { Caller } from 'rilata2/src/app/caller';
import { UserAttrs, UserParams } from '../../domain-data/user/params';
import { UserAR } from './a-root';

export class UserFactory extends AggregateFactory<UserParams> {
  create(caller: Caller, attrs: UserAttrs): UserAR {
    return new UserAR(attrs, 0, this.logger);
  }

  restore(userAttrs: UserAttrs, version: number): UserAR {
    return new UserAR(userAttrs, version, this.logger);
  }
}
