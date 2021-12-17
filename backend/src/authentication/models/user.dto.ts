import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { BaseDto } from '../../shared/models/base.dto';

export class UserDto extends BaseDto {
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(250)
  first_name: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(250)
  last_name: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(250)
  username: string;

  @AutoMap()
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(250)
  email: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(250)
  password: string;
}
