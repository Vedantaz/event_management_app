import { IsString, IsEmail, IsNotEmpty, MinLength, IsOptional, IsEnum, IsDate } from 'class-validator';

export class sendEmailDto{
    @IsEmail({}, {each:true})
    recipients:string[];

    @IsString()
    subject:string;

    @IsString()
    html:string;

    @IsOptional()
    @IsString()
    text?:string;

    @IsString() 
    @IsOptional()
    scheduleTime?: string;

    @IsDate()
    @IsOptional()
    date?:Date;


}