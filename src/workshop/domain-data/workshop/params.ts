import { UuidType } from 'rilata/src/common/types';
import { GroupRoleAttrs } from 'rilata/src/domain/domain-object/types';
import { DomainMeta } from 'rilata/src/domain/domain-data/domain-types';
import { AggregateRootDataParams } from 'rilata/src/domain/domain-data/params-types';
import { Location } from '../../../types';

export type WorkshopAttrs = {
  workshopId: UuidType,
  name: string,
  city: string,
  address: string,
  location: Location,
  employeesRole: GroupRoleAttrs
}

export type WorkshopMeta = DomainMeta<'WorkshopAR'>;

export type WorkshopParams = AggregateRootDataParams<
  WorkshopAttrs, WorkshopMeta, never, []
>;
