import { Logger } from 'rilata2/src/common/logger/logger';
import { UserAttrs } from '../../domain-data/user/params';
import { userAttrsVMap } from '../../domain-data/user/v-map';
import { UserRepository } from '../../domain-object/user/repository';
import { UserAttrsPropertyNames } from './types';

export class UserArJsonRepositoryImpl implements UserRepository {
  private users: UserAttrs[];

  constructor(jsonUsers: string, logger: Logger) {
    this.users = JSON.parse(jsonUsers);
    this.users.forEach((user) => {
      (Object.keys(user) as UserAttrsPropertyNames[]).forEach((key) => {
        const validationResult = userAttrsVMap[key].validate(user[key]);
        if (validationResult.isFailure() === true) {
          logger.error(
            'Ошибка при валидаций передаваемого в конструктор списков пользователей в виде json',
            validationResult.value,
          );
        }
      });
    });
  }

  findByTelegramId(telegramId: number): UserAttrs[] {
    return this.users.filter((user) => user.telegramId === telegramId);
  }
}
