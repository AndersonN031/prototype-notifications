class Notification {
    id: string
    message: string;
    itemId: string;
    receiverId: string;
    read?: false;
    createdAt: Date;
}

export { Notification };