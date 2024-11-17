import { IsEmail, IsNotEmpty } from "class-validator";


export class UserUpdateDto {

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    firstname: string

    @IsNotEmpty()
    lastname: string
}