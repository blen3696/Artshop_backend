"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const order_item_entity_1 = require("./entities/order-item.entity");
const art_entity_1 = require("../art/entities/art.entity");
let OrderService = class OrderService {
    constructor(orderRepository, orderItemRepository, artRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.artRepository = artRepository;
    }
    async createOrder(createOrderDto, userId) {
        const { fullName, phone, address, items } = createOrderDto;
        const orderItems = [];
        for (const item of items) {
            const art = await this.artRepository.findOne({
                where: { id: item.artId },
            });
            if (!art) {
                throw new common_1.NotFoundException(`Art with ID ${item.artId} not found`);
            }
            if (art.quantity < item.quantity) {
                throw new common_1.BadRequestException(`Not enough stock for art: ${art.title}`);
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
    async findOrdersByUser(userId) {
        return this.orderRepository.find({
            where: { user: { id: userId } },
            relations: ['items', 'items.art'],
        });
    }
    async findAll() {
        return this.orderRepository.find({
            relations: ['items', 'items.art', 'user'],
        });
    }
    async updateOrderStatus(orderId, status) {
        const order = await this.orderRepository.findOne({
            where: { id: orderId },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${orderId} not found`);
        }
        order.status = status;
        return this.orderRepository.save(order);
    }
    async deleteOrder(orderId, userId) {
        const order = await this.orderRepository.findOne({
            where: { id: orderId, user: { id: userId } },
            relations: ['items'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${orderId} not found for this user`);
        }
        if (order.status.toLocaleLowerCase() !== 'pending') {
            throw new common_1.BadRequestException("Order cannot be deleted because its status is not 'pending'");
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
    async updateOrder(orderId, userId, updateDto) {
        const order = await this.orderRepository.findOne({
            where: { id: orderId, user: { id: userId } },
            relations: ['items', 'items.art'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${orderId} not found for this user`);
        }
        if (order.status.toLocaleLowerCase() !== 'pending') {
            throw new common_1.BadRequestException("Order cannot be updated because its status is not 'pending'");
        }
        if (updateDto.fullName)
            order.fullName = updateDto.fullName;
        if (updateDto.phone)
            order.phone = updateDto.phone;
        if (updateDto.address)
            order.address = updateDto.address;
        if (updateDto.items) {
            for (const item of updateDto.items) {
                common_1.Logger.log(JSON.stringify(order, null, 2));
                const orderItem = order.items.find((i) => i.art.id === item.artId);
                if (!orderItem) {
                    throw new common_1.BadRequestException(`Item with ID ${item.artId} is not in the order`);
                }
                const art = await this.artRepository.findOne({
                    where: { id: item.artId },
                });
                const quantityChange = item.quantity - orderItem.quantity;
                if (art.quantity < quantityChange) {
                    throw new common_1.BadRequestException(`Not enough stock for art: ${art.title}`);
                }
                art.quantity -= quantityChange;
                await this.artRepository.save(art);
                orderItem.quantity = item.quantity;
                orderItem.price = art.price;
            }
        }
        return this.orderRepository.save(order);
    }
    async getOrderById(orderId, userId, isAdmin = false) {
        let order;
        if (isAdmin) {
            order = await this.orderRepository.findOne({
                where: { id: orderId },
                relations: ['items', 'items.art', 'user'],
            });
        }
        else {
            order = await this.orderRepository.findOne({
                where: { id: orderId, user: { id: userId } },
                relations: ['items', 'items.art'],
            });
        }
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${orderId} not found${!isAdmin ? ' for this user' : ''}`);
        }
        return order;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __param(2, (0, typeorm_1.InjectRepository)(art_entity_1.Art)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrderService);
//# sourceMappingURL=order.service.js.map