import { IsEmail, IsNotEmpty } from "class-validator";

export class UserSignupDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    lastname: string;
}