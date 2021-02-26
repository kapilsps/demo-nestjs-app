import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/db/entities/user.entity';
import { GetUser } from 'src/decorators/get-user.decorator';
import { UserApiService } from './user-api.service';

@Controller('user-api')
@UseGuards(AuthGuard)
export class UserApiController {
    
    constructor(private userApiService: UserApiService){}

    @Get('/profile')
    getProfile(@GetUser() user:User){
        return user;
    }
}
