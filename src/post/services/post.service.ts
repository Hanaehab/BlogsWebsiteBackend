import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, switchMap } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PostEntity } from '../models/post.entity';
import { PostInterface } from '../models/post.interface';
import { User } from '../../user/models/user.interface';
import { AirtableService } from 'src/airtable/services/airtable.service';

@Injectable()
export class PostService {
   
    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepositry: Repository<PostEntity>,
        private airtableService : AirtableService
    ){}

    createPost( user: User , post: PostInterface): Observable<PostInterface>{
        this.airtableService.createRecord("post",post);
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
        return from(this.postRepositry.find({relations: ['user','comment']}))
    }

    findByUser(id: number): Observable<PostInterface[]> {
        return from(this.postRepositry.find({
            where: {
                user:{id} 
            },
            relations: ['user','comment'],
        }))
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


