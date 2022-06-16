import { Body, Controller, Delete, Get, Param, Post, Put , Request, UseGuards} from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PostService } from '../services/post.service';
import { PostInterface } from '../models/post.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@Controller('post')
export class PostController {
    constructor(private PostService : PostService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() post: PostInterface, @Request() req): Observable<PostInterface>{
        const user = req.user.user
        return this.PostService.createPost(user,post)
    }

    @Get(':id')
    findOne(@Param('id')id:number):Observable<PostInterface>{
        return this.PostService.findById(id)
    }

    // @Put(':id')
    // update(@Param('id')id:number, @Body() post: PostInterface): Observable<UpdateResult>{
    //     return this.PostService.updatePost(id,post)
    // }

    // @Delete(':id')
    // delete(@Param('id')id:number): Observable<DeleteResult>{
    //     return this.PostService.deletePost(id)
    // }

}
