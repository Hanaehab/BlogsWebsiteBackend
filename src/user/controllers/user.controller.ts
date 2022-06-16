import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { catchError, Observable, map, of } from 'rxjs';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { SameUserGuard } from 'src/auth/guards/sameUser.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { User, UserRole } from '../models/user.interface';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
    constructor(private userService : UserService){}

    @Get()
    findAllUsers():Observable<User[]>{
        return this.userService.findAllUsers()
    }
    
    @Post()
    create(@Body() user: User): Observable<User | Object>{
        return this.userService.createUser(user).pipe(
            map((user: User) => user),
            catchError(err => of({ error: err.message }))
        )
    }

    @Post('login')
    login(@Body() user: User): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return { access_token: jwt };
            })
        )
    }

    

    @Get(':id')
    findUser(@Param(('id')) id: number):Observable<User>{
        return this.userService.findUser(id)
    }

    @UseGuards(JwtAuthGuard, SameUserGuard)
    @Put(':id')
    update(@Param('id')id:number, @Body() user: User): Observable<UpdateResult>{
        return this.userService.updateUser(id,user)
    }
    
    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    delete(@Param('id')id:number): Observable<DeleteResult>{
        return this.userService.deleteUser(id)
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/role')
    updateRoleOfUser(@Param('id') id: string, @Body() user: User): Observable<User> {
        return this.userService.updateRoleOfUser(Number(id), user);
    }

}
