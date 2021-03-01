import { MailerOptions } from "@nestjs-modules/mailer";
import { EjsAdapter } from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";
import { join } from "path";

export const mailerOption: MailerOptions = {
    transport:{
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "b4add4d8d34616",
          pass: "bc4ecdd5f2c3cc"
        }
      },
      defaults:{
        from:'"nest-modules" <mvc-test@mail.com>'
      },
      template:{
        dir: join(__dirname, '..', '..', 'views', 'email-templates'),
        adapter: new EjsAdapter(),
        options:{
          strict:true,
          engine:'EJS',
        },
      },
      preview:false
}