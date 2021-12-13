import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { UserRepositoryInterface } from 'src/repositories/user.repository.interface';
import { ResponseDto } from 'src/shared/models/response.dto';
import { UserEntity } from '../entities/user.entity';
import { UserDto } from '../models/user.dto';
import { UserServiceInterface } from './user.service.interface';
import { hash_password } from 'src/shared/helpers/hash';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly repository: UserRepositoryInterface,
    @InjectMapper() private readonly mapper: Mapper,
  ) {
    this.mapper.createMap(UserDto, UserEntity);
    this.mapper.createMap(UserEntity, UserDto);
  }

  public async create(userDto: UserDto): Promise<ResponseDto> {
    try {
      const hashed_password = await hash_password(userDto.password);

      const entity = this.mapper.map(
        { ...userDto, password: hashed_password },
        UserEntity,
        UserDto,
      );

      const savedData = await this.repository.create(entity);

      const model = this.mapper.map(savedData, UserDto, UserEntity);

      return new ResponseDto(HttpStatus.OK, model);
    } catch (error) {
      return new ResponseDto(
        HttpStatus.INTERNAL_SERVER_ERROR,
        null,
        JSON.stringify(error),
      );
    }
  }

  public async findOne(id: string): Promise<ResponseDto> {
    try {
      const entity = await this.repository.findOne(id);

      if (!entity)
        return new ResponseDto(HttpStatus.NOT_FOUND, null, 'Record Not Found!');

      const model = this.mapper.map(entity, UserDto, UserEntity);

      return new ResponseDto(HttpStatus.OK, model);
    } catch (error) {
      return new ResponseDto(
        HttpStatus.INTERNAL_SERVER_ERROR,
        null,
        JSON.stringify(error),
      );
    }
  }

  public async findAll(): Promise<ResponseDto> {
    try {
      const entities = await this.repository.findMany();

      if (!entities || entities?.length === 0)
        return new ResponseDto(HttpStatus.OK, []);

      const models = this.mapper.mapArray(entities, UserDto, UserEntity);

      return new ResponseDto(HttpStatus.OK, models);
    } catch (error) {
      console.log(error);
      return new ResponseDto(
        HttpStatus.INTERNAL_SERVER_ERROR,
        null,
        JSON.stringify(error),
      );
    }
  }

  public async delete(id: string, userId: string): Promise<ResponseDto> {
    try {
      const entity = await this.findOne(id);

      if (!entity)
        return new ResponseDto(HttpStatus.NOT_FOUND, null, 'Record Not Found!');

      const deleteResult = await this.repository.remove(id);

      if (deleteResult.affected > 0) return new ResponseDto(HttpStatus.OK);
      else
        return new ResponseDto(
          HttpStatus.INTERNAL_SERVER_ERROR,
          null,
          'Unable delete record',
        );
    } catch (error) {
      return new ResponseDto(
        HttpStatus.INTERNAL_SERVER_ERROR,
        null,
        JSON.stringify(error),
      );
    }
  }
}
