import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { MailService } from 'src/mail/mail.service';
import { ConfigService } from '@nestjs/config';
@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UsersService, JwtStrategy, MailService, ConfigService],
  imports:[
    PassportModule,
    JwtModule.register({
      global:true,
      secret:'secretKey',
      signOptions:{expiresIn:'1h'}
    })
  ],
  exports:[MailService]
})
export class AuthModule {

}
