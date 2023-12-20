import { Repositoriable } from 'rilata2/src/domain/repositoriable';
import { UserId } from 'rilata2/src/common/types';
import { TelegramId } from '../../../types';
import { UserAttrs } from '../../domain-data/user/params';

export interface UserRepository {
  getUsers(userIds: UserId[]): Promise<UserAttrs[]>

  findByTelegramId(telegramId: TelegramId): Promise<UserAttrs[]>
}

export const UserRepository = {
  instance(repoResolver: Repositoriable): UserRepository {
    return repoResolver.getRepository(UserRepository) as UserRepository;
  },
};
