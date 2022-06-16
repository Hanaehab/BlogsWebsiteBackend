import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CommentModule } from 'src/comment/comment.module';
import { PostModule } from 'src/post/post.module';
import { UserController } from './controllers/user.controller';
import { UserEntity } from './models/user.entity';
import { UserService } from './services/user.service';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity]), PostModule, CommentModule,AuthModule],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService],
})
export class UserModule {}
