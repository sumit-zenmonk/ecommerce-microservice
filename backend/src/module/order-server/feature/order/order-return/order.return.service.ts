import { BadRequestException, Injectable } from "@nestjs/common";
import { OrderPaymentStatusEnum, OrderStatusEnum } from "src/module/order-server/domain/order/order.enum";
import { OrderRepository } from "src/module/order-server/infrastructure/repository/order.repo";

@Injectable()
export class OrderReturnService {
    constructor(
        private readonly orderRepo: OrderRepository,
    ) { }

    async orderReturn(order: any) {
        if (order.returned_from_status) {
            await this.orderRepo.updateReturnedFromStatus(order.uuid, order.returned_from_status);
        }
        await this.orderRepo.updateOrderStatus(order.uuid, OrderStatusEnum.RETURNED);
        await this.orderRepo.updateOrderPaymentStatus(order.uuid, OrderPaymentStatusEnum.REFUND);

        return;
    }
}