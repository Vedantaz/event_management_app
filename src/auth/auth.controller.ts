import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "../common/guards/jwtAuthGuard";
import { auth, Messages } from "src/common/constants/auth.constants";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { TokenDto } from "./dto/token.dto";
import { SuccessResponse } from "src/common/interceptors/success-response.interceptor";
import { Request } from "express";
@Controller("auth")
@ApiTags("Auth Controller")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  @ApiResponse({
    description: Messages.SIGNUP_SUCCESS,
    status: HttpStatus.CREATED,
    type: SignupDto,
  })
  @ApiOperation({ summary: Messages.SIGN_UP })
  async signUp(@Body() data: SignupDto) {
    return this.authService.signup(data);
  }

  @Post("login")
  @ApiResponse({
    description: Messages.LOGGED_SUCCESS,
    status: HttpStatus.CREATED,
  })
  @ApiOperation({ summary: Messages.LOG_IN })
  async login(
    @Body() data: LoginDto,
    @Req() req: Request
  ): Promise<SuccessResponse<TokenDto>> {
    const result = await this.authService.login(data);
    req.res?.cookie(auth.ACCESS_TOKEN, `Bearer ${result.accessToken}`, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
    });
    return { statusCode: HttpStatus.CREATED, message: Messages.LOGGED_SUCCESS };
  }

  @Post("logout")
  @ApiBearerAuth()
  @ApiOperation({ summary: Messages.LOG_OUT })
  @ApiOkResponse({ description: Messages.AUTH.COOKIE_DELETED_SUCCESS })
  @UseGuards(JwtAuthGuard)
  async logout(@Req() request: Request): Promise<LogoutResponseDto> {
    request.res?.clearCookie(auth.ACCESS_TOKEN);
    return {
      statusCode: auth.STATUS.OK,
      message: Messages.AUTH.COOKIE_DELETED_SUCCESS,
    };
  }
}
