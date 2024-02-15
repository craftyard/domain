import { Logger } from 'rilata/src/common/logger/logger';
import { DtoFieldValidator } from 'rilata/src/domain/validator/field-validator/dto-field-validator';
import { UserId } from 'rilata/src/common/types';
import { dtoUtility } from 'rilata/src/common/utils/dto';
import { AssertionException } from 'rilata/src/common/exeptions';
import { WorkshopAttrs } from '../../../domain-data/workshop/params';
import { workshopAttrsVMap } from '../../../domain-data/workshop/v-map';
import { WorkshopReadRepository } from '../repository';

type WorkshopRecords = WorkshopAttrs & { version: number };

export class WorkshopJsonRepository implements WorkshopReadRepository {
  private workshopRecord: WorkshopRecords[];

  constructor(jsonWorkshop: string, protected logger: Logger) {
    this.workshopRecord = JSON.parse(jsonWorkshop);
    const workshopVMap = new DtoFieldValidator('workshopMap', true, { isArray: true }, 'dto', workshopAttrsVMap);
    const result = workshopVMap.validate(this.workshopRecord);
    if (result.isFailure()) {
      const errStr = 'Входящие данные не валидны';
      logger.error(errStr, result.value);
      throw new AssertionException(errStr);
    }
  }

  async findWorkshopByUserId(userId: UserId): Promise<WorkshopAttrs | undefined> {
    const foundWorkshop = this.workshopRecord
      .find((workshop) => workshop.employeesRole.userIds.includes(userId));
    if (foundWorkshop) {
      return dtoUtility.excludeAttrs(foundWorkshop, 'version');
    }
    return undefined;
  }
}
