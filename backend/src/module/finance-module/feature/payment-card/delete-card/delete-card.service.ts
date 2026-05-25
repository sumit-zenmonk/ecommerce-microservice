import { BadRequestException, Injectable } from "@nestjs/common";
import { FinanceRepository } from "src/module/finance-module/infrastructure/repository/finance.repo";
import { UserEntity } from "src/module/user-module/domain/user/user.entity";

@Injectable()
export class DeleteCardService {
    constructor(
        private readonly financeRepo: FinanceRepository,
    ) { }

    async deleteCard(user: UserEntity, uuid: string) {
        await this.financeRepo.deleteCard(user.uuid, uuid);
        return {
            message: "Card deleted successfully"
        };
    }
}