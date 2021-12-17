import { ResponseDto } from '../../shared/models/response.dto';
import { UserDto } from '../models/user.dto';

export interface UserServiceInterface {
  create(userDto: UserDto): Promise<ResponseDto>;

  findOne(id: string): Promise<ResponseDto>;

  findAll(): Promise<ResponseDto>;

  delete(id: string, userId: string): Promise<ResponseDto>;
}
