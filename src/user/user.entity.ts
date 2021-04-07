import { BaseEntity } from '../base/base.entity';
import { Column, Entity } from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  ADMIN = 'ADMIN',
  MOD = 'MOD',
  USER = 'USER',
}

@Entity({ name: 'User' })
export default class UserEntity extends BaseEntity<UserEntity> {
  @ApiProperty()
  @Column()
  @Expose()
  isActive: boolean;

  @ApiProperty()
  @Column()
  @Expose()
  email: string;

  @ApiProperty()
  @Column()
  @Expose()
  phone: string;

  @ApiProperty()
  @Column()
  @Expose()
  avatar: string;

  @ApiProperty()
  @Column()
  @Expose()
  password: string;

  @ApiProperty()
  @Column()
  @Expose()
  name: string;

  @ApiProperty()
  @Column()
  @Expose()
  role: UserRole;

  constructor(user: Partial<UserEntity>) {
    super(user, UserEntity);
  }
}
