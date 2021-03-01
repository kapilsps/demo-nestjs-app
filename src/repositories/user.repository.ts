import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/db/entities/user.entity';
import { RegisterDto } from 'src/dtos/auth/register.dto';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/dtos/auth/login.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * Create user in the storage
   * @param registerDto
   */
  async createUser(registerDto: RegisterDto): Promise<User> {
    try {
      const { username, email, password } = registerDto;
      const user = new User();
      user.name = username;
      user.email = email;
      user.password = await this.hashPassword(password);
      await user.save();

      return user;
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new ConflictException(
          'EMail Address already exist. Please choose another email address.',
        );
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Hash the password
   * @param password
   */
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  /**
   * find the user in the storage
   * @param data
   */
  async findUser(data: LoginDto): Promise<User | void> {
    const { email, password } = data;
    const user = await this.findOne({ email });
    console.log(await user.validatePassword(password));

    if (user && (await user.validatePassword(password))) {
      return user;
    }
    return;
  }

  /**
   * chacke email exists in database or not
   * @param email 
   */
  async emailExists(email: string):Promise<boolean>{
    const user = await this.createQueryBuilder('users').where('email = :emailId',{ emailId: email }).getOne();
    if(user){
      return false;
    }
    return true;
  }
}
