import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { PostInterface } from 'src/post/models/post.interface';
import { User } from 'src/user/models/user.interface';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CommentEntity } from '../models/comment.entity';
import { Comment } from '../models/comment.interface';

@Injectable()
export class CommentService {
   
    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepositry: Repository<CommentEntity> 
    ){}

    createComment( user: User , post:PostInterface, comment: Comment): Observable<Comment>{
        comment.user = user
        comment.post = post
        return from(this.commentRepositry.save(comment));
    }

    // findAllPosts(): Observable<PostInterface[]>{
    //     return from(this.postRepositry.find())
    // }

    // updatePost(id: number, feedPost: PostInterface): Observable<UpdateResult>{
    //     return  from(this.postRepositry.update(id,feedPost))
    // }

    // deletePost(id: number): Observable<DeleteResult>{
    //     return  from(this.postRepositry.delete(id))
    // }
}
