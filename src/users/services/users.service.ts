import { InjectRepository } from '@nestjs/typeorm';
import { UserSignupDto } from './../dtos/userSignup.dto';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { UserUpdateDto } from '../dtos/userUpdate.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async getAllUsers() {
        return this.userRepository.find();
    }

    async userSignup(userDto: UserSignupDto) {
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(userDto.password, salt);

        return await this.userRepository.insert({ ...userDto, password });
    }

    async userUpdate(user_id: number, userUpdate: UserUpdateDto) {
        return this.userRepository.update(user_id, userUpdate)
    }

    userDelete(user_id: number) {
        return this.userRepository.softDelete(user_id)
    }

    async findUserByEmail(email: string) {
        return await this.userRepository.findOneBy({ email: email })
    }
}
