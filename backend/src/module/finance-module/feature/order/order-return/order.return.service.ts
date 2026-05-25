import { BadRequestException, Injectable } from "@nestjs/common";
import { SocketService } from "src/module/common/infrastruture/socket/socket.service";
import { PaymentHistoryTypeEnum } from "src/module/finance-module/domain/payment-history/payment.enum";
import { FinanceRepository } from "src/module/finance-module/infrastructure/repository/finance.repo";

@Injectable()
export class OrderReturnService {
    constructor(
        private readonly socketService: SocketService,
        private readonly financeRepo: FinanceRepository,
    ) { }

    async orderReturn(order: any) {

        // make payment returned 
        let account = await this.financeRepo.findAccount(order.user.uuid);
        if (!account) {
            throw new BadRequestException("Account not found for return");
        }

        const returnAmount = Number(order.total_price);
        account.balance += returnAmount;

        await this.financeRepo.saveAccount(account);
        await this.financeRepo.createHistory({
            user_uuid: order.user.uuid,
            amount: returnAmount,
            type: PaymentHistoryTypeEnum.REFUND,
            description: 'Order return And Money Refund',
        });
    }
}