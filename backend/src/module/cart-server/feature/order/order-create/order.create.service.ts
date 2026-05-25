import { BadRequestException, Injectable, } from "@nestjs/common";
import { CartRepository } from "src/module/cart-server/infrastructure/repository/cart.repo";

@Injectable()
export class OrderCreateService {
    constructor(
        private readonly cartRepo: CartRepository,
    ) { }

    async orderCreate(payload: any) {
        await this.cartRepo.deleteCart(payload.cart_uuid);
        await this.cartRepo.createCart({ user_uuid: payload.user_uuid });
        return;
    }
}