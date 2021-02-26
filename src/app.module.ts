import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/database.config';
import { AuthModule } from './modules/web/auth/auth.module';
import { UserModule } from './modules/web/user/user.module';
import { AuthApiModule } from './modules/api/auth-api/auth-api.module';
import { TaskApiModule } from './modules/api/task-api/task-api.module';
import { UserApiModule } from './modules/api/user-api/user-api.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, UserModule, AuthApiModule, TaskApiModule, UserApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
