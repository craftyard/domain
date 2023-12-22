import { Logger } from 'rilata2/src/common/logger/logger';
import { DtoFieldValidator } from 'rilata2/src/domain/validator/field-validator/dto-field-validator';
import { UserId } from 'rilata2/src/common/types';
import { WorkshopAttrs } from '../../../domain-data/workshop/params';
import { workshopAttrsVMap } from '../../../domain-data/workshop/v-map';
import { WorkshopRepository } from '../repository';

export class WorkshopJsonRepository implements WorkshopRepository {
  private workshops: WorkshopAttrs[];

  constructor(jsonWorkshop: string, logger: Logger) {
    this.workshops = JSON.parse(jsonWorkshop);
    const workshopVMap = new DtoFieldValidator('workshopMap', true, { isArray: true }, 'dto', workshopAttrsVMap);
    const result = workshopVMap.validate(this.workshops);
    if (result.isFailure()) logger.error('Входящие данные не валидны', result.value);
  }

  async findWorkshopByUserId(userId: UserId): Promise<WorkshopAttrs | undefined> {
    // eslint-disable-next-line max-len
    const foundWorkshop = this.workshops.find((workshop) => workshop.employeesRole.userIds.includes(userId));
    return foundWorkshop;
  }
}
