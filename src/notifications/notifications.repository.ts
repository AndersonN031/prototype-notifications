import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateNotificationsInput } from "./dto/create-notifications.input";
import { getFromRedis, saveToRedis } from "src/utils/redis.client";
import { v4 as uuidV4 } from "uuid"
import { KEY_NOT_FOUND } from "src/items/items.constants";
import { NotificationsGateway } from "./notifications.gateway";

@Injectable()
class NotificationRepository {
    constructor(
        private prisma: PrismaService,
        private readonly notificationsGateway: NotificationsGateway
    ) { }

    async sendNotifications(itemId: string, data: CreateNotificationsInput): Promise<Notification | any> {
        let { message, receiverId, read } = data;

        const redisKey = `item:${itemId}`

        const itemData = await getFromRedis(redisKey);

        if (!itemData) {
            throw new NotFoundException([KEY_NOT_FOUND]);
        }

        const item = JSON.parse(itemData);


        const newNotification = {
            id: uuidV4(),
            message,
            receiverId,
            read,
            createdAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),

        }

        if (!item.notifications) item.notifications = [];
        item.notifications.push(newNotification);

        await saveToRedis(redisKey, JSON.stringify(item));

        this.notificationsGateway.emitNotificationToUser(receiverId, newNotification);

        return newNotification;

    }

}

export { NotificationRepository };