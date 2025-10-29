import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateItemInput } from "./dto/create-item.input";
import { Item } from "./item.entity";
import { v4 as uuidv4 } from 'uuid'
import { deleteFromRedis, getFromRedis, saveToRedis } from "src/utils/redis.client";

@Injectable()
class ItemRepository {
    constructor(private prisma: PrismaService) { }

    async viewItems(id: string): Promise<Item | any> {
        const cachedItem = await getFromRedis(`item:${id}`);
        if (cachedItem) {
            return JSON.parse(cachedItem);
        }
        const item = await this.prisma.item.findFirst({
            where: { id }
        });
        if (item) {
            await saveToRedis(`item:${id}`, JSON.stringify(item));
        }
        return item;
    }

    async addItem(data: CreateItemInput): Promise<Item | any> {
        const id = uuidv4();

        const item: Item = {
            id,
            name: data.name,
            status: data.status.toString() as any,
            updatedBy: data.updatedBy,
            notifications: [],
            createdAt: new Date(),
            updatedAt: new Date()
        }

        await saveToRedis(`item:${id}`, JSON.stringify(item))
        console.log(`Item salvo no Redis com a chave item: ${id}`)
        return item;
    }



    async deletedItem(id: string): Promise<Item | any> {
        const redisKey = `item:${id}`;
        const cachedItem = await getFromRedis(redisKey);

        if (!cachedItem) {
            throw new Error(`Item com id ${id} não encontrado no Redis`);
        }

        const deleted = await deleteFromRedis(redisKey);

        if (!deleted) {
            console.warn(`Nenhuma chave encontrada no Redis para Item:${id}`)
        }

        return { message: `${redisKey} removido do Redis`, deleted };
    }
}

export { ItemRepository };