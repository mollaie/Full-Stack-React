import { InjectRepository } from '@nestjs/typeorm';
import { ReservationEntity } from '../reservation/entities/reservation.entity';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { ReservationRepositoryInterface } from './reservation.repository.interface';

export class ReservationRepository
  extends BaseAbstractRepository<ReservationEntity>
  implements ReservationRepositoryInterface
{
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly repository: Repository<ReservationEntity>,
  ) {
    super(repository);
  }

  /**
   * Extended findMay from Base Repository in case of we need to apply join as well as default select
   * @param filter
   * @returns
   */
  public findMany(filter: string): Promise<ReservationEntity[]> {
    return new Promise<ReservationEntity[]>(async (resolve, reject) => {
      try {
        let condition = 'reservation.isDeleted = false';

        condition =
          filter?.length > 0 ? `${condition} AND ${filter}` : condition;

        console.log(condition);

        const entities = await this.entity
          .createQueryBuilder('reservation')
          .innerJoinAndSelect('reservation.store', 'store')
          .where(condition)
          .orderBy('reservation.createDateTime', 'DESC')
          .getMany();

        resolve(entities);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Extended findOne from Base Repository in case of we need to apply join as well as default select
   * @param id
   * @returns
   */
  public findOne(id: string): Promise<ReservationEntity> {
    return new Promise<ReservationEntity>(async (resolve, reject) => {
      const entity = await this.entity
        .createQueryBuilder('reservation')
        .innerJoinAndSelect('reservation.store', 'store')
        .where(`reservation.isDeleted = false AND reservation.id = '${id}'`)
        .getOne();

      if (entity) resolve(entity);
      else reject(entity);
    });
  }
}
