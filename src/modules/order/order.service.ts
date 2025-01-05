import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Art } from '../art/entities/art.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Art) private artRepository: Repository<Art>,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
    userId: number,
  ): Promise<Order> {
    const { fullName, phone, address, items } = createOrderDto;

    const orderItems: OrderItem[] = [];
    for (const item of items) {
      const art = await this.artRepository.findOne({
        where: { id: item.artId },
      });

      if (!art) {
        throw new NotFoundException(`Art with ID ${item.artId} not found`);
      }
      if (art.quantity < item.quantity) {
        throw new BadRequestException(`Not enough stock for art: ${art.title}`);
      }

      art.quantity -= item.quantity;
      await this.artRepository.save(art);

      const orderItem = this.orderItemRepository.create({
        art,
        quantity: item.quantity,
        price: art.price,
      });
      orderItems.push(orderItem);
    }

    const order = this.orderRepository.create({
      user: { id: userId },
      fullName,
      phone,
      address,
      items: orderItems,
    });

    return this.orderRepository.save(order);
  }

  async findOrdersByUser(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['items', 'items.art'],
    });
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['items', 'items.art', 'user'],
    });
  }

  async updateOrderStatus(orderId: number, status: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    order.status = status;
    return this.orderRepository.save(order);
  }

  async deleteOrder(
    orderId: number,
    userId: number,
  ): Promise<{ message: string; success: boolean; data: any }> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId, user: { id: userId } },
      relations: ['items'],
    });

    if (!order) {
      throw new NotFoundException(
        `Order with ID ${orderId} not found for this user`,
      );
    }

    if (order.status.toLocaleLowerCase() !== 'pending') {
      throw new BadRequestException(
        "Order cannot be deleted because its status is not 'pending'",
      );
    }

    if (order.items && order.items.length > 0) {
      await this.orderItemRepository.remove(order.items);
    }

    await this.orderRepository.remove(order);
    return {
      success: true,
      message: 'Order has been deleted successfully',
      data: null,
    };
  }

  async updateOrder(
    orderId: number,
    userId: number,
    updateDto: Partial<CreateOrderDto>,
  ): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId, user: { id: userId } },
      relations: ['items', 'items.art'],
    });

    if (!order) {
      throw new NotFoundException(
        `Order with ID ${orderId} not found for this user`,
      );
    }

    if (order.status.toLocaleLowerCase() !== 'pending') {
      throw new BadRequestException(
        "Order cannot be updated because its status is not 'pending'",
      );
    }

    if (updateDto.fullName) order.fullName = updateDto.fullName;
    if (updateDto.phone) order.phone = updateDto.phone;
    if (updateDto.address) order.address = updateDto.address;

    if (updateDto.items) {
      for (const item of updateDto.items) {
        Logger.log(JSON.stringify(order, null, 2));
        const orderItem = order.items.find((i) => i.art.id === item.artId);
        if (!orderItem) {
          throw new BadRequestException(
            `Item with ID ${item.artId} is not in the order`,
          );
        }

        const art = await this.artRepository.findOne({
          where: { id: item.artId },
        });
        const quantityChange = item.quantity - orderItem.quantity;
        if (art.quantity < quantityChange) {
          throw new BadRequestException(
            `Not enough stock for art: ${art.title}`,
          );
        }

        art.quantity -= quantityChange;
        await this.artRepository.save(art);

        orderItem.quantity = item.quantity;
        orderItem.price = art.price;
      }
    }

    return this.orderRepository.save(order);
  }

  async getOrderById(
    orderId: number,
    userId?: number,
    isAdmin = false,
  ): Promise<Order> {
    let order: Order;

    if (isAdmin) {
      order = await this.orderRepository.findOne({
        where: { id: orderId },
        relations: ['items', 'items.art', 'user'],
      });
    } else {
      order = await this.orderRepository.findOne({
        where: { id: orderId, user: { id: userId } },
        relations: ['items', 'items.art'],
      });
    }

    if (!order) {
      throw new NotFoundException(
        `Order with ID ${orderId} not found${!isAdmin ? ' for this user' : ''}`,
      );
    }

    return order;
  }
}
