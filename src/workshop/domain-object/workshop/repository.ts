import { Repositoriable } from 'rilata/src/app/resolves/repositoriable';
import { UserId } from 'rilata/src/common/types';
import { WorkshopAttrs } from '../../domain-data/workshop/params';

export interface WorkshopReadRepository {
    findWorkshopByUserId(userId:UserId): Promise<WorkshopAttrs | undefined>;
}

export const WorkshopRepository = {
  instance(repoResolver: Repositoriable): WorkshopReadRepository {
    return repoResolver.getRepository(WorkshopRepository) as WorkshopReadRepository;
  },
};
