import { AutoMap } from '@automapper/classes';

export abstract class BaseDto {
  @AutoMap()
  id: string;
  @AutoMap()
  isActive: boolean;
  @AutoMap()
  isArchived: boolean;
  @AutoMap()
  isDeleted: boolean;
  @AutoMap()
  createDateTime: Date;
  @AutoMap()
  createdBy: string;
  @AutoMap()
  lastChangedDateTime?: Date;
  @AutoMap()
  lastChangedBy: string;
}
