import { ResponseDto } from 'src/shared/models/response.dto';
import { ReservationDto } from '../models/reservation.dto';

export interface ReservationServiceInterface {
  create(reservationDto: ReservationDto, userId: string): Promise<ResponseDto>;

  findOne(id: string): Promise<ResponseDto>;

  findAll(userId: string): Promise<ResponseDto>;

  delete(id: string, userId: string): Promise<ResponseDto>;
}
