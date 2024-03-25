import { BaseJwtDecoder } from 'rilata/src/infra/jwt/base-jwt-decoder';
import { AuthJwtPayload } from './subject/jwt-types';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DomainServerFixtures {
  export class TestJwtDecoder extends BaseJwtDecoder<AuthJwtPayload> {
    constructor(public expiredTimeShiftAsMs: number) {
      super();
    }

    verifyPayloadBody(payload: AuthJwtPayload): boolean {
      throw new Error('Method not implemented.');
    }
  }
}
