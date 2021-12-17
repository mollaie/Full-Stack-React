import { UserEntity } from '../authentication/entities/user.entity';
import { BaseInterfaceRepository } from './base/base.interface.repository';

export interface UserRepositoryInterface
  extends BaseInterfaceRepository<UserEntity> {
  findOneWithCondition(filter: string): Promise<UserEntity>;
}
