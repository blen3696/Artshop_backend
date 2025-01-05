declare class OrderItemDto {
    artId: number;
    quantity: number;
}
export declare class CreateOrderDto {
    fullName: string;
    phone: string;
    address: string;
    items: OrderItemDto[];
}
export {};
