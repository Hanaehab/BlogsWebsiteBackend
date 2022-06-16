import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from 'src/post/post.module';
import { CommentController } from './controllers/comment.controller';
import { CommentEntity } from './models/comment.entity';
import { CommentService } from './services/comment.service';

@Module({

  imports:[forwardRef(() => PostModule),TypeOrmModule.forFeature([CommentEntity])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
