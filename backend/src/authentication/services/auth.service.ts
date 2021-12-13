import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SECRET } from 'src/config';
import { UserRepositoryInterface } from 'src/repositories/user.repository.interface';
import { compare_password, hash_password } from 'src/shared/helpers/hash';
import { UserEntity } from '../entities/user.entity';
import { AuthServiceInterface } from './auth.service.interface';

const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly repository: UserRepositoryInterface,
  ) {}

  public async findOne(id: string): Promise<UserEntity> {
    return await this.repository.findOne(id);
  }

  public async login(username: string, password: string): Promise<string> {
    const user = await this.repository.findOneWithCondition(
      `username = '${username}' AND isDeleted = false`,
    );

    if (!user)
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);

    const password_matched = await compare_password(password, user.password);

    if (!password_matched)
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);

    const token = this.generateJWT(user);

    return token;
  }

  private generateJWT(user: UserEntity) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 1);

    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        exp: exp.getTime() / 1000,
      },
      SECRET,
    );
  }
}
