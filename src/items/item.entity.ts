enum itemsStatus {
    "PENDING",
    "CONFIRMED",
    "CANCELLED"
}

class Item {
    id: string;
    name: string;
    status: itemsStatus;
    updatedBy?: string;
    notifications: Notification[];
    createdAt: Date;
    updatedAt: Date;
}

export { Item };