import { describe, expect, test } from 'bun:test';
import { EmployeeAttrs, Roles } from './params';
import { employeeVMap } from './v-map';

describe('tests to check the properties of a workshop employee object', () => {
  test('Success, attributes are valid, employee with one role', () => {
    const employeeAttrs: EmployeeAttrs = {
      employeeId: '9a095f57-a11e-4874-bb15-70ea85c8f211',
      roles: ['Manager'],
      workshopId: 'dfc74516-5955-4ed3-9129-ba65d02bc8fe',
    };
    expect(employeeVMap.employeeId.validate(employeeAttrs.employeeId).value).toBeUndefined();
    expect(employeeVMap.roles.validate(employeeAttrs.roles).value).toBeUndefined();
    expect(employeeVMap.workshopId.validate(employeeAttrs.workshopId).value).toBeUndefined();
  });

  test('Success, attributes are valid, employee with multiple roles', () => {
    const employeeAttrs: EmployeeAttrs = {
      employeeId: '9a095f57-a11e-4874-bb15-70ea85c8f211',
      roles: ['Manager', 'Owner', 'Master', 'Master'],
      workshopId: 'dfc74516-5955-4ed3-9129-ba65d02bc8fe',
    };
    expect(employeeVMap.employeeId.validate(employeeAttrs.employeeId).value).toBeUndefined();
    expect(employeeVMap.roles.validate(employeeAttrs.roles).value).toBeUndefined();
    expect(employeeVMap.workshopId.validate(employeeAttrs.workshopId).value).toBeUndefined();
  });

  test('Success, attributes are valid, employee with all allowed roles', () => {
    const employeeAttrs: EmployeeAttrs = {
      employeeId: '9a095f57-a11e-4874-bb15-70ea85c8f211',
      roles: ['Manager', 'Owner', 'Master'],
      workshopId: 'dfc74516-5955-4ed3-9129-ba65d02bc8fe',
    };
    expect(employeeVMap.employeeId.validate(employeeAttrs.employeeId).value).toBeUndefined();
    expect(employeeVMap.roles.validate(employeeAttrs.roles).value).toBeUndefined();
    expect(employeeVMap.workshopId.validate(employeeAttrs.workshopId).value).toBeUndefined();
  });

  test('failure, employeeId value does not match UUID format', () => {
    const employeeAttrs: EmployeeAttrs = {
      employeeId: '9a095f57-a11e-48esflsdg;dlg0ea85c8f211',
      roles: ['Manager'],
      workshopId: 'dfc74516-5955-4ed3-9129-ba65d02bc8fe',
    };
    expect(employeeVMap.employeeId.validate(employeeAttrs.employeeId).value).toEqual({
      employeeId: [
        {
          text: 'Значение должно соответствовать формату UUID',
          hint: {},
        },
      ],
    });
    expect(employeeVMap.roles.validate(employeeAttrs.roles).value).toBeUndefined();
    expect(employeeVMap.workshopId.validate(employeeAttrs.workshopId).value).toBeUndefined();
  });

  test('failure, there is a value not from the list roles', () => {
    const employeeAttrs: EmployeeAttrs = {
      employeeId: '9a095f57-a11e-4874-bb15-70ea85c8f211',
      roles: ['Manager', 'Owner', 'Guest'] as Roles[],
      workshopId: 'dfc74516-5955-4ed3-9129-ba65d02bc8fe',
    };
    expect(employeeVMap.employeeId.validate(employeeAttrs.employeeId).value).toBeUndefined();
    expect(employeeVMap.roles.validate(employeeAttrs.roles).value).toEqual({
      2: {
        roles: [
          {
            text: 'Значение должно быть одним из значений списка',
            hint: {
              choices: ['Manager', 'Owner', 'Master'],
            },
          },
        ],
      },
    });
    expect(employeeVMap.workshopId.validate(employeeAttrs.workshopId).value).toBeUndefined();
  });

  test('failure, value roles cannot be empty', () => {
    const employeeAttrs: EmployeeAttrs = {
      employeeId: '9a095f57-a11e-4874-bb15-70ea85c8f211',
      roles: [] as Roles[],
      workshopId: 'dfc74516-5955-4ed3-9129-ba65d02bc8fe',
    };
    expect(employeeVMap.employeeId.validate(employeeAttrs.employeeId).value).toBeUndefined();
    expect(employeeVMap.roles.validate(employeeAttrs.roles).value).toEqual({
      ___array_whole_value_validation_error___: [
        {
          text: 'Минимальное количество элементов может быть {{min}}, сейчас {{currentCount}}',
          hint: {
            min: 1,
            currentCount: 0,
          },
        },
      ],
    });
    expect(employeeVMap.workshopId.validate(employeeAttrs.workshopId).value).toBeUndefined();
  });
  test('failure, workshopId value does not match UUID format', () => {
    const employeeAttrs: EmployeeAttrs = {
      employeeId: '9a095f57-a11e-4874-bb15-70ea85c8f211',
      roles: ['Owner'],
      workshopId: 'dfc74516ba65d02bc8fe',
    };
    expect(employeeVMap.employeeId.validate(employeeAttrs.employeeId).value).toBeUndefined();
    expect(employeeVMap.roles.validate(employeeAttrs.roles).value).toBeUndefined();
    expect(employeeVMap.workshopId.validate(employeeAttrs.workshopId).value).toEqual({
      workshopId: [
        {
          text: 'Значение должно соответствовать формату UUID',
          hint: {},
        },
      ],
    });
  });

  test('failure, there is a value not from the list roles', () => {
    const employeeAttrs: EmployeeAttrs = {
      employeeId: '9a095f57-a11e-4874-bb15-70ea85c8f211',
      roles: ['Manager', 'Owner', 'Master', 'Generalisimus'] as Roles[],
      workshopId: 'dfc74516-5955-4ed3-9129-ba65d02bc8fe',
    };
    expect(employeeVMap.employeeId.validate(employeeAttrs.employeeId).value).toBeUndefined();
    expect(employeeVMap.roles.validate(employeeAttrs.roles).value).toEqual({
      3: {
        roles: [
          {
            text: 'Значение должно быть одним из значений списка',
            hint: {
              choices: ['Manager', 'Owner', 'Master'],
            },
          },
        ],
      },
    });
    expect(employeeVMap.workshopId.validate(employeeAttrs.workshopId).value).toBeUndefined();
  });
});
