import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { User } from "src/db/entities/user.entity";
import { UserRepository } from "src/repositories/user.repository";
import { getCustomRepository, getRepository } from "typeorm";

@ValidatorConstraint({
    async:true
})
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface{

    constructor(private userRepository: UserRepository){}

    validate(text: string, args: ValidationArguments){
        const userRepository = getCustomRepository(UserRepository);
        return userRepository.emailExists(text);
    }

    defaultMessage(args: ValidationArguments) {
        // here you can provide default error message if validation failed
        return 'Email Address ($value) is already in use. Choose another email.';
    }
}

export function IsEmailAlreadyExists(validationOptions?: ValidationOptions){
    return function(object: Object, propertyName:string){
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options:validationOptions,
            constraints:[],
            validator:IsEmailAlreadyExistConstraint,
        });
    }
}