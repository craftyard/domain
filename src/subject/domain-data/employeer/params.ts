import { UuidType } from 'rilata2/src/common/types';
import { AggregateRootDataParams } from 'rilata2/src/domain/domain-object-data/aggregate-data-types';
import { DomainMeta } from 'rilata2/src/domain/domain-object-data/common-types';

export type EmployeeAttrs = {
  employeeId: UuidType,
  roles: ('Manager' | 'Owner' | 'Master')[],
  workshopId: UuidType,
}

export type EmployeeMeta = DomainMeta<'EmployeerAR'>;

export type EmployeeParams = AggregateRootDataParams<
  EmployeeAttrs, EmployeeMeta, never
>;
