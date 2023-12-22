import { dtoUtility } from 'rilata2/src/common/utils/dto/';
import { Logger } from 'rilata2/src/common/logger/logger';
import { DtoFieldValidator } from 'rilata2/src/domain/validator/field-validator/dto-field-validator';
import { UserAttrs } from '../../../domain-data/user/params';
import { userAttrsVMap } from '../../../domain-data/user/v-map';
import { UserReadRepository } from '../read-repository';
import { UserCmdRepository } from '../cmd-repository';
import { UserAR } from '../a-root';
import { UserFactory } from '../factory';

type UserRecord = UserAttrs & { version: number };

export class UserJsonRepository implements UserReadRepository, UserCmdRepository {
  private users: UserRecord[];

  constructor(jsonUsers: string, protected logger: Logger) {
    this.users = JSON.parse(jsonUsers);
    const userVMap = new DtoFieldValidator('userMap', true, { isArray: true }, 'dto', userAttrsVMap);
    const result = userVMap.validate(this.users);
    if (result.isFailure()) logger.error('Входящие данные не валидны', result.value);
  }

  async getUsers(userIds: string[]): Promise<UserAttrs[]> {
    return this.users.filter((user) => userIds.includes(user.userId));
  }

  async findByTelegramId(telegramId: number): Promise<UserAR[]> {
    const usersAttrs = this.users.filter((user) => user.telegramId === telegramId);
    const factory = new UserFactory(this.logger);
    return usersAttrs.map((attrs) => factory.restore(dtoUtility.excludeAttrs(attrs, 'version'), attrs.version));
  }
}
