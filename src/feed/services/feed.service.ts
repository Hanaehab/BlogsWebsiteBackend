import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FeedPostEntity } from '../models/post.entity';
import { FeedPost } from '../models/post.interface';

@Injectable()
export class FeedService {
   
    constructor(
        @InjectRepository(FeedPostEntity)
        private readonly feedPostRepositry: Repository<FeedPostEntity> 
    ){}

    createPost(feedPost: FeedPost): Observable<FeedPost>{
        return from(this.feedPostRepositry.save(feedPost));
    }

    findAllPosts(): Observable<FeedPost[]>{
        return from(this.feedPostRepositry.find())
    }

    updatePost(id: number, feedPost: FeedPost): Observable<UpdateResult>{
        return  from(this.feedPostRepositry.update(id,feedPost))
    }

    deletePost(id: number): Observable<DeleteResult>{
        return  from(this.feedPostRepositry.delete(id))
    }
}
