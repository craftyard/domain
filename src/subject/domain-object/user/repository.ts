import { Repositoriable } from 'rilata/src/app/resolves/repositoriable';
import { UserId } from 'rilata/src/common/types';
import { Result } from 'rilata/src/common/result/types';
import { TelegramId } from '../../../types';
import { UserAR } from './a-root';
import { UserAttrs } from '../../domain-data/user/params';
import { UserDoesNotExistError } from '../../service/user/get-user/s-params';

export interface UserRepository {
  init(resolver: Repositoriable): void
  getUsers(userIds: UserId[]): Promise<UserAttrs[]>
  getUser(userId: UserId): Promise<Result<UserDoesNotExistError, UserAttrs>>
  findByTelegramId(telegramId: TelegramId): Promise<UserAR[]>
}

export const UserRepository = {
  instance(repoResolver: Repositoriable): UserRepository {
    return repoResolver.getRepository(UserRepository) as UserRepository;
  },
};
