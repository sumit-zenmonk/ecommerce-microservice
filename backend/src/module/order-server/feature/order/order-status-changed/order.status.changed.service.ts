import { BadRequestException, Injectable } from "@nestjs/common";
import { OrderRepository } from "src/module/order-server/infrastructure/repository/order.repo";

@Injectable()
export class OrderStatusChangedService {
    constructor(
        private readonly orderRepo: OrderRepository,
    ) { }

    async OrderStatusChanged(payload: any) {
        await this.orderRepo.updateOrderStatus(payload.order_uuid, payload.nextStatus)

        return;
    }
}