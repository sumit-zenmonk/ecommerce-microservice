import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "src/module/user-module/infrastructure/repository/user.repo";
import { CreateUserAddressDto } from "./create-user-address.dto";
import { UserEntity } from "src/module/shipment-module/domain/user/user.entity";
import { UserAddressRepository } from "src/module/shipment-module/infrastructure/repository/user.address.repo";

@Injectable()
export class CreateUserAddressService {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly userAddressRepo: UserAddressRepository,
    ) { }

    async createUserAddress(user: UserEntity, body: CreateUserAddressDto) {
        if (body.isDefault) {
            await this.userAddressRepo.unsetOtherDefaults(user.uuid);
        }

        const data = await this.userAddressRepo.createAddress({
            ...body,
            user_uuid: user.uuid,
        });

        return {
            data: data,
            message: "User Address created"
        }
    }
}