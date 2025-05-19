import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { markFavorites } from "./dto/favorites.dto";
import { eventMessages } from "src/common/constants/event.constants";

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async markFavorite(userId: number, data: markFavorites) {
    const { eventId } = data;
    const event = await this.prisma.event.findUnique({
      where: { id: data.eventId },
    });
    if (!event) {
      throw new NotFoundException(eventMessages.EVENT_NOT_FOUND);
    }

    const existingFavorite = await this.prisma.favorites.findUnique({
      where: { userId_eventId: { userId, eventId } },
    });

    if (existingFavorite) {
      await this.prisma.favorites.delete({
        where: { userId_eventId: { userId, eventId } },
      });
      return eventMessages.EVENT_REMOVE_FROM_FAVORITES;
    } else {
      await this.prisma.favorites.create({
        data: { userId, eventId },
      });
      return eventMessages.EVENT_MARKED_FAVORITE;
    }
  }

  async getFavoriteEvents() {
    return await this.prisma.favorites.findMany();
  }

  async fetchFavoriteEvents(userId: number) {
    const favorites = await this.prisma.favorites.findMany({
      where: { userId },
      include: { event: true },
    });

    return {
      data: favorites,
    };
  }

  async removeFavorite(userId: number, dto: markFavorites) {
    const eventId = dto.eventId;

    const existing = await this.prisma.favorites.findUnique({
      where: { userId_eventId: { userId, eventId } },
    });

    if (!existing) {
      throw new BadRequestException({
        status: HttpStatus.NOT_FOUND,
      });
    }

    await this.prisma.favorites.delete({
      where: { userId_eventId: { userId, eventId } },
    });

    return;
  }
}
