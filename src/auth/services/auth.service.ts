import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../../users/services/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string) {

        const user = await this.userService.findUserByEmail(email);
        if (!user) throw new UnauthorizedException("Invalid Credentials");

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) throw new UnauthorizedException("Password don't match!");

        return user;
    }

    async signJwtToken(user: User) {

        const payload = {
            email: user.email,
            sub: user.user_id
        }

        return await this.jwtService.signAsync(payload);
    }
}
