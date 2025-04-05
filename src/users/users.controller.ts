import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt_authGuard';
import { RolesGuard } from 'src/role/role.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { Roles } from 'src/role/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ROLES } from 'src/enums/role-enum';

@Controller('users')
@UseGuards(JwtAuthGuard, AuthGuard('jwt'), RolesGuard)
export class UsersController {

    constructor(private readonly usersService:UsersService){}

    @Post()
    @Roles(ROLES.ADMIN)
    createUser(@Body() createUserDto:CreateUserDto){
        return this.usersService.createUser(createUserDto); 
    }

    @Get()
    @Roles(ROLES.ADMIN)
    findAll(){
        return this.usersService.findAll();
    }

    @Get(':id')
    @Roles(ROLES.ADMIN) 
    findOne(@Param('email') id: number) {
        return this.usersService.findById(id);
    }

    @Put(':id')
    @Roles(ROLES.ADMIN) 
    updateUser(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
        return this.usersService.updateUser(Number(id), updateUserDto);
    }

    @Delete(':id')
    @Roles(ROLES.ADMIN) 
    removeUser(@Param('id') id: string) {
        return this.usersService.deleteUser(Number(id));
    }
}
