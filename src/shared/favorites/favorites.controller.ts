import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Delete,
  HttpStatus,
  HttpCode,
} from "@nestjs/common";
import { markFavorites } from "./dto/favorites.dto";
import { FavoritesService } from "./favorites.service";
import { AuthUser } from "src/common/decorators/auth.decorator";
import { JwtPayloadDto } from "src/auth/dto/jwtPayload.dto";
import { JwtAuthGuard } from "src/common/guards/jwtAuthGuard";
import { ApiOperation } from "@nestjs/swagger";
import { swaggerMessages } from "src/common/constants/swagger.contants";

@Controller("favorites")
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post("mark-favorites")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async markFavoriteEvents(
    @Body() dto: markFavorites,
    @AuthUser() authUser: JwtPayloadDto
  ) {
    const userId = authUser.userId;
    const favorites = await this.favoritesService.markFavorite(userId, dto);
    return { message: favorites };
  }

  @Get("get-all-favorites")
  async getFavoriteEvents() {
    const events = await this.favoritesService.getFavoriteEvents();
    return { data: events };
  }

  @Get("fetch-user-favorites")
  @UseGuards(JwtAuthGuard)
  async fetchFavoriteEvents(@AuthUser() authUser: JwtPayloadDto) {
    return this.favoritesService.fetchFavoriteEvents(authUser.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("delete-favorites")
  @ApiOperation({ summary: swaggerMessages.REMOVE_FAVORITES })
  async removeFavorite(
    @Body() dto: markFavorites,
    @AuthUser() authUser: JwtPayloadDto
  ) {
    await this.favoritesService.removeFavorite(authUser.userId, dto);
    return {
      status: HttpStatus.OK,
      message: swaggerMessages.REMOVED_FAVORITES,
    };
  }
}
