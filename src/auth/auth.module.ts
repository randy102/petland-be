import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HashService } from '../utils/hash/hash.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [AuthService, HashService, JwtStrategy],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET
        }
      }
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
