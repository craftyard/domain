import { storeDispatcher } from 'rilata/src/app/async-store/store-dispatcher';
import { Middleware } from 'rilata/src/app/middleware/middleware';
import { Module } from 'rilata/src/app/module/module';
import { BunServer } from 'rilata/src/app/server/bun-server';
import { ModuleConstructors } from 'rilata/src/app/server/types';
import { Constructor } from 'rilata/src/common/types';
import { InjectCallerMiddleware } from 'rilata/src/app/middleware/inject-caller';
import { AsyncLocalStorage } from 'async_hooks';
import { ServerResolver } from 'rilata/src/app/server/server-resolver';
import { OnlyPostMethodMiddleware } from 'rilata/src/app/middleware/only-post-method';
import { SubjectModule } from './subject/module';

export namespace ServerTestFixtures {
export class TestServer extends BunServer {
  protected middlewareCtors: Constructor<Middleware>[] = [
    OnlyPostMethodMiddleware,
    InjectCallerMiddleware,
  ];

  protected moduleTupleCtors: ModuleConstructors<Module>[] = [
    [SubjectModule, SubjectModuleResolver, getSubjectResolves],
  ];

  init(serverResolver: ServerResolver): void {
    super.init(serverResolver);
    this.logger.info('start set store dispatcher for server');
    storeDispatcher.setThreadStore(new AsyncLocalStorage());
    this.logger.info('finish set store dispatcher for server');
  }
}
}
