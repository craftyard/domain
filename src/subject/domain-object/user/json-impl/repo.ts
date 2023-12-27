import { dtoUtility } from 'rilata2/src/common/utils/dto/';
import { Logger } from 'rilata2/src/common/logger/logger';
import { DtoFieldValidator } from 'rilata2/src/domain/validator/field-validator/dto-field-validator';
import { AssertionException } from 'rilata2/src/common/exeptions';
import { UserAttrs } from '../../../domain-data/user/params';
import { userAttrsVMap } from '../../../domain-data/user/v-map';
import { UserReadRepository } from '../read-repository';
import { UserCmdRepository } from '../cmd-repository';
import { UserAR } from '../a-root';
import { UserFactory } from '../factory';

type UserRecord = UserAttrs & { version: number };

export class UserJsonRepository implements UserReadRepository, UserCmdRepository {
  private usersRecords: UserRecord[];

  constructor(jsonUsers: string, protected logger: Logger) {
    this.usersRecords = JSON.parse(jsonUsers);
    const userVMap = new DtoFieldValidator('userMap', true, { isArray: true }, 'dto', userAttrsVMap);
    const result = userVMap.validate(this.usersRecords);
    if (result.isFailure()) {
      const errStr = 'Входящие данные не валидны';
      logger.error(errStr, result.value);
      throw new AssertionException(errStr);
    }
  }

  async getUsers(userIds: string[]): Promise<UserAttrs[]> {
    return this.usersRecords
      .filter((records) => userIds.includes(records.userId))
      .map((records) => dtoUtility.excludeAttrs(records, 'version'));
  }

  async findByTelegramId(telegramId: number): Promise<UserAR[]> {
    const usersRecords = this.usersRecords.filter((userRcd) => userRcd.telegramId === telegramId);
    const factory = new UserFactory(this.logger);
    return usersRecords.map((rcd) => factory.restore(dtoUtility.excludeAttrs(rcd, 'version'), rcd.version));
  }
}
