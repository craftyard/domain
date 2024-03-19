import { GeneralModuleResolver } from 'rilata/src/app/module/types';
import { Result } from 'rilata/src/common/result/types';
import { UserId } from 'rilata/src/common/types';
import { Facadable } from 'rilata/src/app/resolves/facadable';
import { UserAttrs } from './domain-data/user/params';
import { UserDoesNotExistError } from './domain-data/user/get-user/s-params';
import { TelegramId } from '../types';
import { UserAR } from './domain-object/user/a-root';

export interface SubjectFacade {
  init(resolver: GeneralModuleResolver): void;
  getUsers(userIds: UserId[]): Promise<UserAttrs[]>
  getUser(userId: UserId): Promise<Result<UserDoesNotExistError, UserAttrs>>
  findByTelegramId(telegramId: TelegramId): Promise<UserAR[]>
}

export const SubjectFacade = {
  instance(resolver: Facadable): SubjectFacade {
    return resolver.getFacade(SubjectFacade) as SubjectFacade;
  },
};
