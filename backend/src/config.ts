import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { root } from './path';
export const sqlite_connection: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: `${root}/data/line.sqlite`,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  keepConnectionAlive: true,
};

export const SECRET = 'RESERVATION_BACKEND';
