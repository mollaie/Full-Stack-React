import { ReservationEntity } from '../reservation/entities/reservation.entity';
import { BaseInterfaceRepository } from './base/base.interface.repository';

export interface ReservationRepositoryInterface
  extends BaseInterfaceRepository<ReservationEntity> {}
