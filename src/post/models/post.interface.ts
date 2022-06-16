import { Comment } from "src/comment/models/comment.interface";
import { User } from "src/user/models/user.interface";

export interface PostInterface{
    id?: number;
    title?: string;
    body?: string;
    createdAt?: Date;
    user?:User;
    comments?: Comment[];
}