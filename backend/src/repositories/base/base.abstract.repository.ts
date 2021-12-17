import { BaseEntity } from '../../shared/entities/base.entity';
import { DeleteResult, Repository } from 'typeorm';
import { BaseInterfaceRepository } from './base.interface.repository';

/**
 * Abstract repository service in case of keep all repositories pattern in a standard and commune shape
 */
export abstract class BaseAbstractRepository<T>
  implements BaseInterfaceRepository<T>
{
  protected entity: Repository<T>;

  constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  public async create(data: T): Promise<T> {
    return await this.entity.save(data);
  }

  public async findOne(id: string): Promise<T> {
    return await this.entity.findOne({
      where: `id = '${id}'  AND isDeleted = false`,
    });
  }

  public async remove(id: string): Promise<DeleteResult> {
    const en = await this.entity.findOne(id);

    (<BaseEntity>en).isDeleted = true;

    return await this.entity.update(id, en);
  }

  public async findMany(filter: string): Promise<T[]> {
    if (filter?.length > 0)
      return await this.entity.find({
        where: `${filter} AND isDeleted = false`,
      });
    else return await this.entity.find({ where: 'isDeleted = false' });
  }
}
