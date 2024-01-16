import { Repositoriable } from 'rilata/src/app/resolves/repositoriable';
import { UserId } from 'rilata/src/common/types';
import { Result } from 'rilata/src/common/result/types';
import { UserAttrs } from '../../domain-data/user/params';
import { UserDoesNotExistError } from '../../domain-data/user/get-user/s-params';

export interface UserReadRepository {
  getUsers(userIds: UserId[]): Promise<UserAttrs[]>
  getUser(userId: UserId): Promise<Result<UserDoesNotExistError, UserAttrs>>
}

export const UserReadRepository = {
  instance(repoResolver: Repositoriable): UserReadRepository {
    return repoResolver.getRepository(UserReadRepository) as UserReadRepository;
  },
};
