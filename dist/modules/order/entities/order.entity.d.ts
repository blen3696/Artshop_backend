import { User } from '../../auth/entities/user.entity';
import { OrderItem } from './order-item.entity';
export declare class Order {
    id: number;
    user: User;
    items: OrderItem[];
    fullName: string;
    phone: string;
    address: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
