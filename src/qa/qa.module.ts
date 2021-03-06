import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentModule } from "src/comment/comment.module";
import { NotificationModule } from "src/notification/notification.module";
import { PostService } from "src/post/post.service";
import { UserModule } from "src/user/user.module";
import { PostModule } from "../post/post.module";
import { QaController } from "./qa.controller";
import QaEntity from "./qa.entity";
import { QaService } from "./qa.service";

@Module({
  controllers: [QaController],
  providers: [QaService],
  imports: [
    TypeOrmModule.forFeature([QaEntity]),
    forwardRef(() => PostModule),
    forwardRef(() => CommentModule),
    forwardRef(() => NotificationModule),
    UserModule
  ],
  exports: [QaService]
})
export class QaModule {}
