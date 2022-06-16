import { CanActivate, Injectable, ExecutionContext, forwardRef, Inject } from "@nestjs/common";
import { UserService } from "../../user/services/user.service";
import { CommentService } from "../services/comment.service";
import { Observable } from "rxjs";
import { User } from "src/user/models/user.interface";
import { switchMap, map } from "rxjs/operators";
import { Comment } from "../models/comment.interface";

@Injectable()
export class  UserIsAuthorGuard implements CanActivate {

    constructor(@Inject(forwardRef(() => UserService))
    private userService: UserService,
    @Inject(forwardRef(() => CommentService))
    private commentService: CommentService) {}

    canActivate(context: ExecutionContext): Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        const params = request.params;
        const commentId: number = Number(params.id);
        
        const user: User = request.user.user;
        

        return this.userService.findUser(user.id).pipe(
            switchMap((user: User) => this.commentService.findById(commentId).pipe(
                map((comment: Comment) => {
                    let hasPermission = false;
                    
                    if(user.id === comment.user.id) {
                        hasPermission = true;
                    }
                    return user && hasPermission;
                })
            ))
        )       
    }
}