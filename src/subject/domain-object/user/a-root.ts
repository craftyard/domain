// eslint-disable-next-line max-classes-per-file
import { AggregateRoot } from 'rilata2/src/domain/domain-object/aggregate-root';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { AuthentificationUserDomainQuery, JwtToken } from '../../domain-data/user/user-authentification.a-params';
import { UserAttrs, UserMeta, UserParams } from '../../domain-data/user/params';

dotenv.config();

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class UserAR extends AggregateRoot<UserParams> {
  protected attrs: UserAttrs;

  protected version: number;

  constructor(private configService: ConfigService, attrs: UserAttrs, version: number) {
    super();
    this.attrs = attrs;
    this.version = version;
  }

  protected getMeta(): UserMeta {
    return {
      name: 'UserAR',
      domainType: 'domain-object',
      objectType: 'aggregate',
    };
  }

  getShortName(): string {
    throw new Error('Method not implemented.');
  }

  private loadUsersData(): UserAttrs {
    const usersData = fs.readFileSync('users.json', 'utf-8');
    return JSON.parse(usersData);
  }

  userAuthentification(authQuery: AuthentificationUserDomainQuery): JwtToken | AuthenticationError {
    const botToken = this.configService.get('BOT_TOKEN_TELEGRAM');

    if (this.isValidUser(authQuery, botToken)) {
      const jwtToken = this.generateJwtToken(authQuery);
      return jwtToken;
    }
    throw new AuthenticationError('Неверные учетные данные');
  }

  private isValidUser(authQuery: AuthentificationUserDomainQuery, botToken: string): boolean {
    const usersData = this.loadUsersData();
    const { id, first_name, Last_name, username, photo_url, auth_date, hash } = authQuery;
    const computedHash = crypto
      .createHmac('sha256', botToken)
      .update(`${id}${first_name}${Last_name}${username}${photo_url}${auth_date}`)
      .digest('hex');
    if (hash === computedHash) {
      const user = usersData.find((userData) => userData.telegramId === authQuery.telegramId);
      if (user) {
        return true;
      }
    }
    return false;
  }

  private generateJwtToken(authQuery: AuthentificationUserDomainQuery): JwtToken {
    const usersData = this.loadUsersData();

    const user = usersData.find((userData) => userData.telegramId === authQuery.telegramId);

    if (!user) {
      throw new AuthenticationError('Пользователь не найден');
    }
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    const token = jwt.sign(user, jwtSecret, { expiresIn: '1h' });

    const refreshToken = this.generateRefreshToken(user);

    return { token, refreshToken };
  }

  private generateRefreshToken(user: any): string {
    const refreshSecret = this.configService.get<string>('REFRESH_SECRET');

    const refreshToken = jwt.sign(user, refreshSecret, { expiresIn: '7d' });
    return refreshToken;
  }
}
