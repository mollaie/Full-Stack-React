import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { BaseDto } from 'src/shared/models/base.dto';

export class StoreDto extends BaseDto {
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(250)
  @MinLength(5)
  name: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(400)
  description?: string;
}
