import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ReservationRepositoryInterface } from 'src/repositories/reservation.repository.interface';
import { InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { ResponseDto } from 'src/shared/models/response.dto';
import { ReservationEntity } from '../entities/reservation.entity';
import { ReservationDto } from '../models/reservation.dto';
import { ReservationServiceInterface } from './reservation.service.interface';

@Injectable()
export class ReservationService implements ReservationServiceInterface {
  constructor(
    @Inject('ReservationRepositoryInterface')
    private readonly repository: ReservationRepositoryInterface,
    @InjectMapper() private readonly mapper: Mapper,
  ) {
    this.mapper.createMap(ReservationDto, ReservationEntity);
    this.mapper.createMap(ReservationEntity, ReservationDto);
  }

  public async create(
    reservationDto: ReservationDto,
    userId: string,
  ): Promise<ResponseDto> {
    try {
      const entity = this.mapper.map(
        reservationDto,
        ReservationEntity,
        ReservationDto,
      );
      entity.createdBy = userId;

      const savedData = await this.repository.create(entity);

      const model = this.mapper.map(
        savedData,
        ReservationDto,
        ReservationEntity,
      );

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

      const model = this.mapper.map(entity, ReservationDto, ReservationEntity);

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
      const entities = await this.repository.findMany(
        `"reservation"."createdBy" = '${userId}'`,
      );

      if (!entities || entities?.length === 0)
        return new ResponseDto(HttpStatus.OK, []);

      const models = this.mapper.mapArray(
        entities,
        ReservationDto,
        ReservationEntity,
      );

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
