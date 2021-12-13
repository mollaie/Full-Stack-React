import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { StoreEntity } from './store.entity';

@Entity({ name: 'reservation', schema: 'res' })
export class ReservationEntity extends BaseEntity {
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
    length: '20',
    default: '',
    nullable: false,
  })
  status: string;

  @AutoMap()
  @Column({
    name: 'storeId',
    type: 'uuid',
    nullable: false,
  })
  storeId: string;

  @AutoMap({ typeFn: () => StoreEntity })
  @ManyToOne(() => StoreEntity, (store) => store.id)
  @JoinColumn({ name: 'storeId' })
  store: StoreEntity;
}
