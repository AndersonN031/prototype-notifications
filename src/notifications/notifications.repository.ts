import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateNotificationsInput } from "./dto/create-notifications.input";
import { getFromRedis, saveToRedis } from "src/utils/redis.client";
import { v4 as uuidV4 } from "uuid"

@Injectable()
class NotificationRepository {
    constructor(private prisma: PrismaService) { }

    //viewNotifications()


    async sendNotifications(itemId: string, data: CreateNotificationsInput): Promise<Notification | any> {
        const { message, receiverId } = data;

        const redisKey = `item:${itemId}`

        const itemData = await getFromRedis(redisKey);

        if (!itemData) {
            throw new NotFoundException(`Nenhuma chave encontrada no Redis para ${redisKey}`);
        }

        const item = JSON.parse(itemData);

        const id = uuidV4()
        const newNotification = {
            id: uuidV4(),
            message,
            receiverId,
            read: false,
            createdAt: new Date().toString(),

        }

        if (!item.notifications) item.notifications = [];

        item.notifications.push(newNotification);

        await saveToRedis(redisKey, JSON.stringify(item));

        return newNotification;

    }


    //readNotifications()


    //deleteNotifications()

}

export { NotificationRepository };