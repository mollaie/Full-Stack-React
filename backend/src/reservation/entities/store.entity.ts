import { AutoMap } from '@automapper/classes';
import { BaseEntity } from '../../shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'store', schema: 'res' })
export class StoreEntity extends BaseEntity {
  @AutoMap()
  @Column({
    type: 'varchar',
    length: '250',
    default: '',
    nullable: false,
  })
  name: string;

  @AutoMap()
  @Column({
    type: 'varchar',
    length: '400',
    default: '',
    nullable: true,
  })
  description?: string;
}
