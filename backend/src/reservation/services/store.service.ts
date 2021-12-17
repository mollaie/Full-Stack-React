import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { StoreRepositoryInterface } from '../../repositories/store.repository.interface';
import { InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { ResponseDto } from '../../shared/models/response.dto';
import { StoreEntity } from '../entities/store.entity';
import { StoreDto } from '../models/store.dto';
import { StoreServiceInterface } from './store.service.interface';

@Injectable()
export class StoreService implements StoreServiceInterface {
  constructor(
    @Inject('StoreRepositoryInterface')
    private readonly repository: StoreRepositoryInterface,
    @InjectMapper() private readonly mapper: Mapper,
  ) {
    this.mapper.createMap(StoreDto, StoreEntity);
    this.mapper.createMap(StoreEntity, StoreDto);
  }

  public async create(
    storeDto: StoreDto,
    userId: string,
  ): Promise<ResponseDto> {
    try {
      const entity = this.mapper.map(storeDto, StoreEntity, StoreDto);
      entity.createdBy = userId;

      const savedData = await this.repository.create(entity);

      const model = this.mapper.map(savedData, StoreDto, StoreEntity);

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

      const model = this.mapper.map(entity, StoreDto, StoreEntity);

      return new ResponseDto(HttpStatus.OK, model);
    } catch (error) {
      return new ResponseDto(
        HttpStatus.INTERNAL_SERVER_ERROR,
        null,
        JSON.stringify(error),
      );
    }
  }
  public async findAll(userId: string): Promise<ResponseDto> {
    try {
      const entities = await this.repository.findMany();

      if (!entities || entities?.length === 0)
        return new ResponseDto(HttpStatus.OK, []);

      const models = this.mapper.mapArray(entities, StoreDto, StoreEntity);

      return new ResponseDto(HttpStatus.OK, models);
    } catch (error) {
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
