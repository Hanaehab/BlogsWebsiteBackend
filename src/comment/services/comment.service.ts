import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, switchMap } from 'rxjs';
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


    findById(id: number): Observable<Comment>{
        return  from(this.commentRepositry.findOne({
            where: {id: id},
            relations: ['user','post'],
          }))
    }

    findAllComments(): Observable<Comment[]>{
        return from(this.commentRepositry.find({relations: ['user','post']}))
    }

    updateComment(id: number, comment: Comment): Observable<Comment>{
        return  from(this.commentRepositry.update(id,comment)).pipe(
            switchMap(() => this.findById(id))
        )
    }

    deleteComment(id: number): Observable<DeleteResult>{
        return  from(this.commentRepositry.delete(id))
    }

}
