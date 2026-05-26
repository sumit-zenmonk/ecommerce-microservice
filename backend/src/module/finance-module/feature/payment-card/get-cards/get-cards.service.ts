import { BadRequestException, Injectable } from "@nestjs/common";
import { FinanceRepository } from "src/module/finance-module/infrastructure/repository/finance.repository";
import { UserEntity } from "src/module/user-module/domain/user/user.entity";

@Injectable()
export class GetCardsService {
    constructor(
        private readonly financeRepository: FinanceRepository,
    ) { }

    async getCards(user: UserEntity) {
        return {
            data: await this.financeRepository.findUserCards(user.uuid),
            message: "Cards fetched successfully"
        }
    }
}