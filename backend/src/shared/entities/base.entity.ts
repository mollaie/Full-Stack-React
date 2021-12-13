import { AutoMap } from '@automapper/classes';
import {
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @AutoMap()
  @Column({ type: 'boolean', default: false })
  isArchived: boolean;

  @AutoMap()
  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @AutoMap()
  @Column({ type: 'varchar', length: 300, nullable: true })
  createdBy: string;

  @AutoMap()
  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;

  @AutoMap()
  @Column({ type: 'varchar', length: 300, nullable: true })
  lastChangedBy: string;

  @AutoMap()
  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}
