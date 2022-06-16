import { CanActivate, Injectable, ExecutionContext, forwardRef, Inject } from "@nestjs/common";
import { UserService } from "../../user/services/user.service";
import { PostService } from "../services/post.service";
import { Observable } from "rxjs";
import { User } from "src/user/models/user.interface";
import { switchMap, map } from "rxjs/operators";
import { PostInterface } from "../models/post.interface";

@Injectable()
export class  UserIsAuthorGuard implements CanActivate {

    constructor(@Inject(forwardRef(() => UserService))
    private userService: UserService,
    @Inject(forwardRef(() => PostService))
    private postService: PostService) {}

    canActivate(context: ExecutionContext): Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        const params = request.params;
        const postId: number = Number(params.id);
        
        const user: User = request.user.user;
        

        return this.userService.findUser(user.id).pipe(
            switchMap((user: User) => this.postService.findById(postId).pipe(
                map((post: PostInterface) => {
                    let hasPermission = false;
                    
                    if(user.id === post.user.id) {
                        hasPermission = true;
                    }
                    return user && hasPermission;
                })
            ))
        )       
    }
}