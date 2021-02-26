import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterDto{
    @IsString()
    @MaxLength(200)
    @MinLength(2)
    username: string;

    @IsString()
    @MaxLength(200)
    @MinLength(2)
    email:string;

    @MaxLength(200)
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password must contain one alphabet, one number, one special character, one uppercase letter and must be 8 character long'
    })
    password:string;
}