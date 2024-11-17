import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import * as dotenv from 'dotenv'
import { JwtStrategy } from './utils/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './guards/jwt.guard';

dotenv.config()

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.TOKEN_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
    })],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtGuard
    }
  ]
})
export class AuthModule { }
