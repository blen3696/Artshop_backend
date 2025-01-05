import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(createOrderDto: CreateOrderDto, req: any): Promise<import("./entities/order.entity").Order>;
    findUserOrders(req: any): Promise<import("./entities/order.entity").Order[]>;
    findAllOrders(): Promise<import("./entities/order.entity").Order[]>;
    updateOrderStatus(id: number, status: string): Promise<import("./entities/order.entity").Order>;
    deleteOrder(id: number, req: any): Promise<{
        message: string;
        success: boolean;
        data: any;
    }>;
    updateOrder(id: number, updateDto: Partial<CreateOrderDto>, req: any): Promise<import("./entities/order.entity").Order>;
    getOrderById(id: number, req: any): Promise<import("./entities/order.entity").Order>;
    getOrderByIdAdmin(id: number): Promise<import("./entities/order.entity").Order>;
}
