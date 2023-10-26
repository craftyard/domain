import { UserAttrs } from '../../domain-data/user/params';
import { UserRepository } from '../../domain-object/user/repository';

export class UserArJsonRepositoryImpl implements UserRepository {
  private users: UserAttrs[];

  constructor(jsonUsers: string) {
    this.users = JSON.parse(jsonUsers);
  }

  findByTelegramId(telegramId: number): UserAttrs[] {
    throw new Error('Method not implemented.');
  }
}
