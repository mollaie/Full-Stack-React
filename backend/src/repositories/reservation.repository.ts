import { InjectRepository } from '@nestjs/typeorm';
import { ReservationEntity } from 'src/reservation/entities/reservation.entity';
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
