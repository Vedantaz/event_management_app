import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class eventRegister{

    @IsNotEmpty()
    @IsEmail()
    email: string[];
    @IsNotEmpty()
    @IsString()
    name: string 
}