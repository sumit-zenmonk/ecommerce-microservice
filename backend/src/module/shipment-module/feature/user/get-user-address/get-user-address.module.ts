import { Module } from "@nestjs/common";
import { UserRepository } from "src/module/user-module/infrastructure/repository/user.repo";
import { GetUserAddressController } from "./get-user-address.controller";
import { GetUserAddressService } from "./get-user-address.service";
import { UserAddressRepository } from "src/module/shipment-module/infrastructure/repository/user.address.repo";

@Module({
    imports: [],
    controllers: [GetUserAddressController],
    providers: [GetUserAddressService, UserRepository, UserAddressRepository],
    exports: [],
})

export class GetUserAddressModule { }