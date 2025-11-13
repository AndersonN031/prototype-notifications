import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationsInput } from './dto/create-notifications.input';

@Controller('notifications')
export class NotificationsController {
    constructor(private notificationsService: NotificationsService) { }

    

    @Post(':itemId')
    async sendNotifications(
        @Param('itemId') itemId: string,
        @Body() data: CreateNotificationsInput,
        @Res() res
    ): Promise<Notification> {
        const notification = await this.notificationsService.sendNotifications(itemId, data);
        return res.status(201).json(notification)
    }
}
