import { BadRequestException, Injectable, } from "@nestjs/common";
import { SocketEventNameEnum } from "src/module/common/socket/socket.enum";
import { SocketService } from "src/module/common/socket/socket.service";
import { ProductRepository } from "src/module/product-server/infrastructure/repository/product.repo";

@Injectable()
export class OrderPaidDeductStockService {
    constructor(
        private readonly productRepo: ProductRepository,
        private readonly socketService: SocketService,
    ) { }

    async orderPaidDeductStock(order: any) {
        // Deduct stock one by one
        const deductions = order.items.map(async (item) => {
            try {
                await this.productRepo.deductStock(item.product_uuid, item.quantity);
                console.log(`Deducted ${item.quantity} quantity from ${item.name} (UUID: ${item.product_uuid})`);
            } catch (err: any) {
                console.error(`Failed to deduct stock for ${item.name}: ${err.message}`);
            }
        });

        await Promise.all(deductions);
        await this.socketService.emitToUser(order.user_uuid, SocketEventNameEnum.PRODUCT_STOCK_DEDUCT, order.items);

        return;
    }
}
