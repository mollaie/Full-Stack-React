import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { sqlite_connection } from './config';
import { ReservationModule } from './reservation/reservation.module';
import { AuthModule } from './authentication/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(sqlite_connection),
    AutomapperModule.forRoot({
      options: [{ name: 'auto-mapper', pluginInitializer: classes }],
      singular: true,
    }),
    ReservationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
