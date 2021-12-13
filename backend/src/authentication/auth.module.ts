import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AutomapperModule } from '@automapper/nestjs';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from './entities/user.entity';
import { SECRET } from 'src/config';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { UserRepository } from 'src/repositories/user.repository';
import { AuthController } from './controllers/auth/auth.controller';
import { UserController } from './controllers/user/user.controller';
import { AuthServiceInterface } from './services/auth.service.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AutomapperModule,
    JwtModule.register({
      secret: SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [
    AuthService,
    {
      provide: 'AuthServiceInterface',
      useClass: AuthService,
    },
    {
      provide: 'UserServiceInterface',
      useClass: UserService,
    },
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
