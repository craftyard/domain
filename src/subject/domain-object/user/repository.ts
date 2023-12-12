import { Repositoriable } from 'rilata2/src/domain/repositoriable';
import { TelegramId } from '../../../types';
import { UserAttrs } from '../../domain-data/user/params';

export interface UserRepository {
  findByTelegramId(telegramId: TelegramId): UserAttrs[]
}

export const UserRepository = {
  instance(repoResolver: Repositoriable): UserRepository {
    return repoResolver.getRepository(UserRepository) as UserRepository;
  },
};
