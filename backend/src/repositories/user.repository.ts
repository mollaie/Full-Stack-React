import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../authentication/entities/user.entity';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { UserRepositoryInterface } from './user.repository.interface';

export class UserRepository
  extends BaseAbstractRepository<UserEntity>
  implements UserRepositoryInterface
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {
    super(repository);
  }
  public async findOneWithCondition(filter: string): Promise<UserEntity> {
    return await this.repository.findOne({ where: filter });
  }
}
