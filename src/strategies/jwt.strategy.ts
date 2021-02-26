import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { User } from "src/db/entities/user.entity";
import { JwtPayload } from "src/models/jwt-payload.model";
import { UserRepository } from "src/repositories/user.repository";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'its is top secret'
        });
    }

    async validate(payload: JwtPayload):Promise<User>{
        const { email } = payload;
        const user = await this.userRepository.findOne({email});
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }

}