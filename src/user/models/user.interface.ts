import { PostInterface } from "src/post/models/post.interface";
import { Comment } from "src/comment/models/comment.interface";
export interface User{
    id?: number;
    firstName?: string;
    lastName?: string;
    userName?: string;
    email?: string;
    password?: string;
    posts?: PostInterface[];
    comments? : Comment[];
}
