import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as ejs from 'ejs';

@Injectable()
export class MailService {
    constructor(private readonly mailService: MailerService){}

    private mail(template: string, data?: object){
        this.mailService.sendMail({
            to:'no-body@mail.com',
            subject:'Testing the nestjs mail functionality',
            template:template,
            context: data,
        })
        .then(res => {
            console.log(res);
            return true;
        })
        .catch(err => {
            console.log(err);
            return false;
        });
    }

    sendWelcomeEmail(template: string, data?:object){
        this.mail(template, data);
    }
}
