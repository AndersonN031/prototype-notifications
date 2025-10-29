import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ItemRepository } from './items.repository';
import { ItemsService } from './items.service';

@Module({
  imports: [PrismaModule],
  controllers: [ItemsController],
  providers: [ItemRepository, ItemsService],
  exports: [ItemsService, ItemRepository]
})
export class ItemsModule { };
