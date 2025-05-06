import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { PrismaService } from "../../prisma.service";
import * as fs from "fs";
import * as path from "path";
import { Messages } from "../../common/constants/users.constants";
@Injectable()
export class UsersService {
  private uploadDir = path.join(__dirname, "../../uploads/events");

  constructor(private prisma: PrismaService) {
    this.ensureUploadImg();
  }

  private ensureUploadImg() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  findByMail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return { data: users };
  }

  async updateUser(userId: number, data: UpdateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new NotFoundException();
    }
    const hasValidUpdateData =
      data &&
      Object.values(data).some(
        (value) => value !== undefined && value !== null && value !== ""
      );
    if (!hasValidUpdateData) {
      throw new BadRequestException(Messages.USER.NOT_DATA_TO_UPDATE);
    }
    return await this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  deleteUser(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
