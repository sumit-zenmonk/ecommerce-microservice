import { BadRequestException, Injectable } from "@nestjs/common";
import { FinanceRepository } from "src/module/finance-module/infrastructure/repository/finance.repo";
import { UserEntity } from "src/module/user-module/domain/user/user.entity";

@Injectable()
export class GetPayHistoryService {
    constructor(
        private readonly financeRepo: FinanceRepository,
    ) { }

    async getPayHistories(user: UserEntity) {
        return {
            data: await this.financeRepo.findHistories(user.uuid),
            message: "Payment history fetched successfully"
        };
    }
}