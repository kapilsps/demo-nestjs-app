import { Body, Controller, Get, Post, Render, ValidationPipe } from '@nestjs/common';
import { RegisterDto } from 'src/dtos/auth/register.dto';

@Controller()
export class AuthController {

    @Get('/register')
    @Render('auth/register')
    getRegister(){
        return {
            title: 'Register',
            layout: 'layouts/auth-layout'
        }
    }

    @Post('/register')
    postRegister(@Body(ValidationPipe) body: RegisterDto){
        console.log(body);
        return body;
    }


    @Get('/login')
    @Render('auth/login')
    getLogin(){
        return {
            title: 'Login',
            layout: 'layouts/auth-layout'
        }
    }

    @Post('/login')
    postLogin(){
        
    }

    @Get('/forgot-password')
    @Render('auth/forgot-password')
    getForgotPwd(){
        return {
            title: 'Forgot Password',
            layout: 'layouts/auth-layout'
        }
    }

    @Post('/forgot-password')
    postForgotPwd(){
        
    }

}
