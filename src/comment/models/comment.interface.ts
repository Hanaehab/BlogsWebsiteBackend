import { PostInterface } from "src/post/models/post.interface";
import { User } from "src/user/models/user.interface";

export interface Comment{
    id?: number;
    body?: string;
    createdAt?: Date;
    user?:User;
    post?:PostInterface;
}