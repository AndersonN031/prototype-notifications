import { IsBoolean, IsString } from "class-validator";

class CreateNotificationsInput {
    @IsString()
    message: string;

    @IsString()
    itemId: string;

    @IsString()
    receiverId: string;

    @IsBoolean()
    read?: false;
}

export { CreateNotificationsInput };