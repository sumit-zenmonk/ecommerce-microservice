import { Global, Module } from '@nestjs/common';
import { RabbitMQService } from './rabbit-mq.service';
// User Module
import * as UserServerUserRepo from 'src/module/user-server/infrastructure/repository/user.repo';

// Product Module
import * as ProductServerUserRepo from 'src/module/product-server/infrastructure/repository/user.repo';
import * as ProductServerInboxRepo from 'src/module/product-server/infrastructure/repository/inbox.repo';
import * as ProductUserConsumer from 'src/module/product-server/infrastructure/rabbit-mq-consumer/user/user-registered/user-registered.consumer';

@Global()
@Module({
    imports: [],
    providers: [
        RabbitMQService,
        UserServerUserRepo.UserRepository,
        ProductServerUserRepo.UserRepository,
        ProductServerInboxRepo.InboxRepository,
        ProductUserConsumer.UserRegisteredConsumer,
    ],
    exports: [RabbitMQService],
})
export class RabbitMQModule { }