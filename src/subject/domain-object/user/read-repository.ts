import { Repositoriable } from 'rilata/src/app/resolves/repositoriable';
import { UserId } from 'rilata/src/common/types';
import { UserAttrs } from '../../domain-data/user/params';

export interface UserReadRepository {
  getUsers(userIds: UserId[]): Promise<UserAttrs[]>
}

export const UserReadRepository = {
  instance(repoResolver: Repositoriable): UserReadRepository {
    return repoResolver.getRepository(UserReadRepository) as UserReadRepository;
  },
};
