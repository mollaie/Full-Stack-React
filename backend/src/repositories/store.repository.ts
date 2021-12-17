import { InjectRepository } from '@nestjs/typeorm';
import { StoreEntity } from '../reservation/entities/store.entity';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { StoreRepositoryInterface } from './store.repository.interface';

export class StoreRepository
  extends BaseAbstractRepository<StoreEntity>
  implements StoreRepositoryInterface
{
  constructor(
    @InjectRepository(StoreEntity)
    private readonly repository: Repository<StoreEntity>,
  ) {
    super(repository);
  }
}
