import { UserEntity } from '../entities/user.entity';

export interface AuthServiceInterface {
  findOne(id: string): Promise<UserEntity>;
  login(username: string, password: string): Promise<string>;
}
