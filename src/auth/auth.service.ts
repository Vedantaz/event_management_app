import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(private prisma:PrismaService, private jwtService:JwtService){}

    async signup(data:SignupDto){
        
            const existingUser = await this.prisma.user.findUnique({
                where: { email: data.email }
            });
            if (existingUser) { throw new BadRequestException("Email is already in use, please login!"); }
            
            const hashPassword = await bcrypt.hash(data.password, 10);
            const user = await this.prisma.user.create({
                data:{
                    name:data.name,
                    email:data.email,
                    password:hashPassword,
                    role:data.role
    
                }
            })
            return {msg : "User registered successfully!", user}
        
    }

    async login(data:LoginDto) : Promise<{access_token:string}>{

            const user = await this.prisma.user.findUnique({where:{email:data.email}});
            if(!user) throw new UnauthorizedException('Invalid Credentials');

            const validPassword = await bcrypt.compare(data.password, user.password);
            if(!validPassword) throw new UnauthorizedException('Invalid Credentials');

            const token = this.jwtService.sign({userId:user.id, role:user.role});
            return {access_token:token};
        
    }
 
}
