import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Art } from '../art/entities/art.entity';
export declare class OrderService {
    private orderRepository;
    private orderItemRepository;
    private artRepository;
    constructor(orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>, artRepository: Repository<Art>);
    createOrder(createOrderDto: CreateOrderDto, userId: number): Promise<Order>;
    findOrdersByUser(userId: number): Promise<Order[]>;
    findAll(): Promise<Order[]>;
    updateOrderStatus(orderId: number, status: string): Promise<Order>;
    deleteOrder(orderId: number, userId: number): Promise<{
        message: string;
        success: boolean;
        data: any;
    }>;
    updateOrder(orderId: number, userId: number, updateDto: Partial<CreateOrderDto>): Promise<Order>;
    getOrderById(orderId: number, userId?: number, isAdmin?: boolean): Promise<Order>;
}
