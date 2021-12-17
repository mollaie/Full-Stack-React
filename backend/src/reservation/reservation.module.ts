import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from '@automapper/nestjs';
import { ReservationRepository } from '../repositories/reservation.repository';
import { StoreRepository } from '../repositories/store.repository';
import { ReservationController } from './controllers/reservation.controller';
import { ReservationEntity } from './entities/reservation.entity';
import { StoreEntity } from './entities/store.entity';
import { ReservationService } from './services/reservation.service';
import { StoreService } from './services/store.service';
import { StoreController } from './controllers/store.controller';
import { AuthMiddleware } from '../authentication/auth.middleware';
import { AuthModule } from '../authentication/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReservationEntity, StoreEntity]),
    AutomapperModule,
    AuthModule,
  ],
  controllers: [ReservationController, StoreController],
  providers: [
    {
      provide: 'ReservationRepositoryInterface',
      useClass: ReservationRepository,
    },
    {
      provide: 'ReservationServiceInterface',
      useClass: ReservationService,
    },
    {
      provide: 'StoreRepositoryInterface',
      useClass: StoreRepository,
    },
    {
      provide: 'StoreServiceInterface',
      useClass: StoreService,
    },
  ],
})
export class ReservationModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'Reservation', method: RequestMethod.ALL },
        { path: 'Store', method: RequestMethod.ALL },
      );
  }
}
