import { ModuleResolver } from 'rilata/src/app/module/module-resolver';
import { ModuleResolveInstance } from 'rilata/src/app/resolves/types';
import { AuthJwtPayload } from './jwt-types';
import { AuthModule } from './module';
import { AuthModuleResolves } from './resolves';

export class AuthModuleResolver extends ModuleResolver<
  AuthJwtPayload, AuthModule, AuthModuleResolves
> {
  getRealisation(...args: unknown[]): ModuleResolveInstance {
    throw new Error('Method not implemented.');
  }

  getRepository(...args: unknown[]): ModuleResolveInstance {
    throw new Error('Method not implemented.');
  }

  getFacade(...args: unknown[]): ModuleResolveInstance {
    throw new Error('Method not implemented.');
  }

  getTelegramAuthHashLifetimeLimitAsSeconds(): number {
    return this.resolves.telegramAuthHashLifetimeLimitAsSeconds ?? 10;
  }
}
