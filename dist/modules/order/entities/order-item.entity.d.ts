import { Art } from '../../art/entities/art.entity';
import { Order } from './order.entity';
export declare class OrderItem {
    id: number;
    order: Order;
    art: Art;
    quantity: number;
    price: number;
}
