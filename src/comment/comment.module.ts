import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from 'src/post/post.module';
import { UserModule } from 'src/user/user.module';
import { CommentController } from './controllers/comment.controller';
import { CommentEntity } from './models/comment.entity';
import { CommentService } from './services/comment.service';

@Module({

  imports:[forwardRef(() => PostModule),forwardRef(() => UserModule),TypeOrmModule.forFeature([CommentEntity])],
  providers: [CommentService],
  controllers: [CommentController],
  exports:[CommentService],
})
export class CommentModule {}
