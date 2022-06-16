import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from 'src/comment/comment.module';
import { UserService } from 'src/user/services/user.service';
import { UserModule } from 'src/user/user.module';
import { PostController } from './controllers/post.controller';
import { PostEntity } from './models/post.entity';
import { PostService } from './services/post.service';

@Module({
  imports:[forwardRef(() => UserModule),TypeOrmModule.forFeature([PostEntity])],
  providers: [PostService],
  controllers: [PostController],
  exports:[PostService]
})
export class PostModule {}
