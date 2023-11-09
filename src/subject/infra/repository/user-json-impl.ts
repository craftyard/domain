import { Logger } from 'rilata2/src/common/logger/logger';
import { DtoFieldValidator } from 'rilata2/src/domain/validator/field-validator/dto-field-validator';
import { UserAttrs } from '../../domain-data/user/params';
import { userAttrsVMap } from '../../domain-data/user/v-map';
import { UserRepository } from '../../domain-object/user/repository';

export class UserArJsonRepositoryImpl implements UserRepository {
  private users: UserAttrs[];

  constructor(jsonUsers: string, logger: Logger) {
    this.users = JSON.parse(jsonUsers);
    const validator = new DtoFieldValidator('user', true, { isArray: true, mustBeFilled: true }, 'dto', userAttrsVMap);
    const validateResult = validator.validate(this.users);
    if (validateResult.isFailure()) logger.error('Входящие данные не валидны', validateResult.value);
  }

  findByTelegramId(telegramId: number): UserAttrs[] {
    return this.users.filter((user) => user.telegramId === telegramId);
  }
}
