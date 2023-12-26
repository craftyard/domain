import { Logger } from 'rilata2/src/common/logger/logger';
import { DtoFieldValidator } from 'rilata2/src/domain/validator/field-validator/dto-field-validator';
import { UserId } from 'rilata2/src/common/types';
import { dtoUtility } from 'rilata2/src/common/utils/dto';
import { WorkshopAttrs } from '../../../domain-data/workshop/params';
import { workshopAttrsVMap } from '../../../domain-data/workshop/v-map';
import { WorkshopRepository } from '../repository';
import { WorkshopFactory } from '../factory';

type WorkshopRecords = WorkshopAttrs & { version: number };

export class WorkshopJsonRepository implements WorkshopRepository {
  private workshopRecord: WorkshopRecords[];

  constructor(jsonWorkshop: string, protected logger: Logger) {
    this.workshopRecord = JSON.parse(jsonWorkshop);
    const workshopVMap = new DtoFieldValidator('workshopMap', true, { isArray: true }, 'dto', workshopAttrsVMap);
    const result = workshopVMap.validate(this.workshopRecord);
    if (result.isFailure()) logger.error('Входящие данные не валидны', result.value);
  }

  async findWorkshopByUserId(userId: UserId): Promise<WorkshopAttrs | undefined> {
    const foundWorkshop = this.workshopRecord
      .find((workshop) => workshop.employeesRole.userIds.includes(userId));
    if (foundWorkshop) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { version, ...workshopWithoutVersion } = foundWorkshop;
      const factory = new WorkshopFactory(this.logger);
      const workshop = factory.restore(dtoUtility.excludeAttrs(foundWorkshop, 'version'), version);
      return workshop.getAttrs();
    }
    return undefined;
  }
}
