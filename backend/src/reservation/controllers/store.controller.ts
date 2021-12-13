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
import { ResponseDto } from 'src/shared/models/response.dto';
import { StoreDto } from '../models/store.dto';
import { StoreServiceInterface } from '../services/store.service.interface';

@Controller('Store')
@ApiBearerAuth()
@ApiTags('Store')
export class StoreController {
  constructor(
    @Inject('StoreServiceInterface')
    private readonly service: StoreServiceInterface,
  ) {}

  @Post()
  public async create(
    @Body() reservation: StoreDto,
    @Req() req,
  ): Promise<ResponseDto> {
    return await this.service.create(reservation, req?.raw?.user?.id);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<ResponseDto> {
    return await this.service.findOne(id);
  }

  @Get('')
  public async findAll(@Req() req): Promise<ResponseDto> {
    return await this.service.findAll(req?.raw?.user?.id);
  }

  @Delete(':id')
  public async delete(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ResponseDto> {
    return await this.service.delete(id, req?.raw?.user?.id);
  }
}
