import { UuidType } from 'rilata2/src/common/types';
import { AggregateRootDataParams } from 'rilata2/src/domain/domain-object-data/aggregate-data-types';
import { DomainMeta } from 'rilata2/src/domain/domain-object-data/common-types';

export type EmployeerAttrs = {
  employeerId: UuidType,
  roles: ('Manager' | 'Owner' | 'Master')[],
  workshopId: UuidType,
}

export type EmployeerMeta = DomainMeta<'EmployeerAR'>;

export type EmployeerParams = AggregateRootDataParams<
  EmployeerAttrs, EmployeerMeta, never
>;
