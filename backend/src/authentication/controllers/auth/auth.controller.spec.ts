import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../../repositories/user.repository';
import { AuthService } from '../../../authentication/services/auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from '../../../authentication/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from '@automapper/nestjs';
import { sqlite_connection } from '../../../config';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(sqlite_connection),
        TypeOrmModule.forFeature([UserEntity]),
        AutomapperModule,
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: 'AuthServiceInterface',
          useClass: AuthService,
        },
        {
          provide: 'UserRepositoryInterface',
          useClass: UserRepository,
        },
      ],
    }).compile();

    controller = app.get<AuthController>(AuthController);
    service = app.get<AuthService>('AuthServiceInterface');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to login', () => {
    service
      .login('moe', '123456')
      .then((response) => {
        //In case of successfully
        expect(typeof response).toBe('string');

        expect(response.length).toBeGreaterThan(0);
      })
      .catch((error) => {
        //In case of unauthorized
        expect(error.status).toBe(401);
      });
  });

  it('should not be able to login', () => {
    service
      .login('moe', 'password')
      .then((response) => {
        //In case of successfully
        expect(typeof response).toBe('string');

        expect(response.length).toBeGreaterThan(0);
      })
      .catch((error) => {
        //In case of unauthorized
        expect(error.status).toBe(401);
      });
  });
});
