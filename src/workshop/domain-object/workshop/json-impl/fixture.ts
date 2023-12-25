import { WorkshopAttrs } from '../../../domain-data/workshop/params';

export const testWorkshopsRecords: (WorkshopAttrs & { version: number })[] = [
  {
    version: 0,
    workshopId: '6f91d305-3f4b-4a3d-9bef-72cf3757cc33',
    name: 'Nurbolat',
    city: 'Freital',
    address: 'Gerti-Bruns-Weg 4/7 70279 Freital',
    location: { latitude: 88.958285, longitude: 117.84182 },
    employeesRole: { userIds: ['fb8a83cf-25a3-2b4f-86e1-27f6de6d8374', '3312a8d6-67ab-4e87-8a21-9d17f508fd5c'] },
  },
  {
    version: 0,
    workshopId: 'a2c1e599-8a67-4c14-b95b-5f9c1ac37e12',
    name: 'Dmitriy',
    city: 'Paris',
    address: 'Rue de la République, 75001 Paris',
    location: { latitude: 48.8566, longitude: 2.3522 },
    employeesRole: { userIds: ['3f12a8d6-67ab-4e87-8a21-9d17f508fd5c'] },
  },
  {
    version: 0,
    workshopId: 'b7d5e210-19c8-43df-8cfd-9643b9f88275',
    name: 'Elena',
    city: 'Venecia',
    address: 'Via della Conciliazione, 00193 Roma',
    location: { latitude: 41.9028, longitude: 12.4534 },
    employeesRole: { userIds: ['6f7d9a45-82c3-4a1b-a7b8-1e55b209f421'] },
  },
];

export const testWorkshopsRecordsAsJson = JSON.stringify(testWorkshopsRecords);

export function getMyWorkshopRecords(attrs: Partial<WorkshopAttrs>): string {
  return JSON.stringify([{ ...testWorkshopsRecords[2], ...attrs }]);
}
