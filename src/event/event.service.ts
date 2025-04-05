import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { CreateEventDto } from './dto/createEvent.dto';
import { UpdateEventDto } from './dto/updateEvent.dto';


@Injectable()
export class EventService {

    constructor(private prisma: PrismaService) {}

   
    async createEvent(data: CreateEventDto) {
        return this.prisma.event.create({ data });
      }
    
      async getAllEvents() {
        return this.prisma.event.findMany();
      }
    
      async getEventById(id: number) {
        const event = await this.prisma.event.findUnique({ where: { id } });
        if (!event) throw new NotFoundException('Event not found');
        return event;
      }
    
      async updateEvent(id: number, data: UpdateEventDto) {

        const user = await this.prisma.event.findUnique({where:{id}});

        return await this.prisma.event.update({ where: { id }, data });
      }

      async deleteEvent(id: number) {
        return this.prisma.event.delete({ where: { id } });
      }
    
}
