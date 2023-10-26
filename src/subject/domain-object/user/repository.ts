import { TelegramId } from "../../../types";
import { UserAttrs } from "../../domain-data/user/params";
import { Repositoriable } from "rilata2/src/domain/repositoriable";

export interface UserRepository {
  findByTelegramId(telegramId: TelegramId): UserAttrs[]
}

export const UserRepository = {
  instance(repoResolver: Repositoriable): UserRepository {
    return repoResolver.getRepository(UserRepository) as UserRepository;
  }
}
