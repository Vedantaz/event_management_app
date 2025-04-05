import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.jwtSecret || "secretKey",
    });
  }

  async validate(payload: any) {
    // const user = await this.prisma.user.findUnique({
    //   where: { id: payload.userId },
    //   select: { id: true, email: true, role: true },

    //   // this is taken from token-wise Admin, like your admin token contains userId,
    //   // so id : undefined, only through userId, you will  get userId, email

    // });

    // if (!user) {
    //   throw new UnauthorizedException();
    // }

    return { userId: payload.userId, email: payload.email };
  }
}
