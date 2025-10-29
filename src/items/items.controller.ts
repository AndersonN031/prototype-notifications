import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemInput } from './dto/create-item.input';
import { Item } from './item.entity';
import { updateItemInput } from './dto/update-item.input';

@Controller('items')
export class ItemsController {
    constructor(private itemsService: ItemsService) { }

    @Get('/:id')
    async viewItems(@Param('id') id: string, @Res() res) {
        const item = await this.itemsService.viewItems(id);
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
