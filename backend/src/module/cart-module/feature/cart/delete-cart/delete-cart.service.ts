import { BadRequestException, Injectable, } from "@nestjs/common";
import { UserEntity } from "src/module/cart-module/domain/user/user.entity";
import { CartRepository } from "src/module/cart-module/infrastructure/repository/cart.repository";

@Injectable()
export class DeleteCartService {
    constructor(
        private readonly cartRepository: CartRepository,
    ) { }

    async deleteCart(user: UserEntity) {
        const isCartExists = await this.cartRepository.findByUserUuid(user.uuid);
        if (!isCartExists) {
            throw new BadRequestException("Cart not found");
        }

        await this.cartRepository.deleteCart(isCartExists.uuid);

        return {
            message: "Cart Deleted Success",
        };
    }
}