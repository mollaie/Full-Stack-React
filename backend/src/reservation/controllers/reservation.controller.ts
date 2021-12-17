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
import { ResponseDto } from '../../shared/models/response.dto';
import { ReservationDto } from '../models/reservation.dto';
import { ReservationServiceInterface } from '../services/reservation.service.interface';

@Controller('Reservation')
@ApiBearerAuth()
@ApiTags('Reservation')
export class ReservationController {
  constructor(
    @Inject('ReservationServiceInterface')
    private readonly service: ReservationServiceInterface,
  ) {}

  @Post()
  public async create(
    @Body() reservation: ReservationDto,
    @Req() req,
  ): Promise<ResponseDto> {
    return await this.service.create(reservation, req?.user?.id);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<ResponseDto> {
    return await this.service.findOne(id);
  }

  @Get('')
  public async findAll(@Req() req): Promise<ResponseDto> {
    return await this.service.findAll(req?.user?.id);
  }

  @Delete(':id')
  public async delete(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ResponseDto> {
    return await this.service.delete(id, req?.user?.id);
  }
}
