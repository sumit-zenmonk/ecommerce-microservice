import { Global, Module } from '@nestjs/common';
import { PaidOrderStatusCronService } from './order-status-cron/order-status-cron';
import { OrderRepository } from '../repository/order.repo';

@Global()
@Module({
    providers: [
        PaidOrderStatusCronService,
        OrderRepository
    ],
    exports: [],
})
export class CronModule { }