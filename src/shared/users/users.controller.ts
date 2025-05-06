import {
  Controller,
  Get,
  Delete,
  Body,
  Param,
  Patch,
  UseGuards,
  ParseIntPipe,
  NotFoundException,
  HttpStatus,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "src/common/guards/jwtAuthGuard";
import { RolesGuard } from "src/common/guards/role.guard";
import { CreateUserResponseDto } from "./dto/createUser.dto";
import { Roles } from "src/common/decorators/role.decorator";
import { ROLES } from "src/common/enums/enums";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { SuccessResponse } from "src/common/interceptors/success-response.interceptor";
import { Messages } from "src/common/constants/users.constants";
import { swaggerMessages } from "src/common/constants/swagger.contants";
import { AuthUser } from "src/common/decorators/auth.decorator";
import { JwtPayloadDto } from "src/auth/dto/jwtPayload.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("get-all")
  @ApiOperation({ summary: Messages.USER.GET_ALL_USERS })
  async findAll() {
    const users = await this.usersService.findAll();
    if (!users) throw new NotFoundException(Messages.USER.NOT_FOUND);
    return { message: Messages.USER.USERS_RETRIEVED_SUCCESS, data: users };
  }

  @Get("get/:id")
  @ApiOperation({ summary: Messages.USER.GET_SPECIFIC_USER })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const user = await this.usersService.findById(id);
    if (!user) throw new NotFoundException(Messages.USER.NOT_FOUND);
    return { message: Messages.USER.USER_RETRIEVED_SUCCESS, data: user };
  }

  @Patch("update-user")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: swaggerMessages.UPDATE_USER })
  async updateUser(
    @AuthUser() authUser: JwtPayloadDto,
    @Body() data: UpdateUserDto
  ): Promise<SuccessResponse<CreateUserResponseDto>> {
    const userId = authUser.userId;
    const updatedUser = await this.usersService.updateUser(userId, data);
    if (!data || Object.keys(data).length === 0)
      return { message: Messages.USER.NOT_DATA_TO_UPDATE };
    return {
      statusCode: HttpStatus.OK,
      message: Messages.USER.UPDATED_SUCCESS,
      data: updatedUser,
    };
  }

  @Delete("delete/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: swaggerMessages.DELETE_USER })
  async removeUser(
    @Param("id", ParseIntPipe) id: number
  ): Promise<SuccessResponse<CreateUserResponseDto>> {
    const deletedUser = await this.usersService.deleteUser(id);
    return {
      statusCode: HttpStatus.OK,
      message: Messages.USER.DELETED_SUCCESS,
      data: deletedUser,
    };
  }
}
