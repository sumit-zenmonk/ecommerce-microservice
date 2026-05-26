import { BadRequestException, Injectable, } from "@nestjs/common";
import { CartRepository } from "src/module/cart-module/infrastructure/repository/cart.repository";

@Injectable()
export class OrderCreateService {
    constructor(
        private readonly cartRepository: CartRepository,
    ) { }

    async orderCreate(payload: any) {
        await this.cartRepository.deleteCart(payload.cart_uuid);
        await this.cartRepository.createCart({ user_uuid: payload.user_uuid });
        return;
    }
}