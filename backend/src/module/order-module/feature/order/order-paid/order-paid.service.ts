import { BadRequestException, Injectable, } from "@nestjs/common";
import { ExchangeNameEnum, RoutingKeyEnum } from "src/module/common/infrastruture/rabbit-mq/type-enum/rabbit-mq.enum";
import { OrderPaymentStatusEnum } from "src/module/order-module/domain/order/order.enum";
import { OrderRepository } from "src/module/order-module/infrastructure/repository/order.repo";
import { OutboxRepository } from "src/module/order-module/infrastructure/repository/outbox.repo";

@Injectable()
export class OrderPaidService {
    constructor(
        private readonly orderRepo: OrderRepository,
        private readonly outboxRepo: OutboxRepository,
    ) { }

    async orderPaid(payload: any) {

        const isOrderExists = await this.orderRepo.findByUuid(payload.order_uuid);
        if (!isOrderExists) {
            console.warn(`Order not found so skipped: ${payload.order_uuid}`);
            return;
        }

        await this.orderRepo.updateOrderPaymentStatus(payload.order_uuid, OrderPaymentStatusEnum.PAID)

        await this.outboxRepo.createOutboxntry({
            exchange_name: ExchangeNameEnum.ORDER_EXCHANGE,
            routing_key: RoutingKeyEnum.ORDER_PAID_DEDUCT_STOCK,
            message_payload: {
                order_uuid: payload.order_uuid,
                order: isOrderExists
            }
        });

        return;
    }
}