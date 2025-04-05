import { Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt_authGuard';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/role.decorator';
import { MailService } from 'src/mail/mail.service';
import { ROLES } from 'src/enums/role-enum';

@Controller('auth')

export class AuthController {
 
    constructor (private readonly authService : AuthService, private readonly mailService:MailService){}
    

    @Post('signup')
    async signUp(@Body() data:SignupDto){
        return this.authService.signup(data);
    } 

    @Post('login')
    async login(@Body() data: LoginDto) {
        console.log('login is working');
        return this.authService.login(data);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ROLES.ADMIN)
    getProfile(){
        return 'It is working Vedant';
    } 

    @Post('event/register')
    async register(@Body() body: { email: string[]; name: string }) {
        await this.mailService.sendRegistrationConfirmation(body.email, body.name);
        return { message: 'Registration email sent' };
    }

    @Post('event/booking')
    async sendBookingConfirmation(@Body() body: { email: string[]; name: string; event: string }) {
        await this.mailService.sendEventBookingConfirmation(body.email, body.name, body.event);
        return { message: 'Event booking confirmation email sent' };
    }

    @Post('event/reminder')
    async sendEventReminder(@Body() body: {recipients:string[], subject:string, date:string}) {
        await this.mailService.sendEventReminder(body.recipients, body.subject, body.date?.toLocaleString());
        // return { message: 'Event reminder email sent' };
        // this.mailService.scheduleEmail(emailsDto);
        // this.mailService.processScheduledEmails();
        return { message: 'Event reminder scheduled successfully' };
    }

    @Post('event/cancel-booking')
    async sendBookingCancellation(@Body() body: { email: string[]; name: string; event: string }) {
        await this.mailService.sendBookingCancellation(body.email, body.name, body.event);
        return { message: 'Booking cancellation email sent' };
    }
}