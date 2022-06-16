import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { UserEntity } from '../../user/models/user.entity';
import { CommentEntity } from '../../comment/models/comment.entity';


@Entity('post')
export class PostEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: ''})
    title: string;
    
    @Column({default: ''})
    body: string;

    @Column({type:'timestamp', default:()=> 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @ManyToOne(type => UserEntity, user => user.post, {
        onDelete: "CASCADE"
    }) user: UserEntity; 
    @OneToMany(type => CommentEntity, comment => comment.post) comment: CommentEntity[];
}