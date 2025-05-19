import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Messages } from "../constants/auth.constants";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookie(request);

    if (!token) {
      throw new UnauthorizedException(Messages.NO_TOKEN);
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>("JWT_SECRET"),
      });

      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException(Messages.INVALID_EXPIRED_TOKEN);
    }
    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    const accessToken = request.cookies?.access_token;
    if (!accessToken) return undefined;

    const [type, token] = accessToken.split(" ");
    return type === "Bearer" ? token : undefined;
  }
}
