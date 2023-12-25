import { Repositoriable } from 'rilata2/src/domain/repositoriable';
import { TelegramId } from '../../../types';
import { UserAR } from './a-root';

export interface UserCmdRepository {
  findByTelegramId(telegramId: TelegramId): Promise<UserAR[]>
}

export const UserCmdRepository = {
  instance(repoResolver: Repositoriable): UserCmdRepository {
    return repoResolver.getRepository(UserCmdRepository) as UserCmdRepository;
  },
};
