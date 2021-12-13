import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'user', schema: 'auth' })
export class UserEntity extends BaseEntity {
  @AutoMap()
  @Column({
    type: 'varchar',
    length: '250',
    default: '',
    nullable: false,
  })
  first_name: string;

  @AutoMap()
  @Column({
    type: 'varchar',
    length: '250',
    default: '',
    nullable: false,
  })
  last_name: string;

  @AutoMap()
  @Column({
    type: 'varchar',
    length: '250',
    default: '',
    nullable: false,
  })
  username: string;

  @AutoMap()
  @Column({
    type: 'varchar',
    length: '250',
    default: '',
    nullable: false,
  })
  email: string;

  @AutoMap()
  @Column({
    type: 'varchar',
    length: '250',
    default: '',
    nullable: false,
  })
  password: string;
}
