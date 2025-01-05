import { Order } from 'src/modules/order/entities/order.entity';
export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    roles: string[];
    createdAt: Date;
    updatedAt: Date;
    orders: Order[];
}
