import { Notification } from "@prisma/client";

enum itemsStatus {
    "PENDING",
    "CONFIRMED",
    "CANCELLED"
}

class updateItemInput {
    name: string;
    status: itemsStatus;
    updatedBy?: string;
    notifications: Notification[];
}

export { updateItemInput };