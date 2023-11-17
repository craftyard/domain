/** Файл для определения типов для всех доменных модулей */
import { UserAttrs } from './subject/domain-data/user/params';

export type Location = {
  latitude: number,
  longitude: number,
}

export type TelegramId = number;

export type TokenCreatorPayload = Omit<UserAttrs, 'userProfile'>;
