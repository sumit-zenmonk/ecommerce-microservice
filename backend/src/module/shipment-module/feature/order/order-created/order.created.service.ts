import { BadRequestException, Injectable, } from "@nestjs/common";
import { OrderItemRepository } from "src/module/shipment-module/infrastructure/repository/order.item.repo";
import { OrderRepository } from "src/module/shipment-module/infrastructure/repository/order.repo";

@Injectable()
export class OrderCreatedService {
    constructor(
        private readonly orderRepo: OrderRepository,
        private readonly orderItemRepo: OrderItemRepository,
    ) { }

    async orderCreated(payload: any) {
        const {
            order_uuid,
            cart_uuid,
            total_price,
            user_uuid,
            order_address,
            items,
        } = payload;

        const order = await this.orderRepo.createOrder({
            uuid: order_uuid,
            cart_uuid,
            total_price,
            user_uuid: user_uuid,
            order_address,
        });

        await Promise.all(
            items.map(item =>
                this.orderItemRepo.createOrderItem({
                    uuid: item.uuid,
                    order_uuid: order.uuid,
                    product_uuid: item.product_uuid,
                    name: item.name,
                    description: item.description,
                    image_url: item.image_url,
                    price: item.price,
                    quantity: item.quantity
                })
            )
        );

        return;
    }
}