import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { BaseEntity } from "src/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'Notification' })
export default class NotificationEntity extends BaseEntity<NotificationEntity> {
  @ApiProperty()
  @Column()
  @Expose()
  message: string;

  @ApiProperty()
  @Column()
  @Expose()
  userID: string;

  @ApiProperty()
  @Column()
  @Expose()
  read: boolean;

  @ApiProperty()
  @Column()
  @Expose()
  postID: string;

  @ApiProperty()
  @Column()
  @Expose()
  qaID: string;

  @ApiProperty()
  @Column()
  @Expose()
  isPostVerify: boolean
  
  constructor(notification: Partial<NotificationEntity>) {
    super(notification, NotificationEntity);
  }
}