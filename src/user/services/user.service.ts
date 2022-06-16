import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'path';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/auth/services/auth.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';

@Injectable()
export class UserService {
   
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepositry: Repository<UserEntity>,
        private authService: AuthService 
    ){}

    createUser(user: User): Observable<User>{
        return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) =>{
                const newUser = new UserEntity();
                newUser.firstName = user.firstName;
                newUser.lastName = user.lastName;
                newUser.userName = user.userName;
                newUser.email= user.email;
                newUser.password= passwordHash;
                newUser.role = user.role;

                return from(this.userRepositry.save(newUser)).pipe(
                    map((user: User)=>{
                        const {password,...result} = user;
                        return result;
                    }),
                    catchError(err => throwError(err))
                );
                })
             )
        }
        

    findAllUsers(): Observable<User[]>{
        // return from(this.userRepositry.find())
        return from(this.userRepositry.find()).pipe(
            map((users: User[]) => {
                users.forEach(function (v) {delete v.password});
                return users;
            })
        );
    }

    findUser(id: number): Observable<User>{
        return from(this.userRepositry.findOneBy({ id: id,})).pipe(map((user:User)=>{
            const {password,...result} = user;
                        return result;
                    }),
                    catchError(err => throwError(err))
        )
        // return from(this.userRepositry.findOneBy({
        //     id: id,
        // }))
    }

    updateUser(id: number, user: User): Observable<UpdateResult>{
        delete user.email;
        delete user.password;

        return  from(this.userRepositry.update(id,user))
    }

    deleteUser(id: number): Observable<DeleteResult>{
        return  from(this.userRepositry.delete(id))
    }
    
    login(user: User): Observable<string> {
        return this.validateUser(user.email, user.password).pipe(
            switchMap((user: User) => {
                if(user) {
                    return this.authService.generateJWT(user).pipe(map((jwt: string) => jwt));
                } else {
                    return 'Wrong Credentials';
                }
            })
        )
    }

    validateUser(email: string, password: string): Observable<User> {
        return from(this.userRepositry.findOneBy({email})).pipe(
            switchMap((user: User) => this.authService.comparePasswords(password, user.password)
            .pipe(
                map((match: boolean) => {
                    if(match) {
                        const {password, ...result} = user;
                        return result;
                    } else {
                        throw new BadRequestException("invalid credentials");
                    }
                })
            ))
        )
    }

    updateRoleOfUser(id: number, user: User): Observable<any> {
        return from(this.userRepositry.update(id, user));
    }
    


    

}
