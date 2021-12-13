import { ReservationEntity } from 'src/reservation/entities/reservation.entity';
import { BaseInterfaceRepository } from './base/base.interface.repository';

export interface ReservationRepositoryInterface
  extends BaseInterfaceRepository<ReservationEntity> {}
