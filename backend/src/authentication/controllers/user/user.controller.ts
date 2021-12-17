import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../../../authentication/models/user.dto';
import { UserServiceInterface } from '../../../authentication/services/user.service.interface';
import { ResponseDto } from '../../../shared/models/response.dto';

@Controller('User')
@ApiBearerAuth()
@ApiTags('User')
export class UserController {
  constructor(
    @Inject('UserServiceInterface')
    private readonly service: UserServiceInterface,
  ) {}

  @Post()
  public async create(@Body() reservation: UserDto): Promise<ResponseDto> {
    return await this.service.create(reservation);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<ResponseDto> {
    return await this.service.findOne(id);
  }

  @Get('')
  public async findAll(): Promise<ResponseDto> {
    return await this.service.findAll();
  }

  @Delete(':id')
  public async delete(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ResponseDto> {
    return await this.service.delete(id, req?.user?.id);
  }
}
