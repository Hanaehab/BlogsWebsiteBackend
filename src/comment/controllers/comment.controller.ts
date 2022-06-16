import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request, Inject, forwardRef } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { PostService } from 'src/post/services/post.service';
import { UserIsAuthorGuard } from '../guards/user.author';


@Controller('comment')
export class CommentController {
    constructor(
        private CommentService : CommentService,
        @Inject(forwardRef(() => PostService))
        private postService: PostService,
        ){}
    
    @UseGuards(JwtAuthGuard)
    @Post(':id')
    async createComment( @Param('id') postID:number ,@Body() comment: Comment, @Request() req): Promise<Observable<Comment>>{
        const post = await this.postService.findPostForComment(postID);
        const user = req.user.user
        return this.CommentService.createComment(user,post,comment)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAllComments():Observable<Comment[]>{
        return this.CommentService.findAllComments()
    }
    
    @Get(':id')
    findComment(@Param('id')id:number):Observable<Comment>{
        return this.CommentService.findById(id)
    }
    

    @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
    @Put(':id')
    updateComment(@Param('id')id:number, @Body() comment: Comment): Observable<Comment>{
        return this.CommentService.updateComment(id,comment)
    }

    @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
    @Delete(':id')
    deleteComment(@Param('id')id:number): Observable<DeleteResult>{
        return this.CommentService.deleteComment(id)
    }


}
