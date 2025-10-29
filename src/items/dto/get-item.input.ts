import { Notification } from "@prisma/client";

enum itemsStatus {
    "PENDING",
    "CONFIRMED",
    "CANCELLED"
}

class GetItemInput {
    name: string;
    status: itemsStatus;
    updatedBy?: string;
    notifications: Notification[];
}

export { GetItemInput };