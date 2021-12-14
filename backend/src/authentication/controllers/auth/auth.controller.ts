import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/authentication/models/login.dto';
import { AuthServiceInterface } from 'src/authentication/services/auth.service.interface';

@Controller('Auth')
@ApiBearerAuth()
@ApiTags('Auth')
export class AuthController {
  constructor(
    @Inject('AuthServiceInterface')
    private readonly service: AuthServiceInterface,
  ) {}

  @Post('Login')
  public async login(@Body() body: LoginDto): Promise<string> {
    return await this.service.login(body.username, body.password);
  }
}
