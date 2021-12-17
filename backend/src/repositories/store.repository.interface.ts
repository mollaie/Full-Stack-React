import { StoreEntity } from '../reservation/entities/store.entity';
import { BaseInterfaceRepository } from './base/base.interface.repository';

export interface StoreRepositoryInterface
  extends BaseInterfaceRepository<StoreEntity> {}
