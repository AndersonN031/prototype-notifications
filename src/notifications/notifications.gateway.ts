import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'

@WebSocketGateway({
    cors: {
        origin: '*',
    }
})

class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private clients = new Map<String, string>();

    handleConnection(client: Socket) {
        const userId = client.handshake.query.userId as string;
        if (userId) {
            this.clients.set(client.id, userId);
            client.join(userId)
            console.log(`Usuário ${userId} conectado (socketId: ${client.id})`);
        } else {
            console.log(`Cliente conectado sem userId (socketId: ${client.id})`);
        }
    };


    handleDisconnect(client: Socket) {
        this.clients.delete(client.id);
        console.log(`Cliente desconectado: ${client.id}`);
    };

    emitNotificationToUser(receiverId: string, notification: any) {
        this.server.to(receiverId).emit('newNotification', notification);
    }
}

export { NotificationsGateway }