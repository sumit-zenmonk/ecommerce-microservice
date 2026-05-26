import { BadRequestException, Injectable } from "@nestjs/common";
import { OrderPaymentStatusEnum, OrderStatusEnum } from "src/module/order-module/domain/order/order.enum";
import { OrderRepository } from "src/module/order-module/infrastructure/repository/order.repository";

@Injectable()
export class OrderReturnService {
    constructor(
        private readonly orderRepository: OrderRepository,
    ) { }

    async orderReturn(order: any) {
        if (order.returned_from_status) {
            await this.orderRepository.updateReturnedFromStatus(order.uuid, order.returned_from_status);
        }
        await this.orderRepository.updateOrderStatus(order.uuid, OrderStatusEnum.RETURNED);
        await this.orderRepository.updateOrderPaymentStatus(order.uuid, OrderPaymentStatusEnum.REFUND);

        return;
    }
}