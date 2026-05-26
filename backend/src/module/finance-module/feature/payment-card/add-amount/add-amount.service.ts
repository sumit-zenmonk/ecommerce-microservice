import { BadRequestException, Injectable } from "@nestjs/common";
import { PaymentHistoryTypeEnum } from "src/module/finance-module/domain/payment-history/payment.enum";
import { FinanceRepository } from "src/module/finance-module/infrastructure/repository/finance.repository";
import { UserEntity } from "src/module/user-module/domain/user/user.entity";

@Injectable()
export class AddAmountService {
    constructor(
        private readonly financeRepository: FinanceRepository,
    ) { }

    async addAmount(user: UserEntity, amount: number) {
        if (!amount || amount <= 0) {
            throw new BadRequestException("Amount must be greater than zero");
        }

        let account = await this.financeRepository.findAccount(user.uuid);
        if (!account) {
            account = await this.financeRepository.createAccount({ user_uuid: user.uuid, balance: 0 });
        }

        account.balance += amount;
        const saved = await this.financeRepository.saveAccount(account);
        await this.financeRepository.createHistory({
            user_uuid: user.uuid,
            amount,
            type: PaymentHistoryTypeEnum.TOPUP,
            description: 'Account top-up',
        });

        return {
            data: saved,
            message: "Amount added to account"
        };
    }
}