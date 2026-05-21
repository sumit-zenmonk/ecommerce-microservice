import { Module } from "@nestjs/common";
import { FinanceRepository } from "src/module/finance-server/infrastructure/repository/finance.repo";
import { PayUsingCardController } from "./pay-using-card.controller";
import { PayUsingCardService } from "./pay-using-card.service";

@Module({
    imports: [],
    controllers: [PayUsingCardController],
    providers: [PayUsingCardService, FinanceRepository],
    exports: [],
})
export class PayUsingCardUsingCardModule { }
