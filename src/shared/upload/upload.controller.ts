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
  Patch,
  BadRequestException,
  HttpStatus,
  UnauthorizedException,
  InternalServerErrorException,
  Body,
  ParseIntPipe,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response, Request } from "express";
import { UploadService } from "./upload.service";
import { RolesGuard } from "src/common/guards/role.guard";
import { JwtAuthGuard } from "src/common/guards/jwtAuthGuard";
import { Messages } from "src/common/constants/upload.constants";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

import { AuthUser } from "src/common/decorators/auth.decorator";
import { JwtPayloadDto } from "src/auth/dto/jwtPayload.dto";
import { swaggerMessages } from "src/common/constants/swagger.contants";
import { ROLES } from "src/common/enums/enums";
import { Roles } from "src/common/decorators/role.decorator";

@Controller("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseGuards(JwtAuthGuard)
  @Post("uploadProfile")
  @UseInterceptors(FileInterceptor("file"))
  @ApiOperation({ summary: swaggerMessages.UPLOAD_FILE })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    required: true,
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: Messages.PROFILE_CREATED,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: `${Messages.FILE_NOT_FOUND} | ${Messages.IMAGE_FAILED_TO_SAVE}`,
  })
  async uploadProfile(
    @UploadedFile() file: Express.Multer.File,
    @AuthUser() authUser: JwtPayloadDto
  ) {
    const id = authUser.userId;
    if (!file) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: Messages.FILE_FORMAT,
      };
    }
    try {
      const res = await this.uploadService.createProfile(file, id);
      return {
        statusCode: HttpStatus.CREATED,
        message: Messages.PROFILE_UPLOADED,
        data: { Url: res.imageUrl },
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: Messages.IMAGE_FAILED_TO_SAVE,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get("getprofile/:filename")
  @ApiOperation({ summary: swaggerMessages.GET_PROFILE_WITH_FILENAME })
  getProfile(@Param("filename") filename: string, @Res() res: Response) {
    const filePath = this.uploadService.getUploadedFilePath(filename);
    if (!this.uploadService.isFileExists(filePath)) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: Messages.FILE_NOT_FOUND });
    }
    return res.sendFile(filePath);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @Patch("update-profile/:id")
  @ApiBearerAuth()
  @ApiOperation({ summary: swaggerMessages.UPDATE_PROFILE_PIC })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    required: true,
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor("file"))
  async updateProfile(
    @UploadedFile() file: Express.Multer.File,
    @Param("id", ParseIntPipe) id: number
  ) {
    if (!id) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        message: Messages.AUTH.UNAUTHORIZED,
      });
    }

    if (!file) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: Messages.FILE_NOT_RECIEVED,
      });
    }
    try {
      const updatedUser = await this.uploadService.updateImage(id, file);
      return {
        message: Messages.PROFILE_UPDATED,
        data: updatedUser,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: Messages.SERVER_ERROR,
      });
    }
  }
}
