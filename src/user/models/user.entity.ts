import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { PostEntity } from '../../post/models/post.entity';
import { CommentEntity } from '../../comment/models/comment.entity';


@Entity('user')
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: ''})
    firstName: string;

    @Column({default: ''})
    lastName: string;

    @Column({unique: true})
    userName: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;


    @BeforeInsert()
    emailToLowerCase(){
        this.email = this.email.toLowerCase();
    }

    @OneToMany(type => PostEntity, post => post.user, {onDelete: "CASCADE"}) post: PostEntity[];
    @OneToMany(type => CommentEntity, comment => comment.user, {onDelete: "CASCADE"}) comment: CommentEntity[];
}