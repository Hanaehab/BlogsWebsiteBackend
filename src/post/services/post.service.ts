import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, switchMap } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PostEntity } from '../models/post.entity';
import { PostInterface } from '../models/post.interface';
import { User } from '../../user/models/user.interface';

@Injectable()
export class PostService {
   
    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepositry: Repository<PostEntity>,
    ){}

    createPost( user: User , post: PostInterface): Observable<PostInterface>{
        post.user = user
        return from(this.postRepositry.save(post));
    }

    async findPostForComment(id: number): Promise<PostInterface>
    {
        const post = await this.postRepositry.findOneBy({
            id: id})
        return post
    }
    
    findById(id: number): Observable<PostInterface>{
        return  from(this.postRepositry.findOne({
            where: {id: id},
            relations: ['user'],
          }))
    }

    findAllPosts(): Observable<PostInterface[]>{
        return from(this.postRepositry.find({relations: ['user']}))
    }

    updatePost(id: number, Post: PostInterface): Observable<PostInterface>{
        return  from(this.postRepositry.update(id,Post)).pipe(
            switchMap(() => this.findById(id))
        )
    }

    deletePost(id: number): Observable<DeleteResult>{
        return  from(this.postRepositry.delete(id))
    }

}


