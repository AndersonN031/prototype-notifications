import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemInput } from './dto/create-item.input';
import { Item } from './item.entity';


@Controller('items')
export class ItemsController {
    constructor(private itemsService: ItemsService) { }

    // @Get('/:id/notifications')
    // async viewNotification(@Param('id') id: string, @Res() res): Promise<Notification> {
    //     const notification = await this.itemsService.viewAllNotification(id);
    //     return res.status(200).json(notification)

    // }
    
    @Get('/:id')
    async viewAllItems(@Param('id') id: string, @Res() res) {
        const item = await this.itemsService.viewAllItems(id);
        return res.status(200).json(item);
    }

    @Post('/create')
    async addItem(@Body() data: CreateItemInput, @Res() res): Promise<Item> {
        const item = await this.itemsService.addItem(data);
        return res.status(201).json(item);
    }

    @Delete('/:id')
    async deletedItem(@Param('id') id: string, @Res() res): Promise<Item> {
        const item = await this.itemsService.deletedItem(id);
        return res.status(200).json(item);
    }

}
