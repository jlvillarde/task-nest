import { UserSignupDto } from '../dtos/userSignup.dto';
import { Body, ConflictException, Controller, Delete, Get, InternalServerErrorException, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserUpdateDto } from '../dtos/userUpdate.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService
    ) { }

    @Public()
    @Get()
    async getAllUsers(@Req() req: Request) {
        return this.userService.getAllUsers()
    }

    @Post('signup')
    async userSignup(@Body() userSignup: UserSignupDto) {
        try {

            await this.userService.userSignup(userSignup);
            return { message: 'User created successfully' }
        } catch (error) {

            if (error.code === '23505') {
                throw new ConflictException('A user with this email already exists.');
            }
            throw new InternalServerErrorException('Failed to create user');
        }
    }

    @Put('update/:id')
    async userUpdate(@Param('id', ParseIntPipe) id: number, @Body() userUpdate: UserUpdateDto) {

        const updateResult = await this.userService.userUpdate(id, userUpdate);

        const responseMessage = updateResult.affected > 0 ? 'User updated successfully' : 'No changes applied'
        return responseMessage;
    }

    @Delete('delete/:id')
    async userDelete(@Param('id', ParseIntPipe) id: number) {
        const deleteResult = await this.userService.userDelete(id);

        const responseMessage = deleteResult.affected > 0 ? 'User deleted successfully' : 'No changes applied'
        return { messsage: responseMessage };
    }

}
