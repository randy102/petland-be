import { Expose, plainToClass } from 'class-transformer';
import { Column, ObjectIdColumn, Entity } from 'typeorm';
import { uuid } from 'src/utils/uuid';
import { Moment } from 'src/utils/moment';

@Entity()
export class BaseEntity<E> {
  @ObjectIdColumn()
  @Expose()
  _id: string;

  @Column()
  @Expose()
  createdAt: number;

  @Column()
  @Expose()
  createdBy: string;

  @Column()
  @Expose()
  updatedAt: number;

  @Column()
  @Expose()
  updatedBy: string;

  constructor(plain: Partial<E>, entity: any) {
    if (plain) {
      Object.assign(
        this,
        plainToClass<E, any>(entity, plain, { excludeExtraneousValues: true }),
      );

      this.updatedAt = this._id && Moment().valueOf();
      this.createdAt = this.createdAt || Moment().valueOf();
      this._id = this._id || uuid();
    }
  }
}
