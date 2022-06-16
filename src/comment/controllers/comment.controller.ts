import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request, Inject, forwardRef } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { PostService } from 'src/post/services/post.service';


@Controller('comment')
export class CommentController {
    constructor(
        private CommentService : CommentService,
        @Inject(forwardRef(() => PostService))
        private postService: PostService,
        ){}
    
    @UseGuards(JwtAuthGuard)
    @Post(':id')

    async create( @Param('id') postID:number ,@Body() comment: Comment, @Request() req): Promise<Observable<Comment>>{
        const post = await this.postService.findPostForComment(postID);
        const user = req.user.user
        return this.CommentService.createComment(user,post,comment)
    }
    // @Get()
    // findAll():Observable<PostInterface[]>{
    //     return this.PostService.findAllPosts()
    // }

    // @Put(':id')
    // update(@Param('id')id:number, @Body() post: PostInterface): Observable<UpdateResult>{
    //     return this.PostService.updatePost(id,post)
    // }

    // @Delete(':id')
    // delete(@Param('id')id:number): Observable<DeleteResult>{
    //     return this.PostService.deletePost(id)
    // }

}
