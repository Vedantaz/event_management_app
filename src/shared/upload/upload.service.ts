import * as fs from "fs";
import * as path from "path";
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Messages } from "src/common/constants/upload.constants";

@Injectable()
export class UploadService {
  private uploadDir = path.join(__dirname, "../../../uploads");

  constructor(private readonly prisma: PrismaService) {
    this.ensureUploadFolder();
  }

  private ensureUploadFolder() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async createProfile(profile: Express.Multer.File, userId: number) {
    if (!profile || !profile.buffer) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: Messages.INVALID_FILETYPE,
      });
    }

    const fileName = `${userId}-${profile.originalname}`;
    const filePath = path.join(this.uploadDir, fileName);

    try {
      fs.writeFileSync(filePath, profile.buffer);
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: Messages.IMAGE_FAILED_TO_SAVE_IN_FOLDER,
      });
    }
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: Messages.USER.NOT_FOUND,
        });
      }
      await this.prisma.user.update({
        where: { id: userId },
        data: { imageURL: fileName },
      });

      return {
        message: Messages.UPDATED_PROFILE,
        imageUrl: `${Messages.URL.imageUrl}${fileName}`,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: Messages.UPLOAD_FILE_FAILED,
      });
    }
  }

  getUploadedFilePath(filename: string): string {
    return path.join(this.uploadDir, filename);
  }

  isFileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  async updateImage(userId: number, image: Express.Multer.File) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: Messages.FILE_NOT_FOUND,
      });
    }

    if (image && image.buffer) {
      const ext = path.extname(image.originalname);
      const fileName = `${userId}-${image.originalname}`;
      const filePath = path.join(this.uploadDir, fileName);

      if (existingUser.imageURL) {
        const previousFilePath = path.join(
          this.uploadDir,
          existingUser.imageURL
        );
        if (fs.existsSync(previousFilePath)) {
          fs.unlinkSync(previousFilePath);
        }
      }

      try {
        fs.writeFileSync(filePath, image.buffer);
      } catch (error) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: Messages.IMAGE_FAILED_TO_SAVE,
        });
      }

      await this.prisma.user.update({
        where: { id: userId },
        data: {
          imageURL: fileName,
          updatedAt: new Date(),
        },
      });
    }

    await this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
