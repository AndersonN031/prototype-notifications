import { Injectable } from '@nestjs/common';
import { ItemRepository } from './items.repository';
import { CreateItemInput } from './dto/create-item.input';
import { Item } from './item.entity';
import { updateItemInput } from './dto/update-item.input';

@Injectable()
export class ItemsService {
    constructor(private readonly itemsRepository: ItemRepository) { }

    // async viewAllNotification(itemId: string): Promise<Notification | any> {
    //     try {
    //         return await this.itemsRepository.viewAllNotification(itemId);
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    async viewAllItems(id: string): Promise<Item | any> {
        try {
            const item = await this.itemsRepository.viewAllItems(id)
            return item;
        } catch (error) {
            throw error;
        }
    }


    async addItem(data: CreateItemInput): Promise<Item | any> {
        try {
            return await this.itemsRepository.addItem(data);
        } catch (error) {
            throw error;
        }
    }

    async deletedItem(id: string): Promise<Item | any> {
        try {
            return await this.itemsRepository.deletedItem(id)
        } catch (error) {
            throw error;
        }
    }
}
