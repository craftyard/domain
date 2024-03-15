import { Caller, DomainUser } from '../../../src/app/caller';
import { GeneralModuleResolver } from '../../../src/app/module/types';
import { Facadable } from '../../../src/app/resolves/facadable';
import { ServiceResult } from '../../../src/app/service/types';
import { AddPersonRequestDodAttrs, AddPersonServiceParams } from './services/person/add-person/s-params';
import { GetPersonByIinServiceParams } from './services/person/get-by-iin/s-params';

export interface ModelFacade {
  init(resolver: GeneralModuleResolver): void
  getPersonByIin(iin: string, caller: Caller): Promise<ServiceResult<GetPersonByIinServiceParams>>
  addPerson(
    input: AddPersonRequestDodAttrs, caller: DomainUser
  ): Promise<ServiceResult<AddPersonServiceParams>>
}

export const ModelFacade = {
  instance(resolver: Facadable): ModelFacade {
    return resolver.getFacade(ModelFacade) as ModelFacade;
  },
};
