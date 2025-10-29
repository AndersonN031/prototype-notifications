import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsModule } from './notifications/notifications.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ItemsService } from './items/items.service';
import { ItemsModule } from './items/items.module';
import { NotificationsService } from './notifications/notifications.service';

@Module({
  imports: [NotificationsModule, PrismaModule, ItemsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, ItemsService, NotificationsService],
})
export class AppModule {}
