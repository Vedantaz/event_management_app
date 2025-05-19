import {
  Body,
  Controller,
<<<<<<< HEAD
  Get,
=======
>>>>>>> 682ad4a3033634a2b73516cb5378f6417b30b585
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
<<<<<<< HEAD
  ApiHeader,
=======
>>>>>>> 682ad4a3033634a2b73516cb5378f6417b30b585
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { TokenDto } from "./dto/token.dto";
import { SuccessResponse } from "src/common/interceptors/success-response.interceptor";
import { Request } from "express";
<<<<<<< HEAD
import { RolesGuard } from "src/common/guards/role.guard";
import { I18n, I18nContext } from "nestjs-i18n";
import { AuthUser } from "src/common/decorators/auth.decorator";
import { JwtPayloadDto } from "./dto/jwtPayload.dto";
=======
>>>>>>> 682ad4a3033634a2b73516cb5378f6417b30b585
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
<<<<<<< HEAD

  @Get("dashboard")
  @ApiBearerAuth()
  @ApiOperation({ summary: Messages.DASHBOARD })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiHeader({
    name: "Accept-Language",
    description: 'Language (e.g. "en" or "hi")',
    required: false,
  })
  async adminDashboard(
    @I18n() i18n: I18nContext,
    @AuthUser() authUser: JwtPayloadDto
  ) {
    const userId = authUser.userId;
    const data = await this.authService.dashboard(userId);
    console.log("Resolved language:", i18n.lang);
    return { message: i18n.t("dashboard.data_in_dashboard"), data: data };
  }
=======
>>>>>>> 682ad4a3033634a2b73516cb5378f6417b30b585
}
