import { IsString, IsEmail, IsNotEmpty, MinLength, IsOptional, IsEnum } from 'class-validator';


enum ROLES{
ADMIN ='ADMIN',
USER = 'USER'
}
export class CreateUserDto {
  @IsNotEmpty()
    name: string;

  @IsEmail()
    email: string;

  @MinLength(6)
  @IsString()
    password: string;

    @IsEnum(ROLES)
    role?:ROLES

    @IsString()
    @IsOptional()
    imageURL:string
}
