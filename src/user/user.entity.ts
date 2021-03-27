import { BaseEntity } from '../base/base.entity';
import { Column, Entity } from 'typeorm';
import { Expose } from 'class-transformer';

export enum UserRole {
  ADMIN = 'ADMIN',
  MOD = 'MOD',
  USER = 'USER',
}

@Entity({ name: 'User' })
export default class UserEntity extends BaseEntity<UserEntity> {
  @Column()
  @Expose()
  isActive: boolean;

  @Column()
  @Expose()
  email: string;

  @Column()
  @Expose()
  password: string;

  @Column()
  @Expose()
  name: string;

  @Column()
  @Expose()
  city: string;

  @Column()
  @Expose()
  district: string;

  @Column()
  @Expose()
  role: UserRole;

  constructor(user: Partial<UserEntity>) {
    super(user, UserEntity);
  }
}
