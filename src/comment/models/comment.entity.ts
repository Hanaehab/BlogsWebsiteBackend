import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { PostEntity } from '../../post/models/post.entity';
import { UserEntity } from '../../user/models/user.entity';


@Entity('comment')
export class CommentEntity{
    @PrimaryGeneratedColumn()
    id: number;

    
    @Column({default: ''})
    body: string;

    @Column({type:'timestamp', default:()=> 'CURRENT_TIMESTAMP'})
    createdAt: Date;


    @ManyToOne(type => UserEntity, user => user.comment , {
        onDelete: "CASCADE"
    }) user: UserEntity; 
    @ManyToOne(type => PostEntity, post => post.comment, {
        onDelete: "CASCADE"
    }) post: PostEntity; 
    
}