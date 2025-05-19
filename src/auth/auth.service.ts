import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { Messages } from "src/common/constants/auth.constants";
import { SignupDto } from "./dto/signup.dto";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async signup(data: SignupDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new BadRequestException(Messages.EMAIL_ALREADY_IN_USE);
    }

    const hashPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashPassword,
        role: data.role,
      },
    });
    return { msg: Messages.USER_REGISTER_SUCCESS, user };
  }

  async login(data: LoginDto): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user) throw new UnauthorizedException(Messages.INVALID_CREDENTIALS);

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword)
      throw new UnauthorizedException(Messages.INVALID_CREDENTIALS);

    const token = this.jwtService.sign({ userId: user.id, role: user.role });
    return { access_token: token };
  }

  async dashboard(userId: number) {
    const countUsers = await this.prisma.user.count();

    const countEvents = await this.prisma.event.count();

    const countBookings = await this.prisma.booking.count();

    const maxRatingRes = await this.prisma.review.aggregate({
      _max: { rating: true },
    });

    const maxRating = maxRatingRes._max.rating;
    if (maxRating === null) {
      return [];
    }

    const topRatedEvents = await this.prisma.review.findMany({
      where: { rating: maxRating },
    });

    const eventData = await this.prisma.event.findMany({
      where: { userId: userId },

      include: { user: true }, // gives al event and user info who created and what created
    });

    const data = {
      "total bookings": countBookings,
      "Total users": countUsers,
      "Total events": countEvents,
      "Top Rated Events": topRatedEvents,
      "Event data": eventData,
    };

    return data;
  }
}
