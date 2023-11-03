import { callerUtility } from 'rilata2/src/common/utils/caller/caller-utility';
import { AuthentificationUserDomainQuery } from '../../domain-data/user/user-authentification.a-params';

function AuthnUserInputOptions(query: AuthentificationUserDomainQuery): {
  const caller = callerUtility.findUserId();
  const ucOptions: UserAuthenticationUCOptions = {
    caller,
    input: query,
  };

  return ucOptions;
}
