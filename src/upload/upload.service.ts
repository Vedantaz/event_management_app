import * as fs from 'fs';
import * as path from 'path';
import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma.service';

import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UploadService {
  private uploadDir = path.join(__dirname, '../../uploads');

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {
    this.ensureUploadFolder();
  }

  private ensureUploadFolder() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  static getMulterConfig() {
    const uploadDir = path.join(__dirname, '../../uploads');

    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }
          cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
          const timestamp = Date.now();
          const uniqueId = uuidv4();
          const ext = path.extname(file.originalname);
          cb(null, `${timestamp}-${uniqueId}${ext}`);
        },
      }),
      fileFilter: (req: any, file: any, cb: Function) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
          return cb(new Error('Only JPEG and PNG files are allowed'), false);
        }
        cb(null, true);
      },
    };
  }

  async storedProfile(id: number, profileName: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return { statusCode: 404, message: 'User not found' };
    }

    await this.prisma.user.update({
      where: { id },
      data: { imageURL: profileName },
    });

    return { statusCode: 200, message: 'Profile picture updated successfully' };
  }

  extractUserId(req: Request): number | null {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;

    const token = authHeader.split(' ')[1];
    const decoded = this.jwtService.decode(token) as { userId: number };
    return decoded?.userId || null;
  }

  getUploadedFilePath(fileName: string): string {
    return path.join(this.uploadDir, fileName);
  }

  isFileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  getMulterConfig() {
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, this.uploadDir);
        },
        filename: (req, file, cb) => {
          const uniqueFileName = `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`;
          cb(null, uniqueFileName);
        },
      }),
    };
  }

  async updateImage(userId: number, newFile: Express.Multer.File) {
    const user = await this.prisma.user.findUnique({
      where: { id:userId },
      select: { imageURL: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.imageURL) {
      const oldFilePath = path.join(this.uploadDir, user.imageURL);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    await this.prisma.user.update({
      where: { id:userId },
      data: { imageURL: newFile.filename },
    });

    return {
      statusCode: 200,
      message: 'Profile picture updated successfully',
      url: `http://localhost:3000/upload/getProfile/${newFile.filename}
`,
    };
  }
}
