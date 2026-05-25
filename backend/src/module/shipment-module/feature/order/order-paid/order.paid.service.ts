import { BadRequestException, Injectable, } from "@nestjs/common";
import { OrderPaymentStatusEnum } from "src/module/shipment-server/domain/order/order.enum";
import { OrderRepository } from "src/module/shipment-server/infrastructure/repository/order.repo";

@Injectable()
export class OrderPaidService {
    constructor(
        private readonly orderRepo: OrderRepository,
    ) { }

    async orderPaid(payload: any) {
        await this.orderRepo.updateOrderPaymentStatus(payload.order_uuid, OrderPaymentStatusEnum.PAID)

        return;
    }
}