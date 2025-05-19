import { OnEvent } from "@nestjs/event-emitter";
import { Injectable } from "@nestjs/common";
import { SpotOpenedEvent } from "src/shared/event/spot-opened";
import { MailService } from "../mail.service";

@Injectable()
export class SpotOpenedListener {
  constructor(private readonly mailService: MailService) {}

  @OnEvent("spot-opened")
  async handleSpotOpened(event: SpotOpenedEvent) {
    await this.mailService.sendSpotOpenedNotification({
      email: event.email,
      name: event.name,
      event: event.event,
    });
  }
}
