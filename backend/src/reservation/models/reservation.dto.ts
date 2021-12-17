import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { BaseDto } from '../../shared/models/base.dto';
import { StatusType } from '../types/status.type';
import { StoreDto } from './store.dto';

export class ReservationDto extends BaseDto {
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(250)
  name: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  status: StatusType;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(10)
  storeId: string;

  @AutoMap({ typeFn: () => StoreDto })
  store: StoreDto;
}
