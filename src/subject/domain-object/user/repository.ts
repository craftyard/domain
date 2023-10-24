import { TelegramId } from "../../../types";
import { UserAttrs } from "../../domain-data/user/params";
import { Facadable } from "rilata2/src/domain/facadable";

export interface UserRepository {
  getByTelegramId(telegramId: TelegramId): UserAttrs
}

export const UserRepository = {
  instance(facadable: Facadable): UserRepository {
    return facadable.getFacade(UserRepository) as UserRepository;
  }
}
