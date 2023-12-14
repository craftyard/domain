import { Logger } from 'rilata2/src/common/logger/logger';
import { DtoFieldValidator } from 'rilata2/src/domain/validator/field-validator/dto-field-validator';
import { UserAttrs } from '../../../domain-data/user/params';
import { userAttrsVMap } from '../../../domain-data/user/v-map';
import { UserRepository } from '../repository';

export class UserJsonRepository implements UserRepository {
  private users: UserAttrs[];

  constructor(jsonUsers: string, logger: Logger) {
    this.users = JSON.parse(jsonUsers);
    const userVMap = new DtoFieldValidator('userMap', true, { isArray: true }, 'dto', userAttrsVMap);
    const result = userVMap.validate(this.users);
    if (result.isFailure()) logger.error('Входящие данные не валидны', result.value);
  }

  async getUsers(userIds: string[]): Promise<UserAttrs[]> {
    return this.users.filter((user) => userIds.includes(user.userId));
  }

  findByTelegramId(telegramId: number): UserAttrs[] {
    return this.users.filter((user) => user.telegramId === telegramId);
  }
}
