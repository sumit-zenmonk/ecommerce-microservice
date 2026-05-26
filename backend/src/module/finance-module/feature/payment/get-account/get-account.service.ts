import { BadRequestException, Injectable } from "@nestjs/common";
import { FinanceRepository } from "src/module/finance-module/infrastructure/repository/finance.repository";
import { UserEntity } from "src/module/user-module/domain/user/user.entity";

@Injectable()
export class GetAccountService {
    constructor(
        private readonly financeRepository: FinanceRepository,
    ) { }

    async getAccount(user: UserEntity) {
        let account = await this.financeRepository.findAccount(user.uuid);
        if (!account) {
            account = await this.financeRepository.createAccount({ user_uuid: user.uuid, balance: 0 });
        }
        return {
            data: account,
            message: "Account fetched successfully"
        };
    }
}