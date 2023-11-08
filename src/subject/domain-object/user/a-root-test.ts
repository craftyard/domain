import * as crypto from 'crypto';

export interface TelegramLoginPayload {
  id: number;
  hash?: string;
  auth_date: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

export function verifyTelegramPayload(payload: TelegramLoginPayload, secret: Buffer) {
  const hash = payload.hash;
  delete payload.hash;
  const check = crypto.createHmac('sha256', secret).update(
    Object
      .keys(payload)
      .map((key: keyof TelegramLoginPayload) => `${key}=${payload[key]}`)
      .sort()
      .join('\n'),
  ).digest('hex');
  return hash === check ? Object.assign(payload, { hash }) : false;
}

export class TelegramLogin {
  private secret: Buffer;

  constructor(token: string) {
    this.secret = crypto.createHash('sha256').update(token).digest();
  }

  chechValidData(data: TelegramLoginPayload) {
    return verifyTelegramPayload(data, this.secret);
  }
}
