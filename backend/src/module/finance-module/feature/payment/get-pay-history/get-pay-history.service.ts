import { BadRequestException, Injectable } from "@nestjs/common";
import { FinanceRepository } from "src/module/finance-module/infrastructure/repository/finance.repository";
import { UserEntity } from "src/module/user-module/domain/user/user.entity";

@Injectable()
export class GetPayHistoryService {
    constructor(
        private readonly financeRepository: FinanceRepository,
    ) { }

    async getPayHistories(user: UserEntity) {
        return {
            data: await this.financeRepository.findHistories(user.uuid),
            message: "Payment history fetched successfully"
        };
    }
}