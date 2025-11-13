import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotificationRepository } from './notifications.repository';
import { NotificationsGateway } from './notifications.gateway';

@Module({
  imports: [PrismaModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationRepository, NotificationsGateway],
  exports: [NotificationsService, NotificationRepository]
})
export class NotificationsModule { }
