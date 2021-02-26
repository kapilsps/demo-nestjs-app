import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class UserController {
    @Get('/dashboard')
    @Render('user/dashboard/index')
    getDashboard(){
        return {
            title: 'Dashboard'
        }
    }
}
