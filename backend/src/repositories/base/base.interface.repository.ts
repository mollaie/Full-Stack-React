import { DeleteResult } from 'typeorm';

export interface BaseInterfaceRepository<T> {
  create(data: T): Promise<T>;

  findOne(id: string): Promise<T>;

  remove(id: string): Promise<DeleteResult>;

  findMany(filter?: string): Promise<T[]>;
}
