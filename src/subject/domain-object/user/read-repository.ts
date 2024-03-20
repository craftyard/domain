import { Repositoriable } from 'rilata/src/app/resolves/repositoriable';
import { UserId } from 'rilata/src/common/types';
import { Result } from 'rilata/src/common/result/types';
import { UserAttrs } from '../../domain-data/user/params';

import { UserAR } from './a-root';
import { TelegramId } from '../../../types';
import { UserDoesNotExistError } from '../../service/user/get-user/s-params';

export interface UserReadRepository {
  init(resolver: Repositoriable): void
  getUsers(userIds: UserId[]): Promise<UserAttrs[]>
  getUser(userId: UserId): Promise<Result<UserDoesNotExistError, UserAttrs>>
  findByTelegramId(telegramId: TelegramId): Promise<UserAR[]>
}

export const UserReadRepository = {
  instance(repoResolver: Repositoriable): UserReadRepository {
    return repoResolver.getRepository(UserReadRepository) as UserReadRepository;
  },
};
