import { Injectable } from '@nestjs/common';
import { CreateNotificationsInput } from './dto/create-notifications.input';
import { NotificationRepository } from './notifications.repository';

@Injectable()
class NotificationsService {
    constructor(private readonly notificationsRepository: NotificationRepository) { }

    async sendNotifications(itemId: string, data: CreateNotificationsInput): Promise<Notification | any> {
        try {
            return await this.notificationsRepository.sendNotifications(itemId, data)
        } catch (error) {
            throw error;
        }
    }
}

export { NotificationsService };