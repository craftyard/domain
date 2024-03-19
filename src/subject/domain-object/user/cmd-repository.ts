import { Repositoriable } from 'rilata/src/app/resolves/repositoriable';
import { TelegramId } from '../../../types';
import { UserAR } from './a-root';

export interface UserCmdRepository {
  init(resolver: Repositoriable): void
  findByTelegramId(telegramId: TelegramId): Promise<UserAR[]>
}

export const UserCmdRepository = {
  instance(repoResolver: Repositoriable): UserCmdRepository {
    return repoResolver.getRepository(UserCmdRepository) as UserCmdRepository;
  },
};
