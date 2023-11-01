import { UuidType } from 'rilata2/src/common/types';
import { AggregateRootDataParams } from 'rilata2/src/domain/domain-object-data/aggregate-data-types';
import { DomainMeta } from 'rilata2/src/domain/domain-object-data/common-types';

export type Roles = ['Manager', 'Owner', 'Master']

export type EmployeeAttrs = {
  employeeId: UuidType,
  roles: Roles,
  workshopId: UuidType,
}

export type EmployeeMeta = DomainMeta<'EmployeeAR'>;

export type EmployeeParams = AggregateRootDataParams<
  EmployeeAttrs, EmployeeMeta, never
>;
