import { Body, Controller, Delete, Get, Param, Post, Put , Request, UseGuards} from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PostService } from '../services/post.service';
import { PostInterface } from '../models/post.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { UserIsAuthorGuard } from '../guards/user.author';
import { PostEntity } from '../models/post.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('post')
export class PostController {
    constructor( 
       private readonly  PostService : PostService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    createPost(@Body() post: PostInterface, @Request() req): Observable<PostInterface>{
        const user = req.user.user
        return this.PostService.createPost(user,post)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAllposts():Observable<PostInterface[]>{
        return this.PostService.findAllPosts()
    }
    
    @Get(':id')
    findPost(@Param('id')id:number):Observable<PostInterface>{
        return this.PostService.findById(id)
    }
    
    @Get('find-by-user/:id')
    findBlogEntries(@Param('id')id:number): Observable<PostInterface[]> {
        return this.PostService.findByUser(id)
    }

    @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
    @Put(':id')
    updatePost(@Param('id')id:number, @Body() post: PostInterface): Observable<PostInterface>{
        return this.PostService.updatePost(id,post)
    }

    @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
    @Delete(':id')
    deletePost(@Param('id')id:number): Observable<DeleteResult>{
        return this.PostService.deletePost(id)
    }

}
