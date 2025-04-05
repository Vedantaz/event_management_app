// @Controller('upload')
// export class UploadController {
//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly uploadService: UploadService,
//   ) {}

//   @Post('uploadProfile')
//   @UseInterceptors(
//     FileInterceptor('file', {
//       storage: diskStorage({
//         destination: (req, file, cb) => {
//           const uploadDir = path.join(__dirname, '../../uploads');
//           if (!fs.existsSync(uploadDir)) {
//             fs.mkdirSync(uploadDir, { recursive: true });
//           }
//           cb(null, uploadDir);
//         },
//         filename: (req, file, cb) => {
//           const timestamp = Date.now();
//           const uniqueFileName = `${timestamp}-${file.originalname}`;
//           cb(null, uniqueFileName);
//         },
//       }),
//       fileFilter: (req, file, cb) => {
//         const allowedTypes = ['image/jpeg', 'image/png'];
//         if (!allowedTypes.includes(file.mimetype)) {
//           return cb(new Error('Only JPEG and PNG files are allowed'), false);
//         }
//         cb(null, true);
//       },
//     }),
//   )
// //   @UseGuards(AuthGuard, RolesGuard)
// //   @Roles(Role.USER)
//   async uploadPicture(
//     @UploadedFile() file: Express.Multer.File,
//     @Req() req: Request,
//   ) {
//     if (!file) {
//       return {
//         statusCode: 400,
//         message: 'Invalid file format. Please upload JPEG or PNG images only.',
//       };
//     }

//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//       return { statusCode: 401, message: 'Unauthorized: No token provided' };
//     }

//     const token = authHeader.split(' ')[1];
//     const decoded = this.jwtService.decode(token) as { userId: string };
//     if (!decoded || !decoded.userId) {

//       return { statusCode: 401, message: 'Unauthorized: Invalid token' };
//     }
//     const id = decoded.userId;

//     const result = await this.uploadService.storedProfile(
//       id,
//       file.filename,
//     );

//     return {
//       statusCode: result.statusCode,
//       message: result.message,
//       url: `http://localhost:3000/upload/getProfile/${file.filename}`,
//     };
//   }

//   @Get('getProfile/:filename')
//   getImg(@Param('filename') filename: string, @Res() res: Response) {
//     const filePath = this.uploadService.getUploadedFilePath(filename);

//     if (!this.uploadService.isFileExists(filePath)) {
//       return res.status(404).json({ message: 'File not found' });
//     }
//     return res.sendFile(filePath);
//   }
// }

////////

import {
  Controller,
  Get,
  Post,
  Param,
  Res,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response, Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { UploadService } from "./upload.service";
import { RolesGuard } from "src/role/role.guard";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/role/role.decorator";
import { ROLES } from "src/enums/role-enum";
import { JwtAuthGuard } from "src/auth/jwt_authGuard";

@Controller("upload")
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly jwtService: JwtService
  ) {}

  @UseGuards(AuthGuard("jwt"))
  @Roles(ROLES.USER)
  @Post("uploadProfile")
  @UseInterceptors(FileInterceptor("file", UploadService.getMulterConfig()))
  async uploadProfile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request
  ) {
    if (!file) {
      return {
        statusCode: 400,
        message: "Invalid file format. Please upload JPEG or PNG images only.",
      };
    }

    const id = this.uploadService.extractUserId(req);
    console.log(id);
    if (!id) {
      return { statusCode: 401, message: "Unauthorized: Invalid token" };
    }

    const result = await this.uploadService.storedProfile(id, file.filename);
    return {
      statusCode: result.statusCode,
      message: result.message,
      url: `http://localhost:3000/upload/getProfile/${file.filename}
`,
    };
  }

  @UseGuards(AuthGuard("jwt"))
  @Roles(ROLES.USER)
  @Get("getProfile/:filename")
  getProfile(@Param("filename") filename: string, @Res() res: Response) {
    const filePath = this.uploadService.getUploadedFilePath(filename);
    if (!this.uploadService.isFileExists(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }
    return res.sendFile(filePath);
  }

  @UseGuards(JwtAuthGuard, AuthGuard("jwt"))
  @Roles(ROLES.USER)
  @Post("updateProfile")
  @UseInterceptors(FileInterceptor("file", UploadService.getMulterConfig()))
  async updateProfile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request
  ) {
    const id = req["user"].userId;
    console.log(req["user"].userId);
    if (!id) {
      return { statusCode: 401, message: "Unauthorized: Invalid token" };
    }
    return await this.uploadService.updateImage(id, file);
  }
}
