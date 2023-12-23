import { Repositoriable } from 'rilata2/src/domain/repositoriable';
import { UserId } from 'rilata2/src/common/types';
import { UserAttrs } from '../../domain-data/user/params';

export interface UserReadRepository {
  getUsers(userIds: UserId[]): Promise<UserAttrs[]>
}

export const UserReadRepository = {
  instance(repoResolver: Repositoriable): UserReadRepository {
    return repoResolver.getRepository(UserReadRepository) as UserReadRepository;
  },
};
