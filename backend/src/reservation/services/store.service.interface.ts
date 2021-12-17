import { ResponseDto } from '../../shared/models/response.dto';
import { StoreDto } from '../models/store.dto';

export interface StoreServiceInterface {
  create(reservationDto: StoreDto, userId: string): Promise<ResponseDto>;

  findOne(id: string): Promise<ResponseDto>;

  findAll(userId: string): Promise<ResponseDto>;

  delete(id: string, userId: string): Promise<ResponseDto>;
}
