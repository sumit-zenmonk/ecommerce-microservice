import { Module } from "@nestjs/common";
import { UserRepository } from "src/module/user-module/infrastructure/repository/user.repo";
import { CreateUserAddressController } from "./create-user-address.controller";
import { CreateUserAddressService } from "./create-user-address.service";
import { UserAddressRepository } from "src/module/shipment-module/infrastructure/repository/user.address.repo";

@Module({
    imports: [],
    controllers: [CreateUserAddressController],
    providers: [CreateUserAddressService, UserRepository, UserAddressRepository],
    exports: [],
})

export class CreateUserAddressModule { }