import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { JwtStrategy } from './guards/jwt.startegy';
import { AuthService } from './services/auth.service';

@Module({
    imports: [
        forwardRef(() => UserModule),
        JwtModule.registerAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory: async (configService: ConfigService)=>({
                secret: configService.get('JWT_SECRET'),
                signOptions: {expiresIn: '100000s'},
            })
        })
    ],
    providers: [AuthService,JwtAuthGuard,JwtStrategy],
    exports:[AuthService]
})
export class AuthModule {}
