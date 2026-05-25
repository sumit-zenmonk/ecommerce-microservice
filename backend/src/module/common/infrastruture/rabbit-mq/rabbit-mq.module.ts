import { Global, Module } from '@nestjs/common';
// Common Service
import { RabbitMQService } from './rabbit-mq.service';

// User Service
import * as UserServerUserRepo from 'src/module/user-server/infrastructure/repository/user.repo';

// Product Service
import * as ProductServerUserRepo from 'src/module/product-server/infrastructure/repository/user.repo';
import * as ProductServerProductRepo from 'src/module/product-server/infrastructure/repository/product.repo';
import * as ProductServerInboxRepo from 'src/module/product-server/infrastructure/repository/inbox.repo';
import * as ProductUserRegisterService from 'src/module/product-server/feature/user/user-register/user-register.service';
import * as ProductOrderPaidDeductStockService from 'src/module/product-server/feature/order/order-paid-deduct-stock/order.paid.deduct.stock.service';
import * as ProductOrderReturnService from 'src/module/product-server/feature/order/order-return/order.return.service';
import * as ProductUserConsumer from 'src/module/product-server/infrastructure/rabbit-mq-consumer/user/user-registered/user-registered.consumer';
import * as ProductOrderPaidDeductConsumer from 'src/module/product-server/infrastructure/rabbit-mq-consumer/order/order-paid-deduct-stock/order-paid-deduct-stock.consumer';
import * as ProductOrderReturnConsumer from 'src/module/product-server/infrastructure/rabbit-mq-consumer/order/order-return/order-return.consumer';

// Cart Service
import * as CartServerUserRepo from 'src/module/cart-server/infrastructure/repository/user.repo';
import * as CartServerCartRepo from 'src/module/cart-server/infrastructure/repository/cart.repo';
import * as CartOrderServerProductRepo from 'src/module/cart-server/infrastructure/repository/product.repo';
import * as CartServerInboxRepo from 'src/module/cart-server/infrastructure/repository/inbox.repo';
import * as CartOrderCreateService from 'src/module/cart-server/feature/order/order-create/order.create.service';
import * as CartOrderReturnService from 'src/module/cart-server/feature/order/order-return/order.return.service';
import * as CartUserRegisterService from 'src/module/cart-server/feature/user/user-register/user-register.service';
import * as CartOrderPaidDeductStockService from 'src/module/cart-server/feature/order/order-paid-deduct-stock/order.paid.deduct.stock.service';
import * as CartUserConsumer from 'src/module/cart-server/infrastructure/rabbit-mq-consumer/user/user-registered/user-registered.consumer';
import * as CartOrderCreatedConsumer from 'src/module/cart-server/infrastructure/rabbit-mq-consumer/order/order-created/order-created-consumer';
import * as CartOrderPaidDeductConsumer from 'src/module/cart-server/infrastructure/rabbit-mq-consumer/order/order-paid-deduct-stock/order-paid-deduct-stock.consumer';
import * as CartOrderReturnConsumer from 'src/module/cart-server/infrastructure/rabbit-mq-consumer/order/order-return/order-return.consumer';

// Order Service
import * as OrderServerUserRepo from 'src/module/order-server/infrastructure/repository/user.repo';
import * as OrderServerInboxRepo from 'src/module/order-server/infrastructure/repository/inbox.repo';
import * as OrderServerOrderRepo from 'src/module/order-server/infrastructure/repository/order.repo';
import * as OrderServerOutboxRepo from 'src/module/order-server/infrastructure/repository/outbox.repo';
import * as OrderUserRegisterService from 'src/module/order-server/feature/user/user-register/user-register.service';
import * as OrderPaidService from 'src/module/order-server/feature/order/order-paid/order-paid.service';
import * as OrderReturnService from 'src/module/order-server/feature/order/order-return/order.return.service';
import * as OrderStatusChangedService from 'src/module/order-server/feature/order/order-status-changed/order.status.changed.service';
import * as OrderUserConsumer from 'src/module/order-server/infrastructure/rabbit-mq-consumer/user/user-registered/user-registered.consumer';
import * as OrderPaidConsumer from 'src/module/order-server/infrastructure/rabbit-mq-consumer/order/order-paid/order-paid.consumer';
import * as OrderStatusChangedConsumer from 'src/module/order-server/infrastructure/rabbit-mq-consumer/order/order-status-changed/order-status-changed.consumer';
import * as OrderReturnConsumer from 'src/module/order-server/infrastructure/rabbit-mq-consumer/order/order-return/order-return.consumer';

// finance Service
import * as FinanceServerUserRepo from 'src/module/finance-server/infrastructure/repository/user.repo';
import * as FinanceServerInboxRepo from 'src/module/finance-server/infrastructure/repository/inbox.repo';
import * as FinanceServerFinanceRepo from 'src/module/finance-server/infrastructure/repository/finance.repo';
import * as FinanceUserRegisterService from 'src/module/finance-server/feature/user/user-register/user-register.service';
import * as FinanceOrderReturnService from 'src/module/finance-server/feature/order/order-return/order.return.service';
import * as FinanceUserConsumer from 'src/module/finance-server/infrastructure/rabbit-mq-consumer/user/user-registered/user-registered.consumer';
import * as FinanceOrderReturnConsumer from 'src/module/finance-server/infrastructure/rabbit-mq-consumer/order/order-return/order-return.consumer';

// shipment Service
import * as ShipmentServerUserRepo from 'src/module/shipment-server/infrastructure/repository/user.repo';
import * as ShipmentServerInboxRepo from 'src/module/shipment-server/infrastructure/repository/inbox.repo';
import * as ShipmentOrderRepository from 'src/module/shipment-server/infrastructure/repository/order.repo';
import * as ShipmentUserRegisterService from 'src/module/shipment-server/feature/user/user-register/user-register.service';
import * as ShipmentOrderPaidService from 'src/module/shipment-server/feature/order/order-paid/order.paid.service';
import * as ShipmentOrderCreatedService from 'src/module/shipment-server/feature/order/order-created/order.created.service';
import * as ShipmentOrderItemRepository from 'src/module/shipment-server/infrastructure/repository/order.item.repo';
import * as ShipmentUserConsumer from 'src/module/shipment-server/infrastructure/rabbit-mq-consumer/user/user-registered/user-registered.consumer';
import * as ShipentOrderCreatedConsumer from 'src/module/shipment-server/infrastructure/rabbit-mq-consumer/order/order-created/order-created-consumer';
import * as ShipmentOrderPaidConsumer from 'src/module/shipment-server/infrastructure/rabbit-mq-consumer/order/order-paid/order-paid.consumer';

@Global()
@Module({
    imports: [],
    providers: [
        // Common Service
        RabbitMQService,

        // User Service
        UserServerUserRepo.UserRepository,

        // Product Service
        ProductServerUserRepo.UserRepository,
        ProductServerProductRepo.ProductRepository,
        ProductServerInboxRepo.InboxRepository,
        ProductUserRegisterService.UserRegisterService,
        ProductOrderPaidDeductStockService.OrderPaidDeductStockService,
        ProductOrderReturnService.OrderReturnService,
        ProductUserConsumer.UserRegisteredConsumer,
        ProductOrderPaidDeductConsumer.ProductOrderPaidDeductStockConsumer,
        ProductOrderReturnConsumer.ProductOrderReturnConsumer,

        // Cart Service
        CartServerUserRepo.UserRepository,
        CartServerCartRepo.CartRepository,
        CartOrderServerProductRepo.ProductRepository,
        CartServerInboxRepo.InboxRepository,
        CartOrderReturnService.OrderReturnService,
        CartOrderCreateService.OrderCreateService,
        CartUserRegisterService.UserRegisterService,
        CartOrderPaidDeductStockService.OrderPaidDeductStockService,
        CartUserConsumer.UserRegisteredConsumer,
        CartOrderCreatedConsumer.OrderCreatedConsumer,
        CartOrderPaidDeductConsumer.CartOrderPaidDeductStockConsumer,
        CartOrderReturnConsumer.ProductOrderReturnConsumer,

        // order Service
        OrderServerUserRepo.UserRepository,
        OrderServerInboxRepo.InboxRepository,
        OrderServerOutboxRepo.OutboxRepository,
        OrderServerOrderRepo.OrderRepository,
        OrderUserRegisterService.UserRegisterService,
        OrderPaidService.OrderPaidService,
        OrderReturnService.OrderReturnService,
        OrderStatusChangedService.OrderStatusChangedService,
        OrderPaidConsumer.OrderPaidConsumer,
        OrderUserConsumer.UserRegisteredConsumer,
        OrderStatusChangedConsumer.OrderStatusChangedConsumer,
        OrderReturnConsumer.OrderOrderReturnConsumer,

        // finance Service
        FinanceServerUserRepo.UserRepository,
        FinanceServerInboxRepo.InboxRepository,
        FinanceServerFinanceRepo.FinanceRepository,
        FinanceUserRegisterService.UserRegisterService,
        FinanceOrderReturnService.OrderReturnService,
        FinanceUserConsumer.UserRegisteredConsumer,
        FinanceOrderReturnConsumer.FinanceOrderReturnConsumer,

        // shipment Service
        ShipmentServerUserRepo.UserRepository,
        ShipmentServerInboxRepo.InboxRepository,
        ShipmentUserRegisterService.UserRegisterService,
        ShipmentOrderCreatedService.OrderCreatedService,
        ShipmentOrderPaidService.OrderPaidService,
        ShipmentUserConsumer.UserRegisteredConsumer,
        ShipentOrderCreatedConsumer.OrderCreatedConsumer,
        ShipmentOrderRepository.OrderRepository,
        ShipmentOrderItemRepository.OrderItemRepository,
        ShipmentOrderPaidConsumer.OrderPaidConsumer,
    ],
    exports: [RabbitMQService],
})
export class RabbitMQModule { }