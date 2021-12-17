import { DeleteResult } from 'typeorm';

/**
 * Interface contract on Base Repository which is going to use as a token and contract on further services
 */
export interface BaseInterfaceRepository<T> {
  create(data: T): Promise<T>;

  findOne(id: string): Promise<T>;

  remove(id: string): Promise<DeleteResult>;

  findMany(filter?: string): Promise<T[]>;
}
