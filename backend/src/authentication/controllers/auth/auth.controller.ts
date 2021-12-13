import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthServiceInterface } from 'src/authentication/services/auth.service.interface';

@Controller('Auth')
@ApiBearerAuth()
@ApiTags('Auth')
export class AuthController {
  constructor(
    @Inject('AuthServiceInterface')
    private readonly service: AuthServiceInterface,
  ) {}

  @Get('login/:username/:password')
  public async login(
    @Param('username') username: string,
    @Param('password') password: string,
  ): Promise<string> {
    return await this.service.login(username, password);
  }
}
