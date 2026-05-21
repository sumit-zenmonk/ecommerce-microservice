import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrderRepository } from '../../repository/order.repo';

import {
    OrderPaymentStatusEnum,
    OrderStatusEnum,
} from 'src/module/shipment-server/domain/order/order.enum';

@Injectable()
export class PaidOrderStatusCronService {
    constructor(
        private readonly orderRepo: OrderRepository,
    ) { }

    private readonly logger = new Logger(PaidOrderStatusCronService.name);

    @Cron(CronExpression.EVERY_5_SECONDS)
    async handleCron() {
        // Fetch top 10 paid orders
        const orders = await this.orderRepo.findTopTenPaidButNotDeliveredOrderStatus();

        if (!orders.length) {
            return;
        }

        for (const order of orders) {
            let nextStatus: OrderStatusEnum | null = null;

            switch (order.order_status) {
                case OrderStatusEnum.PENDING:
                    nextStatus = OrderStatusEnum.PROCESSING;
                    break;

                case OrderStatusEnum.PROCESSING:
                    nextStatus = OrderStatusEnum.PACKED;
                    break;

                case OrderStatusEnum.PACKED:
                    nextStatus = OrderStatusEnum.DELIVERED;
                    break;

                case OrderStatusEnum.DELIVERED:
                    nextStatus = null;
                    break;
            }

            if (nextStatus) {
                await this.orderRepo.updateOrderStatus(
                    order.uuid,
                    nextStatus,
                );

                this.logger.log(
                    `Order ${order.uuid} updated from ${order.order_status} to ${nextStatus}`,
                );
            }
        }
    }
}