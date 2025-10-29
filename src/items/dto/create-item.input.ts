import { Notification } from "@prisma/client";

enum itemsStatus {
    "PENDING",
    "CONFIRMED",
    "CANCELLED"
}

class CreateItemInput {
    name: string;
    status: itemsStatus;
    updatedBy?: string;
    notifications: Notification[];
}

export { CreateItemInput };