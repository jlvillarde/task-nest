import { Body, Controller, InternalServerErrorException, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @Public()
    async login(@Body() loginCredentails: LoginDto) {

        const email = loginCredentails.email;
        const password = loginCredentails.password;

        const user = await this.authService.validateUser(email, password);

        const token = await this.authService.signJwtToken(user);
        return { access_token: token }

    }
}
