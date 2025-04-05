import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {

    const user = await this.prisma.user.findUnique({where:{email: data.email}});
    if(data.email === user?.email) { throw new ConflictException("Email already exists")}
    return this.prisma.user.create({ data });
  }

  async findByMail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async updateUser(id: number, data: UpdateUserDto) {
    
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id:number){
    return this.prisma.user.delete({where:{id}});
  }
}
