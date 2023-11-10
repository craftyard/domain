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

export function verifyTelegramPayload(payload: TelegramLoginPayload, secret: Buffer): boolean {
  const rawData = Object
    .entries(payload)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([key, value]) => key !== 'hash')
    .map(([key, value]) => `${key}=${value}`)
    .sort()
    .join('\n');
  const calcHash = crypto.createHmac('sha256', secret).update(rawData).digest('hex');
  return payload.hash === calcHash;
}

export class TelegramLogin {
  private secret: Buffer;

  constructor(token: string) {
    this.secret = crypto.createHash('sha256').update(token).digest();
  }

  checkValidData(data: TelegramLoginPayload): boolean {
    return verifyTelegramPayload(data, this.secret);
  }
}
