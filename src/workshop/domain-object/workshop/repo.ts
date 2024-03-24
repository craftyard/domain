import { Repositoriable } from 'rilata/src/app/resolves/repositoriable';
import { UserId } from 'rilata/src/common/types';
import { WorkshopAttrs } from '../../domain-data/workshop/params';
import { WorkshopResolves } from '../../../resolves';

export interface WorkshopRepository {
    init(resolver: WorkshopResolves): void
    findWorkshopByUserId(userId: UserId): Promise<WorkshopAttrs | undefined>;
    findById(workshopId: WorkshopAttrs['workshopId']): Promise<WorkshopAttrs | undefined>
}

export const WorkshopRepository = {
  instance(resolver: Repositoriable): WorkshopRepository {
    return resolver.getRepository(WorkshopRepository) as WorkshopRepository;
  },
};
